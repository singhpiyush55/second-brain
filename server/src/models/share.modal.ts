import mongoose from "mongoose";

const shareSchema = new mongoose.Schema({
    brainId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Brain', 
        required: true 
    },
    shareId: { 
        type: String, 
        required: true, 
        unique: true 
    },
}, { timestamps: true });

const Share = mongoose.model('Share', shareSchema);
export default Share;