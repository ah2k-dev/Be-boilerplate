import { Response } from 'express';
import { SuccessHandlerParams, SuccessHandlerFunction } from '../types/generalTypes'; // Adjust the import path as needed

const SuccessHandler: SuccessHandlerFunction<any> = ({ data, statusCode, res }: SuccessHandlerParams<any>): Response => {
  return res.status(statusCode).json({
    success: true,
    data: data,
  });
};

export default SuccessHandler;
