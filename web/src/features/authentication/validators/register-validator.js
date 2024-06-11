import Joi from "joi";

const registerScema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .messages({ "string.empty": "first name is required." }),
  lastName: Joi.string()
    .required()
    .trim()
    .messages({ "string.empty": "last name is required." }),
  email: Joi.string()
    .required()
    .email({ tlds: false })
    .pattern(/^[\w-\\.]+@ifcg\.co\.th$/)
    .messages({
      "string.empty": "email is required.",
      "string.pattern.base": "only @ifcg.co.th email address",
    }),
  password: Joi.string()
    .required()
    .pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/)
    .messages({
      "string.empty": "password is required",
      "string.pattern.base":
        "password must be at least 6 characters and contain at least 1 special alphabet, 1 Uppercase, 1 number",
    }),
  confirmPassword: Joi.string()
    .required()
    .messages({ "string.empty": "confirm password is required." })
    .custom((value, helpers) => {
      if (value !== helpers.state.ancestors[0].password) {
        return helpers.message("password and confirm password do not match.");
      }
      return value;
    }),
});

const validateRegister = (input) => {
  const { error } = registerScema.validate(input, { abortEarly: false });
  if (error) {
    const result = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      return acc;
    }, {});
    console.dir(error);
    return result;
  }
};

export default validateRegister;
