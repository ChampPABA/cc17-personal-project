const Joi = require("joi");

exports.registerSchema = Joi.object({
  firstName: Joi.string().required().trim(),
  lastName: Joi.string().required().trim(),
  email: Joi.string().email({ tlds: false }).required(),
  password: Joi.string().pattern(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/
  ),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).strip(),
});

exports.loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
