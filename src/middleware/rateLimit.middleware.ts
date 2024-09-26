import rateLimit from "express-rate-limit";
import { Request, Response, NextFunction } from "express";

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes",
    standardHeaders: true,
    legacyHeaders: false,
});

export const rateLimitMiddleware = (req: Request, res: Response, next: NextFunction) => {
    rateLimiter(req, res, next);
}

