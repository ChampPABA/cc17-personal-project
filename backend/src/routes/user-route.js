const express = require("express");
const {
  registerValidator,
  loginValidator,
} = require("../middlewares/validator");
const userController = require("../controllers/user-controller");

const userRouter = express.Router();

userRouter.post("/register", registerValidator, userController.register);
userRouter.post("/login", loginValidator, userController.login);

module.exports = userRouter;
