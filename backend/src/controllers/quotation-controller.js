const quotationService = require("../services/quotation-service");

const quotationController = {};

quotationController.getQuotationByAuthUserId = async (req, res, next) => {
  try {
    console.log(req.body.userId);
    const quotations = await quotationService.findQuotationByAuthUserId(
      req.body.userId
    );
    console.log("....................");
    console.log(quotations);
    res.status(200).json({ quotations });
  } catch (error) {
    next(error);
  }
};

quotationController.create = async (req, res, next) => {
  try {
    req.body.userId = req.user.id;
    await quotationService.createQuotation(req.body);
    res.status(201).json({ message: "quotation created" });
  } catch (error) {
    next(error);
  }
};

module.exports = quotationController;
