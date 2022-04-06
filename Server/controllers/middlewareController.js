const jwt = require("jsonwebtoken");
const middlewareController = {
  //verifyToken
  verifyToken: (req, res, next) => {
    const token = req.headers.token;

    if (token) {
      //Bearer cắt chuổi lấy mỗi token đằng sau
      const accessToken = token.split(" ")[1];

      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          res.status(403).json("Token đã hết hạn");
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("Chưa xác thực token");
    }
  },
};
module.exports = middlewareController;
