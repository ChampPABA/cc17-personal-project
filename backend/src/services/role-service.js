const prisma = require("../models/prisma");

const roleService = {};

roleService.findIdByRoleName = (roleName) =>
  prisma.role.findFirst({
    where: {
      roleName,
    },
  });

module.exports = roleService;
