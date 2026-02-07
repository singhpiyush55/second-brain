import mongoose from "mongoose";

export async function connect(){
    try{
        await mongoose.connect(process.env.MONGOURL as string);
        console.log("Connection Successful.")
    }catch(e){
        console.log("Not connected " + e);
    }
}




const linkSchema = new mongoose.Schema({
    hash: {type: String},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

export const Link = mongoose.model('Link', linkSchema);