const express = require("express");
const { quotationValidator } = require("../middlewares/validator");
const quotationController = require("../controllers/quotation-controller");
const upload = require("../middlewares/upload");

const quotationRouter = express.Router();

quotationRouter.get("/", quotationController.getQuotationByAuthUserId);

quotationRouter.post(
  "/create",
  quotationValidator,
  upload.single("file"),
  quotationController.create
);

quotationRouter.patch("/:id/status", quotationController.updateQuotationStatus);

quotationRouter.patch(
  "/:id",
  quotationValidator,
  upload.single("file"),
  quotationController.updateQuotation
);

quotationRouter.get("/:id", quotationController.getQuotationById);

quotationRouter.patch("/:id/delete", quotationController.deleteQuotationById);

quotationRouter.delete("/:id/delete", quotationController.deleteQuotationById);

quotationRouter.post("/:id/send-email", quotationController.sendEmail);

module.exports = quotationRouter;
