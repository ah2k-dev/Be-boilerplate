import { Response } from 'express';
import {
  ErrorHandlerParams,
  ErrorHandlerFunction
} from '../types/generalTypes'; // Adjust the import path as needed
import logger from './logger';

const ErrorHandler: ErrorHandlerFunction = ({
  message,
  statusCode,
  req,
  res
}: ErrorHandlerParams): Response => {
  logger.error({
    method: req.method,
    url: req.url,
    date: new Date(),
    message: message
  });

  return res.status(statusCode).json({
    success: false,
    message: message
  });
};

export default ErrorHandler;
