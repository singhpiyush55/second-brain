import type { Request, Response } from "express";
import { addBrainService, getBrainsService } from "../services/brain.service.js";

export const addBrain = async (req: Request, res: Response) => {
    try { 
        // Logic to add a new brain for a user
        const data = req.body;
        const user = (req as any).user;
        const newBrain = await addBrainService(data, user);
        res.status(201).json({ 
            success: true, 
            brain: newBrain 
        });
    } catch (error) {
        console.error("Error adding brain:", error);
        res.status(500).json({ error: "Failed to add brain" });
    }   
};

export const getBrains = async (req: Request, res: Response) => {
    try {
        // Logic to retrieve all brains for a user
        const user = (req as any).user;
        const brains = await getBrainsService(user);
        res.status(200).json({ brains });
    } catch (error) {
        console.error("Error retrieving brains:", error);
        res.status(500).json({ error: "Failed to retrieve brains" });
    }   
};