const prisma = require("../models/prisma");
const nodemailer = require("nodemailer");
const userService = require("./user-service");
const createError = require("../utils/create-error");

const otpService = {};

otpService.generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // สร้าง OTP 6 หลัก
};

otpService.gerateReferenceCode = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let refCode = "";
  for (let i = 0; i < 6; i++) {
    refCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return refCode;
};

otpService.createAndSendOTP = async (email) => {
  try {
    const otp = otpService.generateOTP();
    const refCode = otpService.gerateReferenceCode();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // Set อายุ OTP 5 นาที

    await prisma.oTP.deleteMany({ where: { email } }); // ลบ OTP เก่า ถ้ามี
    const otpData = await prisma.oTP.create({
      data: {
        email,
        otp,
        refCode,
        expiresAt,
      },
    });

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
      subject: "Your OTP Code",
      html: `<p>Your OTP code is: <string>${otp}</strong></p><p>This OTP is valid for 5 minutes.</p><p>Your reference code is: <strong>${refCode}</strong></p>`,
    };
    const result = await transporter.sendMail(mailOptions);
    otpData.result = result;
    return otpData;
  } catch (error) {
    next(error);
  }
};

otpService.verifyOTP = async (email, otp, refCode) => {
  const otpRecord = await prisma.oTP.findFirst({
    where: {
      email,
      otp,
      refCode,
      expiresAt: {
        gte: new Date(), // เช็คว่า ยังไม่หมดอายุ gte ==> greater than or equal เวลาปัจจุบัน
      },
    },
  });

  if (!otpRecord) {
    createError({
      message: "Invalid or Expired OTP",
      statusCode: 400,
    });
  }

  // await prisma.oTP.deleteMany({ where: { email } }); // ลบ OTP หลังจากใช้เสร็จแล้ว

  return true;
};

otpService.deleteOTP = async (email) =>
  await prisma.oTP.deleteMany({ where: { email } });

module.exports = otpService;
