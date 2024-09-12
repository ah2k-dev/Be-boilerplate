// const logger = require("../functions/logger");
import logger from "../functions/logger.js";

 const loggerMiddleware = (req, res, next) => {
  logger.info({
    method: req.method,
    url: req.url,
    date: new Date(),
    message: "Request received",
  });
  next();
};

export default loggerMiddleware;
