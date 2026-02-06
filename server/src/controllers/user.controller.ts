import type { Request, Response } from "express";
import { loginService, signupService } from "../services/user.service.js";
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
        console.log(token);
    } catch (error) {
        if(error instanceof ZodError) {
            res.status(400).json({
                error: "Invalid input",
                message: error.message
            });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
        return;
    }
}


