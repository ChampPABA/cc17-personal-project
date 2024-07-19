const { RoleName } = require("@prisma/client");
const hashService = require("../services/hash-service");
const jwtService = require("../services/jwt-service");
const roleService = require("../services/role-service");
const userService = require("../services/user-service");
const createError = require("../utils/create-error");
const otpService = require("../services/otp-service");

const userController = {};

userController.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existUser = await userService.findUserByEmail(email);
    if (existUser) {
      createError({
        message: "This user is already registered.",
        statusCode: 400,
      });
    }
    req.body.password = await hashService.hash(password);
    console.log(req.body);
    const user = await userService.createUser(req.body);
    // ตรงนี้ค่อยมาปรับ ใช้ prisma transaction ถ้าไม่ใช้อาจเกิดปัญหา เพราะ จริงๆ แล้วต้อง create ทั้ง 2 ตาราง แต่ถ้าตารางใด ตารางหนึ่ง create ไม่ได้ อีกตารางต้อง rollback
    const userRole = await roleService.findIdByRoleName(RoleName.USER);
    await userService.createUserRole({ userId: user.id, roleId: userRole.id });

    res.status(201).json({ message: "User created" });
  } catch (error) {
    next(error);
  }
};

userController.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existUser = await userService.findUserByEmail(email);
    if (!existUser) {
      createError({
        message: "This user is not registered.",
        statusCode: 400,
      });
    }
    const isMatch = await hashService.compare(password, existUser.password);

    if (!isMatch) {
      createError({
        message: "Do not have permission to access.",
        statusCode: 400,
      });
    }

    if (!existUser.isActive) {
      createError({
        message: "This account is not activated",
        statusCode: 403,
      });
    }

    const accessToken = jwtService.sign({ id: existUser.id });
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

userController.getMe = async (req, res, next) => {
  res.status(200).json({ user: req.user });
};

userController.requestOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      createError({
        message: "Email is required",
        statusCode: 400,
      });
    }

    const validUser = await userService.findUserByEmail(email);
    if (!validUser) {
      createError({
        message: "Not Found",
        statusCode: 404,
      });
    }

    const result = await otpService.createAndSendOTP(email);

    res.status(200).json(result);

    // res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    next(error);
  }
};

userController.verifyOTP = async (req, res, next) => {
  try {
    const { email, otp, refCode } = req.body;
    if (!email || !otp || !refCode) {
      createError({
        message: "Email, OTP, and Reference Code are required",
      });
    }

    await otpService.verifyOTP(email, otp, refCode);
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    next(error);
  }
};

userController.changePassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await hashService.hash(password);

    await userService.updatePasswordByEmail(email, hashedPassword);
    await otpService.deleteOTP(email);
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = userController;
