const { rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 30,
  message: { message: "too many request, your request is limited" },
});

module.exports = limiter;
