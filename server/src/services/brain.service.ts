import brain from "../models/brain.modal.js";


export const addBrainService = async (data: any, user: any) => {
    try{
        // Logic to add a new brain for a user
        const newBrain = {
            title: data.title,
            userId: user.userId
        };
        const createdBrain = await brain.create(newBrain);
        return createdBrain;
    }catch(error){
        throw error;
    }
};

export const getBrainsService = async (user: any) => {
    try{
        const brains = await brain.find({ userId: user.userId });
        return brains;
    }catch(error){  
        throw error;
    }
};