const router = require("express").Router();
const User = require("../models/User");

const authControllers = require("../controllers/authControllers");
//Register

router.post("/register", authControllers.registerUser);
module.exports = router;
