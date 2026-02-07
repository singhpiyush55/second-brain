import mongoose from "mongoose";

const contentType = ['images', 'video', 'article', 'audio', 'document', 'tweet', 'youtube', 'link'];
const contentSchema = new mongoose.Schema({
    link: {type: String},
    type: {type: String, enum: contentType, required: true},
    title: {type: String, required: true},
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true} 
});

const Content = mongoose.model('Content', contentSchema);
export default Content;
