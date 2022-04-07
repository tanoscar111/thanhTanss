const middlewareController = require("../controllers/middlewareController");
const userController = require("../controllers/userController");

const router = require("express").Router();

router.get("/", middlewareController.verifyToken, userController.getAllUser);
//chỉ có mình mới xóa đượ chính mình và admin xóa được tài khoản của mình
router.delete(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  userController.deleteUser
);
module.exports = router;
