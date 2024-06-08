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

const { registerSchema, loginSchema } = require("../validators/user-validator");

const validate = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.reduce((acc, err) => {
      acc[err.path[0]] = err.message;
      return acc;
    }, {});
    return res.status(400).json({ errors });
  }
  req.body = value;
  next();
};

exports.registerValidator = validate(registerSchema);
exports.loginValidator = validate(loginSchema);
