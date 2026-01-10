import mongoose from "mongoose";

export async function connect(){
    try{
        await mongoose.connect(process.env.MONGOURL as string);
        console.log("Connection Successful.")
    }catch(e){
        console.log("Not connected " + e);
    }
}

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String}
});

const contentType = ['images', 'video', 'articl', 'audio'];
const contentSchema = new mongoose.Schema({
    link: {type: String},
    type: {type: String, enum: contentType, required: true},
    title: {type: String, required: true},
    tags: {type: mongoose.Schema.Types.ObjectId, ref: 'Tag'},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true} 
});

const tagsSchema = new mongoose.Schema({
    title: {type: String, unique: true, required: true}
});

const linkSchema = new mongoose.Schema({
    hash: {type: String},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

export const User = mongoose.model('User', userSchema);
export const Content = mongoose.model('Content', contentSchema);
export const Tag = mongoose.model('Tag', tagsSchema);
export const Link = mongoose.model('Link', linkSchema);