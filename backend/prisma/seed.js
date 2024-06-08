const bcrypt = require("bcryptjs");
const prisma = require("../src/models/prisma");

const password = bcrypt.hashSync("!aA123");

const roleData = [{ roleName: "ADMIN" }, { roleName: "USER" }];

const userData = [
  {
    firstName: "Baki",
    lastName: "Hanma",
    email: "user1@ifcg.co.th",
    isActive: true,
    password,
  },
  {
    firstName: "Yujiro",
    lastName: "Hanma",
    email: "user2@ifcg.co.th",
    isActive: true,
    password,
  },
  {
    firstName: "Jack",
    lastName: "Hanma",
    email: "user3@ifcg.co.th",
    isActive: false,
    password,
  },
  {
    firstName: "Doppo",
    lastName: "Orochi",
    email: "user4@ifcg.co.th",
    isActive: true,
    password,
  },
  {
    firstName: "Gouki",
    lastName: "Shibukawa",
    email: "user5@ifcg.co.th",
    isActive: true,
    password,
  },
  {
    firstName: "Biscuit",
    lastName: "Oliva",
    email: "user6@ifcg.co.th",
    isActive: false,
    password,
  },
  {
    firstName: "Retsu",
    lastName: "Kaioh",
    email: "user7@ifcg.co.th",
    isActive: true,
    password,
  },
];

const userRoleData = [
  {
    assignedAt: new Date(),
    userId: 1,
    roleId: 1,
  },
  {
    assignedAt: new Date(),
    userId: 1,
    roleId: 2,
  },
  {
    assignedAt: new Date(),
    userId: 2,
    roleId: 1,
  },
  {
    assignedAt: new Date(),
    userId: 3,
    roleId: 2,
  },
  {
    assignedAt: new Date(),
    userId: 4,
    roleId: 2,
  },
  {
    assignedAt: new Date(),
    userId: 5,
    roleId: 2,
  },
  {
    assignedAt: new Date(),
    userId: 6,
    roleId: 2,
  },
  {
    assignedAt: new Date(),
    userId: 7,
    roleId: 2,
  },
];

const run = (asyc = async () => {
  await prisma.role.createMany({ data: roleData });
  await prisma.user.createMany({ data: userData });
  await prisma.userRole.createMany({ data: userRoleData });
});

run();
