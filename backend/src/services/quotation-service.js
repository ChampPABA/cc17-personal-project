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

module.exports = quotationService;
