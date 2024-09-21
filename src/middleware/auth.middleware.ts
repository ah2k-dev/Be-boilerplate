// src/middleware/auth.ts
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User/user.model';
import dotenv from 'dotenv';

dotenv.config({ path: '../src/config/config.env' });

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not logged in' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      _id: string;
    };
    const user = await User.findById(decoded._id).exec();

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const isAdmin: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user || user.role !== 'admin') {
      return res
        .status(403)
        .json({ success: false, message: 'Not authorized' });
    }
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
