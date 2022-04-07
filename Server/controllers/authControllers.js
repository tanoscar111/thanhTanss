const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
let refreshTokens = [];
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
      expiresIn: "10s",
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
        refreshTokens.push(freshToken);
        res.cookie("refestoken", freshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { password, ...other } = user._doc; // Loại bỏ password ra khỏi token
        res.status(200).json({ ...other, accessToken });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  requestToken: async (req, res) => {
    // lấy token từ cookie ra
    const refestoken = req.cookies.refestoken;
    res.status(200).json(refestoken);
    if (!refestoken)
      return res.status(401).json("bạn cần đăng nhập rồi mới refresh");
    if (!refreshTokens.includes(refestoken)) {
      return res.status(403).json("refesh token không đúng");
    }
    const data = req.body;
    jwt.verify(refestoken, process.env.ACCESS_TOKEN_SECRET, (error, data) => {
      if (error) {
        console.log(error);
      } //nếu không đổi sẽ tạo token mới
      refreshTokens = refreshTokens.filter((token) => token !== refestoken);
      const newAccessToken = authControllers.generateAccessToken(data);
      const newRefreshTolen = authControllers.generateRefeshToken(data);
      refreshTokens.push(newAccessToken);
      res.cookie("refestoken", newRefreshTolen, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({ accessToken: newAccessToken });
    });
  },
  userLogout: async (req, res) => {
    res.clearCookie("refestoken");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refestoken
    );
    res.status(200).json("Đăng xuất thành công");
  },
};
module.exports = authControllers;
