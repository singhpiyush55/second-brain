import mongoose from "mongoose";

const tagsSchema = new mongoose.Schema({
    title: {type: String, unique: true, required: true}
});

export const Tag = mongoose.model('Tag', tagsSchema);
