const Joi = require("joi");

exports.quotationSchema = Joi.object({
  customerFirstName: Joi.string(),
  customerLastName: Joi.string().allow(""),
  customerMobile: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .allow(""),
  customerEmail: Joi.string().email({ tlds: false }).allow(""),
  projectName: Joi.string(),
  roomNo: Joi.string().allow(""),
  roomFloor: Joi.string().allow(""),
  roomType: Joi.string().allow(""),
  roomSize: Joi.number().precision(2).greater(0),
  roomPrice: Joi.number().precision(2).greater(0),
  roomDiscount: Joi.number().precision(2).greater(0),
  bookingPayment: Joi.number().precision(2).greater(0),
  downPayment: Joi.number().precision(2).greater(0),
  commonFee: Joi.number().precision(2).greater(0),
  sinkingFund: Joi.number().precision(2).greater(0),
});
