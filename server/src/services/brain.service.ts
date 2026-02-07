import crypto from "crypto";
import Content from "../models/content.model.js";    

export const generateShareLinkService = async (contentId: string) => {
    const shareToken = crypto.randomBytes(32).toString("hex");
    const updateResult = await Content.findByIdAndUpdate(
        contentId,
        {isShared: true, shareId: shareToken},
        {new: true}
    );
    if (!updateResult) {
        throw new Error("Content not found");
    }
    return updateResult.shareId;
}

export const getSharedContentService = async (shareId: string) => {
    try {
        const content = await Content.findOne({shareId, isShared: true}).populate('tags', 'name');
        return content;
    } catch (error) {
        throw new Error("Error fetching shared content");
    }
}