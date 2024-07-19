const prisma = require("../models/prisma");

const userService = {};

userService.findUserByEmail = (email) =>
  prisma.user.findFirst({
    where: {
      email,
    },
  });

userService.createUser = (data) => prisma.user.create({ data });

userService.createUserRole = (data) => prisma.userRole.create({ data });

userService.findUserById = (userId) =>
  prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      userRoles: {
        include: {
          role: true,
        },
      },
    },
  });

userService.updatePasswordByEmail = (email, password) =>
  prisma.user.update({
    where: { email },
    data: { password },
  });

// เขียน Function รอไว้ก่อน ทำ Front-end ก่อนค่อยมาทำ
userService.activateUser = (userId) =>
  prisma.user.update({
    where: { id: userId },
    data: { isActive: true },
  });

// เขียน Function รอไว้ก่อน ทำ Front-end ก่อนค่อยมาทำ
userService.deactivateUser = (userId) =>
  prisma.user.update({
    where: { id: userId },
    data: { isActive: false },
  });

// เขียน Function รอไว้ก่อน ทำ Front-end ก่อนค่อยมาทำ
userService.assignRoleToUser = (userId, roleId) =>
  prisma.userRole.create({
    data: {
      userId,
      roleId,
    },
  });

module.exports = userService;
