const express = require("express");
const { quotationValidator } = require("../middlewares/validator");
const quotationController = require("../controllers/quotation-controller");

const quotationRouter = express.Router();

quotationRouter.get("/", quotationController.getQuotationByAuthUserId);
quotationRouter.post("/create", quotationValidator, quotationController.create);

module.exports = quotationRouter;
