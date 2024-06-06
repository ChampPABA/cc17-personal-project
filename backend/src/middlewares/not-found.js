const notFoundMiddleware = (req, res, next) => {
  res.status(400).json({
    message: `Requested URL: ${req.method} ${req.url} was not found on this server`,
  });
};

module.exports = notFoundMiddleware;
