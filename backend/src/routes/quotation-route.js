const express = require("express");
const { quotationValidator } = require("../middlewares/validator");
const quotationController = require("../controllers/quotation-controller");
const upload = require("../middlewares/upload");

const quotationRouter = express.Router();

quotationRouter.get("/", quotationController.getQuotationByAuthUserId);
quotationRouter.post(
  "/create",
  upload.single("file"),
  quotationController.create
);

module.exports = quotationRouter;
