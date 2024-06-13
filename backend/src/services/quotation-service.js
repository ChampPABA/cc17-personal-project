const prisma = require("../models/prisma");

const quotationService = {};

quotationService.createQuotation = (data) => prisma.quotation.create({ data });

quotationService.findQuotationByAuthUserId = (userId) =>
  prisma.quotation.findMany({
    where: {
      userId,
    },
  });

module.exports = quotationService;
