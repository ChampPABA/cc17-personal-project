const fs = require("fs");
const path = require("path");
const quotationService = require("../services/quotation-service");
const createError = require("../utils/create-error");

const quotationController = {};

quotationController.getQuotationByAuthUserId = async (req, res, next) => {
  try {
    const quotations = await quotationService.findQuotationByAuthUserId(
      req.user.id
    );
    res.status(200).json({ quotations });
  } catch (error) {
    next(error);
  }
};

quotationController.create = async (req, res, next) => {
  try {
    if (!req.file) {
      createError({
        message: "No file uploaded",
        statusCode: 400,
      });
    }

    const data = {
      ...req.body,
      pdfPath: req.file.path,
      userId: req.user.id,
    };

    await quotationService.createQuotation(data);
    res.status(201).json({ message: "quotation created" });
  } catch (error) {
    next(error);
  }
};

quotationController.updateQuotationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await quotationService.findQuotationByAuthUserId(
      req.user.id
    );

    // ดูว่า User คนนี้ได้เป็นคนสร้าง Quotation รึเปล่า
    if (!result.some((quotation) => quotation.id === Number(id))) {
      createError({
        message: "You can't edit this quotation",
        statusCode: 400,
      });
    }

    await quotationService.updateQuotationStatusByQuotationId(
      Number(id),
      status
    );
    res.status(200).json({ message: "Status Updated Successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = quotationController;
