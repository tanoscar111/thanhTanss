const User = require("../models/User");
const bcrypt = require("bcrypt");

const authControllers = {
  //register
  registerUser: async (req, res) => {
    try {
      //mã hóa paswword
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
};
module.exports = authControllers;
