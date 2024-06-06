const { RoleName } = require("@prisma/client");
const hashService = require("../services/hash-service");
const jwtService = require("../services/jwt-service");
const roleService = require("../services/role-service");
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
    const user = await userService.createUser(req.body);
    const userRole = await roleService.findIdByRoleName(RoleName.USER);
    await userService.createUserRole({ userId: user.id, roleId: userRole.id });

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
        message: "Do not have permission to access.",
        statusCode: 400,
      });
    }
    const isMatch = await hashService.compare(password, existUser.password);

    if (!isMatch) {
      createError({
        message: "Do not have permission to access.",
        statusCode: 400,
      });
    }

    // if (!existUser.isActive) {
    //   createError({
    //     message: "Do not have permission to access.",
    //     statusCode: 400,
    //   });
    // }
    const accessToken = jwtService.sign({ id: existUser.id });
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

module.exports = userController;
