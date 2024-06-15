const prisma = require("../models/prisma");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const nodemailer = require("nodemailer");

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

quotationService.softDeleteQuotationById = (id, deletedAt) =>
  prisma.quotation.update({
    data: {
      deletedAt,
    },
    where: {
      id,
    },
  });

quotationService.hardDeleteQuotationById = async (id) => {
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

  return prisma.quotation.delete({
    where: {
      id,
    },
  });
};

quotationService.sendEmail = async (quotation, email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Quotation",
    html: `<p>Here is your quotation: <a href="${quotation.pdfLink}">Download PDF</a></p><p></p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Send" + info.response);
    }
  });
};

module.exports = quotationService;
