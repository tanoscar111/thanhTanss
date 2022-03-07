const express = require("express");
const app = express();
const mongooses = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongooses
  .connect(process.env.DB_URL)
  .then(() => console.log("DBConnection Succcess Ahihih !!!"))
  .catch((err) => {
    console.log(err);
  });
app.get("/api/test", () => {
  console.log("test is Succcess ahihih");
});
app.listen(process.env.PORT || 5000, () => {
  console.log("backend server is running");
});
