import { ca } from "zod/locales";
import Brain from "../models/brain.modal.js"
import Share from "../models/share.modal.js";
import Content from "../models/content.model.js";
import bcrypt from "bcrypt";

export const createShareLinkService = async (brainId: string, userId: string) => {
    try{
        // First if brainId is valid and belongs to the user, then create a share link.
        // Generate a random shareId, and save it in share modal with brainId and userId.
        const brain = await Brain.findOne({_id: brainId, userId});
        if (!brain) {
            throw new Error('Brain not found or does not belong to the user');
        }
        // Generate a random shareId
        const shareId = bcrypt.hashSync(brainId + userId + Date.now().toString(), 10);
        // Save the share link in the Share model
        const share = new Share({
            brainId,
            shareId
        });
        const savedShare = await share.save();
        return savedShare.shareId;
    }catch(error){
        throw error;
    }
}


export const getSharedBrainContentService = async (shareId: string) => {
    try{
        // First find the shareId in share modal, get the brainId, and return the content of that brain. And if shared id exists but brainId is not found, then return error.
        const share = await Share.findOne({ shareId });
        if (!share) {
            throw new Error('Shared brain not found');
        }    
        const brainId = share.brainId;
        const contents = await Content.find({ brainId }).populate('tags', 'title');
        return contents;
    }catch(error){
        throw error;
    }   
}