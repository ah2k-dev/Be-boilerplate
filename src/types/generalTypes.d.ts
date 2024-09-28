import { Request, Response } from 'express';
import { IUser } from './models/user';
import 'express-session';

declare module 'express-serve-static-core' {
  interface Request {
    user?: IUser | null;
  }
}
declare module 'express-session' {
  interface SessionData {
    deviceInfo?: {
      browser: string | undefined;
      version: string | undefined;
      os: string | undefined;
    };
    lastActive?: Date;
  }
}

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
export type SuccessHandlerFunction<T> = (
  params: SuccessHandlerParams<T>
) => Response;

export interface SwaggerDoc {
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
  tags: string[];
}
