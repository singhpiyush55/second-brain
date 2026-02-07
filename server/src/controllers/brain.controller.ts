import type {Request, Response} from "express";
import { generateShareLinkService, getSharedContentService } from "../services/brain.service.js";

export const generateShareLink = async (req: Request, res: Response) => {
    try {
        const {contentId} = req.body;
        const shareId = await generateShareLinkService(contentId);
        res.status(200).json(
            {
                shareLink: `${req.protocol}://${req.get('host')}/api/v1/brain/share/${shareId}`
            }
        );
    } catch (error: any) {
        if(error.message === "Content not found") {
            res.status(404).json({message: "Content not found"});
        } else {
            res.status(500).json({message: "Error"});
        }
    }
}

export const shareContent = async (req: Request, res: Response) => {
    try {
        const {shareId} = req.params;   
        if(!shareId) {
            return res.status(400).json({message: "Share ID is required"});
        }
        const content = await getSharedContentService(shareId);
        if (!content) {
            return res.status(404).json({message: "Content not found"});
        }
        res.status(200).json(content);
    } catch (error: any) {
        if(error.message === "Error fetching shared content") {
            res.status(404).json({message: "Content not found"});
        } else {    
            res.status(500).json({message: "Error"});
        }
    }
}