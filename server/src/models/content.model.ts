import mongoose from "mongoose";
import { is } from "zod/locales";

const contentType = ['images', 'video', 'article', 'audio', 'document', 'tweet', 'youtube', 'link'];
const contentSchema = new mongoose.Schema({
    link: {type: String},
    type: {type: String, enum: contentType, required: true},
    title: {type: String, required: true},
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},

    // Updated for sharing functionality
    isShared: {type: Boolean, default: false},
    shareId: {type: String, unique: true, sparse: true}
});

const Content = mongoose.model('Content', contentSchema);
export default Content;
