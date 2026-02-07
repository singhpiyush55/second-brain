import type { Request, Response } from "express";
import { ZodError } from "zod";
import { addContentService, getAllContentForUserService, deleteContentForUserService} from "../services/content.service.js";

export const addContent = async (req: Request, res: Response) => {
    try{
        const contentData = await addContentService(req.body, (req as any).user);
        res.status(201).json({ 
            success: true, 
            message: contentData.title + " added successfully", 
            content: contentData 
        });
    } catch (error: any) {
         // Zod validation error
        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error
            });
        }

        // Custom business errors
        if (error.message === "Tag title is required") {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        // Default / unknown error
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
}

export const getAllContentForUser = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;
        const contentList = await getAllContentForUserService(userId);
        res.json({
            success: true,
            content: contentList
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
}

export const deleteContentForUser = async (req: Request, res: Response) => {
    try {
        const contentId = req.params.id;
        if (!contentId) {
            return res.status(400).json({ message: "id is required" });
        }
        const userId = (req as any).user.userId;
        const deletedContent = await deleteContentForUserService(contentId, userId);
        res.json({
            success: true,
            message: "Content deleted successfully",
            deletedContent: deletedContent
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }   
}