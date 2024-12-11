const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const userController = require("../controllers/user.controller");
const limiter = require("../helpers/limiter");

// router.post("/login", async (req, res) => {
//   console.log("req :>> ", req);
//   try {
//     const user = new User({});
//     await user.save();
//     console.log("success");

//     res.status(201).send(user);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });
router.post("/signup", userController.create);
router.post("/login", limiter.loginLimiter, userController.login);
router.get("/getInfo", userController.getInfo);

module.exports = router;
