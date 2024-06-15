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
    res.status(201).json({ message: "Quotation Created" });
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
        message: "You don't have permission to update this quotation's status",
        statusCode: 403,
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

quotationController.updateQuotation = async (req, res, next) => {
  try {
    if (!req.file) {
      createError({
        message: "No file uploaded",
        statusCode: 400,
      });
    }

    const { id } = req.params;
    const { data } = req.body;
    const existingQuotation = await quotationService.findQuotationById(
      Number(id)
    );

    if (existingQuotation.userId !== req.user.id) {
      createError({
        message: "You don't have permission to update this quotation",
        statusCode: 403,
      });
    }

    const updatedData = {
      ...JSON.parse(data),
      pdfLink: existingQuotation.pdfLink,
      // pdfPath: req.file.path,
    };

    await quotationService.updateQuotation(Number(id), updatedData, req.file);
    res.status(200).json({ message: "Quotation Updated Successfully" });
  } catch (error) {
    next(error);
  }
};

quotationController.getQuotationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const quotation = await quotationService.findQuotationById(Number(id));
    if (!quotation) {
      createError({
        message: "Quotation not found",
        statusCode: 404,
      });
    }
    res.status(200).json(quotation);
  } catch (error) {
    next(error);
  }
};

module.exports = quotationController;
