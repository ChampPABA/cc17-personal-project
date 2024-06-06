const hashService = require("../services/hash-service");
const jwtService = require("../services/jwt-service");
const userService = require("../services/user-service");
const createError = require("../utils/create-error");

const userController = {};

userController.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existUser = await userService.findUserByEmail(email);
    if (existUser) {
      createError({
        message: "This user is already registered.",
        statusCode: 400,
      });
    }
    req.body.password = await hashService.hash(password);
    console.log(req.body);
    await userService.createUser(req.body);
    res.status(201).json({ message: "user created" });
  } catch (error) {
    next(error);
  }
};

userController.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existUser = await userService.findUserByEmail(email);
    if (!existUser) {
      createError({
        message: "invalid login",
        statusCode: 400,
      });
    }
    const isMatch = await hashService.compare(password, existUser.password);

    if (!isMatch) {
      createError({
        message: "invalid login",
        statusCode: 400,
      });
    }
    const accessToken = jwtService.sign({ id: existUser.id });
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

module.exports = userController;
