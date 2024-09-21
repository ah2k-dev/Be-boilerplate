import { Response } from 'express';
import {
  SuccessHandlerParams,
  SuccessHandlerFunction
} from '../types/generalTypes'; // Adjust the import path as needed

const SuccessHandler: SuccessHandlerFunction<unknown> = <T>({
  data,
  statusCode,
  res
}: SuccessHandlerParams<T>): Response => {
  return res.status(statusCode).json({
    success: true,
    data: data
  });
};

export default SuccessHandler;
