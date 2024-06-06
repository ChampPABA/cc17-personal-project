const express = require("express");
const { registerValidator } = require("../middlewares/validator");
const userController = require("../controllers/user-controller");

const userRouter = express.Router();

userRouter.post("/register", registerValidator, userController.register);

module.exports = userRouter;
