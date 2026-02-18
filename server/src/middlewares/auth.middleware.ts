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
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user = decoded;
        next();
    } catch (error) {
        return res.status(401).send({ message: "Invalid token" });
    }
};