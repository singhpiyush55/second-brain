import type { Request, Response } from "express";
import { loginService, signupService, verifyTokenService } from "../services/user.service.js";
import { ZodError } from "zod";

export const signup = async(req: Request, res: Response) => {
    try{
        const user = await signupService(req.body);
        res.status(201).json({
            user: {
                id: user._id,
                username: user.username
            }
        });
    } catch (error: any) {
        if (error.message === "Username already exists") {
            res.status(400).json({ error: error.message });
        } else if (error instanceof ZodError) {
            res.status(400).json({
                error: "Invalid input",
                message: error.message
            });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const token = await loginService(req.body);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });
        res.status(200).json({ message: "Login successful" });
    } catch (error: any) {
        if(error instanceof ZodError) {
            res.status(400).json({
                error: "Invalid input",
                message: error.message
            });
        }else if (error.message === "User not found" || error.message === "Invalid password" || error.message === "JWT_SECRET not defined") {
            res.status(401).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

export const logout = async (req: Request, res: Response) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production"
    });
    res.status(200).json({ message: "Logout successful" });
}

export const getMe = async (req: Request, res: Response) => {
    // verify token from cookie and return user info
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const user = await verifyTokenService(token);
        if (!user) {
            return res.status(401).json({ error: "service not found the user" });
        }
        console.log("User details from token verification:", user);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username
        });
    } catch (error) {
        res.status(401).json({ error: "Unauthorized" });
    }
}


/*
res.clearCookie("token", {
  httpOnly: true,
  sameSite: "strict",
  secure: true
});

*/ 