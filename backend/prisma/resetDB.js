require("dotenv").config();
const prisma = require("../src/models/prisma");

async function run() {
  await prisma.$executeRawUnsafe("DROP DATABASE quotation_project");
  await prisma.$executeRawUnsafe("CREATE DATABASE quotation_project");
}

console.log("Reset DB..");
run();
