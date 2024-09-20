// src/middleware/auth.ts
import { RequestHandler, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User/user';
import dotenv from 'dotenv';
import { AuthRequest } from '../types/generalTypes';

dotenv.config({ path: '../src/config/config.env' });

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not logged in' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { _id: string };
    const user = await User.findById(decoded._id).exec();

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    (req as AuthRequest).user = user;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const isAdmin: RequestHandler = async (req, res, next) => {
  try {
    const user = (req as AuthRequest).user;
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
