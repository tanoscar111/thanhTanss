const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authControllers = {
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  generateAccessToken: (data) => {
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36d",
    });
  },
  generateRefeshToken: (data) => {
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36d",
    });
  },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        res.status(404).json("Tên đăng nhập không đúng");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(404).json("mật khẩu không đúng");
      }
      if (user && validPassword) {
        const data = req.body;
        const accessToken = authControllers.generateAccessToken(data);
        const freshToken = authControllers.generateRefeshToken(data);
        const { password, ...other } = user._doc; // Loại bỏ password ra khỏi token
        res.status(200).json({ ...other, accessToken, freshToken });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = authControllers;
