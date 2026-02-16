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
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    expiresAt: Date
});

const Share = mongoose.model('Share', shareSchema);
export default Share;