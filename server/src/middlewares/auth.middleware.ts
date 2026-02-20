// { userId: user._id }

import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"; 

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get token from cookies    
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).send({ message: "No token provided" });
        }
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET not defined");
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).send({ message: "Invalid token" });
    }
};