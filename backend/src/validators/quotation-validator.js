const Joi = require("joi");

exports.quotationSchema = Joi.object({
  customerFirstName: Joi.string().trim(),
  customerLastName: Joi.string().trim(),
  customerMobile: Joi.string().pattern(/^[0-9]{10}$/),
  customerEmail: Joi.string().email({ tlds: false }),
  projectName: Joi.string().trim(),
  roomNo: Joi.string().trim(),
  roomFloor: Joi.string().trim(),
  roomType: Joi.string().trim(),
  roomSize: Joi.number().precision(2).greater(0),
  roomPrice: Joi.number().precision(2).greater(0),
  roomDiscount: Joi.number().precision(2).greater(0),
  bookingPayment: Joi.number().precision(2).greater(0),
  downPayment: Joi.number().precision(2).greater(0),
  commonFee: Joi.number().precision(2).greater(0),
  sinkingFund: Joi.number().precision(2).greater(0),
});
