import { Router } from "express";
import { 
    getAllContentForUser,  
    addContent, 
    addContentToBrain, 
    deleteContentForUser, 
    getAllContentForUserForBrain
} from "../controllers/content.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = Router();

// Add content. 
router.post('/',authMiddleware, addContent);
router.post('/:brainId',authMiddleware, addContentToBrain);

// Get all the content for the user. 
router.get('/', authMiddleware, getAllContentForUser);
router.get('/:brainId', authMiddleware, getAllContentForUserForBrain);

// Delete the content for given 'id'
// Get the content id from req.params.id 
router.delete('/:id', authMiddleware, deleteContentForUser);

export default router;