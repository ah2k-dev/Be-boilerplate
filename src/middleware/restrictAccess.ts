// src/middleware/restrictAccess.ts
import { Request, Response, NextFunction } from 'express';

const restrictAccess = (req: Request, res: Response, next: NextFunction): void => {
  const allowOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
  ]; // add your own domains here

  // Uncomment before deployment
  // if (!allowOrigins.includes(req.headers.origin as string)) {
  //   return res.status(401).json({
  //     message: 'Not Authenticated',
  //   });
  // }

  next();
};

export default restrictAccess;
