const hashService = require("../services/hash-service");
const userService = require("../services/user-service");
const createError = require("../utils/create-error");

const userController = {};

userController.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existEmail = await userService.findUserByEmail(email);
    if (existEmail) {
      createError({
        message: "This email is already registered.",
        statusCode: 400,
      });
    }
    req.body.password = await hashService.hash(password);
    console.log(req.body);
    await userService.createUser(req.body);
    res.status(200).json({ message: "user created" });
  } catch (error) {
    next(error);
  }
};

module.exports = userController;
