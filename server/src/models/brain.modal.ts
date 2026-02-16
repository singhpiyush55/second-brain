import mongoose from "mongoose";

const brainSchema = new mongoose.Schema({
    title: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

const Brain = mongoose.model('Brain', brainSchema);
export default Brain;