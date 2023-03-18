const logger = require("../functions/logger");

module.exports = (req, res, next) => {
  logger.info({
    method: req.method,
    url: req.url,
    date: new Date(),
    message: "Request received",
  });
  next();
};
