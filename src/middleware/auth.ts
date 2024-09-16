import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User/user";
import dotenv from "dotenv";
import { AuthRequest } from "../types/generalTypes";

dotenv.config({ path: "../src/config/config.env" });

const isAuthenticated = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ success: false, message: "Not logged in" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { _id: string };
    const user = await User.findById(decoded._id).exec();

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
}

export { isAuthenticated, isAdmin };
