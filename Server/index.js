const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
dotenv.config();
const app = express();

const authRoute = require("./routes/auth");
const UserRoute = require("./routes/user");
mongoose.connect(process.env.MONGOOSEDB_UL, () => {
  console.log("Connected to mongo Db");
});
app.use(cors());
app.use(cookieParser());
app.use(express.json());
console.log("tesstgit");

//router
app.use("/v1/auth", authRoute);
app.use("/v1/user", UserRoute);
app.listen(8000, () => {
  console.log("Server is runing");
});
