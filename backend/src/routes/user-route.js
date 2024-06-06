const express = require("express");
const {
  registerValidator,
  loginValidator,
} = require("../middlewares/validator");
const userController = require("../controllers/user-controller");
const authenticate = require("../middlewares/authenticate");
const roleCheck = require("../middlewares/role-check");

const userRouter = express.Router();

userRouter.post("/register", registerValidator, userController.register);
userRouter.post("/login", loginValidator, userController.login);

userRouter.get("/all", authenticate, roleCheck);

module.exports = userRouter;
