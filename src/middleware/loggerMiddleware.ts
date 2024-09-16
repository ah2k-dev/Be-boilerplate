import { Request, Response, NextFunction } from 'express';
import logger from "../functions/logger";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  logger.info({
    method: req.method,
    url: req.url,
    date: new Date(),
    message: "Request received",
  });
  next();
};

export default loggerMiddleware;