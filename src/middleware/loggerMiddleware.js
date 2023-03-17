const logger = require("../functions/logger");

module.exports = (req, res, next) => {
  logger.info({
    origin: req.headers["origin"],
    method: req.method,
    url: req.url,
    body: req.body,
    params: req.params,
    query: req.query,
    date: new Date(),
  });
  next();
};
