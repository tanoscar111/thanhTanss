const express = require("express");
const app = express();
const mongooses = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRouter = require("./routes/user");
const AuthRouter = require("./routes/auth");
mongooses
  .connect(process.env.DB_URL)
  .then(() => console.log("DBConnection Succcess Ahihih !!!"))
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());
app.use("/", userRouter);
app.use("/", AuthRouter);
app.listen(process.env.PORT || 5000, () => {
  console.log("backend server is running");
});
