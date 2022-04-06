const express = require("express");
const cors = require("cors");

const mongooses = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();
const userRouter = require("./routes/user");
const AuthRouter = require("./routes/auth");
const app = express();

mongooses.connect(process.env.DB_URL, () =>
  console.log("DBConnection Succcess Ahihih !!!")
);
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/v1/auth", AuthRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log("backend server is running");
});
//Authentication: là chức năng login và register
//Authorization: phân quyền user
