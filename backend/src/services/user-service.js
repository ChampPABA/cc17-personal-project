const prisma = require("../models/prisma");

const userService = {};

userService.findUserByEmail = (email) =>
  prisma.user.findFirst({
    where: {
      email,
      isActive: true,
    },
  });

userService.createUser = (data) => prisma.user.create({ data });

userService.createUserRole = (data) => prisma.userRole.create({ data });

userService.findUserById = (userId) =>
  prisma.user.findUnique({
    where: {
      id: userId,
      isActive: true,
    },
  });

module.exports = userService;
