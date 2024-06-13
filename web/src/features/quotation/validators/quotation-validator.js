import Joi from "joi";

const quotationSchema = Joi.object({
  customerFirstName: Joi.string().messages({
    "string.empty": "data is required",
  }),
  customerLastName: Joi.string().allow(""),
  customerMobile: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .allow("")
    .messages({ "string.pattern.base": "must be a mobile number format" }),
  customerEmail: Joi.string()
    .email({ tlds: false })
    .allow("")
    .messages({ "string.email": "invalid email format" }),
  projectName: Joi.string()
    .required()
    .messages({ "string.empty": "data is required" }),
  roomNo: Joi.string().allow(""),
  roomFloor: Joi.string().allow(""),
  roomType: Joi.string().allow(""),
  roomSize: Joi.number()
    .precision(2)
    .greater(0)
    .messages(
      { "number.base": "must be a number" },
      { "number.greater": "must be positive number" }
    ),
  roomPrice: Joi.number()
    .precision(2)
    .greater(0)
    .messages(
      { "number.base": "must be a number" },
      { "number.greater": "must be positive number" }
    ),
  roomDiscount: Joi.number()
    .precision(2)
    .greater(0)
    .messages(
      { "number.base": "must be a number" },
      { "number.greater": "must be positive number" }
    ),
  bookingPayment: Joi.number()
    .precision(2)
    .greater(0)
    .messages(
      { "number.base": "must be a number" },
      { "number.greater": "must be positive number" }
    ),
  downPayment: Joi.number()
    .precision(2)
    .greater(0)
    .messages(
      { "number.base": "must be a number" },
      { "number.greater": "must be positive number" }
    ),
  commonFee: Joi.number()
    .precision(2)
    .greater(0)
    .messages(
      { "number.base": "must be a number" },
      { "number.greater": "must be positive number" }
    ),
  sinkingFund: Joi.number()
    .precision(2)
    .greater(0)
    .messages(
      { "number.base": "must be a number" },
      { "number.greater": "must be positive number" }
    ),
  createdAt: Joi.alternatives().try(Joi.date(), Joi.string().allow("")).strip(),
});

const validateQuotation = (input) => {
  const { error } = quotationSchema.validate(input, { abortEarly: false });
  if (error) {
    const result = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      return acc;
    }, {});
    console.dir(error);
    return result;
  }
};

export default validateQuotation;
