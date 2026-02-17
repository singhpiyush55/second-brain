import mongoose from "mongoose";

export async function connect(){
    try{
        await mongoose.connect(process.env.MONGOURL as string);
        console.log("Connection Successful.")
    }catch(e){
        console.log("Not connected " + e);
    }
}