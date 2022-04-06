const User = require("../models/User");
const userController = {
  getAllUser: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

      res.status(200).json("Xóa user thành công");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = userController;
