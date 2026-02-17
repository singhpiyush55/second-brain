import type { Request, Response } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createShareLinkService, getSharedBrainContentService } from "../services/share.service.js";
import { ca } from "zod/locales";
import e from "express";

export const shareBrain = async (req: Request, res: Response) => {
    try{
        const { brainId } = req.body;
        const userId = (req as any).user.userId; 
        const sharedId = await createShareLinkService(brainId, userId);
        res.json({
            sharedUrl: `${req.protocol}://${req.get('host')}/api/v1/share/${sharedId}`
        });
    }catch(error: any){
        if(error.message === 'Brain not found or does not belong to the user'){
            return res.status(404).json({ error: error.message });
        }else{
            return res.status(500).json({ errorMessage: 'Internal Server Error', error});
        } 
    }  
}

export const getSharedBrainContent = async (req: Request, res: Response) => {
    try{
        const { shareId } = req.params;
        if(!shareId){
            return res.status(400).json({ error: "Share ID is required" });
        }
        const contents = await getSharedBrainContentService(shareId);
        res.json(contents);
    }catch(error: any){
        if(error.message === 'Shared brain not found'){
            return res.status(404).json({ error: "Link Expired or Invalid" });
        }else{
            return res.status(500).json({ errorMessage: 'Internal Server Error', error});
        } 
    }  
}