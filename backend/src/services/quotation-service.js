const prisma = require("../models/prisma");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const quotationService = {};

quotationService.createQuotation = async (data) => {
  const result = await cloudinary.uploader.upload(data.pdfPath, {
    resource_type: "raw",
    folder: "quotations",
  });

  fs.unlinkSync(data.pdfPath);

  const parsedData = JSON.parse(data.data);

  delete parsedData.createdAt;

  return prisma.quotation.create({
    data: {
      ...parsedData,
      pdfLink: result.secure_url,
      userId: data.userId,
    },
  });
};

quotationService.findQuotationByAuthUserId = (userId) =>
  prisma.quotation.findMany({
    where: {
      userId,
    },
  });

quotationService.updateQuotationStatusByQuotationId = (id, status) =>
  prisma.quotation.update({
    data: {
      status,
    },
    where: {
      id,
    },
  });

quotationService.updateQuotation = async (id, data, file) => {
  // ดึงข้อมูลเก่า
  const existingQuotation = await prisma.quotation.findUnique({
    where: {
      id,
    },
  });

  // ลบไฟล์เก่าจาก Cloudinary
  const oldFilePublicId = existingQuotation.pdfLink
    .split("/")
    .pop()
    .split(".")[0];
  await cloudinary.uploader.destroy(`quotations/${oldFilePublicId}`, {
    resource_type: "raw",
  });

  // อัพไฟล์ใหม่
  const result = await cloudinary.uploader.upload(file.path, {
    resource_type: "raw",
    folder: "quotations",
  });

  const updatedData = { ...data, pdfLink: result.secure_url };

  fs.unlinkSync(file.path);

  delete updatedData.createdAt;
  delete updatedData.updatedAt;

  return prisma.quotation.update({
    data: updatedData,
    where: {
      id,
    },
  });
};

quotationService.findQuotationById = (id) =>
  prisma.quotation.findUnique({
    where: {
      id,
    },
  });

module.exports = quotationService;
