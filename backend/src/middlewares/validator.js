// const { registerSchema, loginSchema } = require("../validators/user-validator");

// exports.registerValidator = (req, res, next) => {
//   const { value, error } = registerSchema.validate(req.body);
//   if (error) {
//     return res.status(400).json({ message: error.details[0].message });
//   }
//   req.body = value;
//   next();
// };

// exports.loginValidator = (req, res, next) => {
//   const { value, error } = loginSchema.validate(req.body);
//   if (error) {
//     return res.status(400).json({ message: error.details[0].message });
//   }
//   req.body = value;
//   next();
// };

const { quotationSchema } = require("../validators/quotation-validator");
const { registerSchema, loginSchema } = require("../validators/user-validator");

const validate = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.body = value;
  next();
};

exports.registerValidator = validate(registerSchema);
exports.loginValidator = validate(loginSchema);
exports.quotationValidator = validate(quotationSchema);
