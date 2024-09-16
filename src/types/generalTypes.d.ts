import { Request, Response } from 'express';

export interface SendMailParams {
  email: string;
  subject: string;
  text: string;
}

export interface SuccessHandlerParams<T> {
  data: T;
  statusCode: number;
  res: Response;
}

export interface ErrorHandlerParams {
  message: string;
  statusCode: number;
  req: Request;
  res: Response;
}

export type ErrorHandlerFunction = (params: ErrorHandlerParams) => Response;
export type SuccessHandlerFunction<T> = (params: SuccessHandlerParams<T>) => Response;

interface SwaggerDoc {
  info: {
    title: string;
    description: string;
    version: string;
  };
  host: string;
  basePath: string;
  schemes: string[];
  consumes: string[];
  produces: string[];
  tags: any[];
}