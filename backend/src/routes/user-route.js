const express = require("express");
const {
  registerValidator,
  loginValidator,
} = require("../middlewares/validator");
const userController = require("../controllers/user-controller");
const authenticate = require("../middlewares/authenticate");
// const roleCheck = require("../middlewares/role-check");

const userRouter = express.Router();

userRouter.post("/register", registerValidator, userController.register);

userRouter.post("/login", loginValidator, userController.login);

userRouter.get("/me", authenticate, userController.getMe);

userRouter.post("/request-otp", userController.requestOTP);

userRouter.post("/verify-otp", userController.verifyOTP);

userRouter.post("/change-password", userController.changePassword);

module.exports = userRouter;
