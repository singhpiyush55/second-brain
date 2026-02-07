import {z} from "zod";
import Content from "../models/content.model.js";
import { Tag } from "../models/tag.model.js";

const contentSchema = z.object({
    type: z.enum(["document", "tweet", "youtube", "link"]),
    link: z.string().url(),
    title: z.string(),
    tags: z.array(z.string())
});

// This is to validate the req.body, which will be given by user. 
function validateContentData(data: any) {
    // Zod will throw an error if validation fails.
    return contentSchema.parse(data);           
}

export const addContentService = async (contentData: {
    link: string,
    type: "document" | "tweet" | "youtube" | "link",
    title: string,
    tags: string[]
}, user: { userId: string }) => {
    try{
        // This confirms that user have given correct data. 
        const validatedData = validateContentData(contentData);

        // Now we have to prepare the data to be saved in database. 
        // Add the user id.
        // Add the tag id. Search for the tag in database, if not found, create a new tag and get the id.
        const tagTitle = validatedData.tags[0]; 
        const userId = user.userId; 
        if (!tagTitle) {
           throw new Error("Tag title is required");
        }
        let tag = await Tag.findOne({ title: tagTitle });
        if (!tag) {
            tag = new Tag({ title: tagTitle });
            await tag.save();
        }
        const content = new Content({
            link: validatedData.link,
            type: validatedData.type,
            title: validatedData.title,
            tags: [tag._id], 
            userId: userId
        });
        const savedContent = await content.save();
        console.log("Content added successfully: ", savedContent);
        return savedContent;
    } catch (error) {
        // Don't throw new error, just throw original, controller will handle it and send response to user.
        throw error;
    }
}

export const getAllContentForUserService = async (userId: string) => {
    try {
        const contentList = await Content.find({ userId: userId }).populate('tags', 'title');
        return contentList;
    } catch (error) {
        throw error;
    }   
}

export const deleteContentForUserService = async (contentId: string, userId: string) => {
    try {
        const deletedContent = await Content.findOneAndDelete({ _id: contentId, userId: userId });
        return deletedContent;
    } catch (error) {
        throw error;
    }   
}