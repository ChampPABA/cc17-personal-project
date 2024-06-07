import Joi from "joi";

const registerScema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .message({ "string.empty": "first name is required." }),
  lastName: Joi.string()
    .required()
    .trim()
    .messages({ "string.empty": "last name is required" }),
  email: Joi.string()
    .required()
    .email({ tlds: false })
    .messages({ "string.empty": "email is required" }),
  password: Joi.string()
    .required()
    .pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/)
    .messages({
      "string.empty": "password is required",
      "string.pattern.base":
        "password must be at least 6 characters and contain at least 1 special alphabet, 1 Uppercase, 1 number",
    }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "string.empty": "confirm password is required",
    "any.only": "password and confirm password is not match",
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
