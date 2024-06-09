const { userRole } = require("../models/prisma");
const jwtService = require("../services/jwt-service");
const userService = require("../services/user-service");
const createError = require("../utils/create-error");

const authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    console.log(authorization);
    if (!authorization || !authorization.startsWith("Bearer ")) {
      createError({
        message: "unauthenticated",
        statusCode: 401,
      });
    }

    const accessToken = authorization.split(" ")[1];
    const payload = jwtService.verify(accessToken);

    const user = await userService.findUserById(payload.id);
    if (!user) {
      createError({
        message: "user was not found",
        statusCode: 400,
      });
    }

    if (!user.isActive) {
      createError({
        message: "user is not activated",
        statusCode: 403,
      });
    }

    delete user.password;

    const userRoles = user.userRoles.map((userRole) => userRole.role.roleName);
    req.user = { ...user, userRoles };
    console.log(req.user);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
