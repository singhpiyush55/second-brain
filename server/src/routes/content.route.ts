import { Router } from "express";
import { getAllContentForUser, addContent, deleteContentForUser} from "../controllers/content.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = Router();

// Add content. 
router.post('/',authMiddleware, addContent);

// Get all the content for the user. 
router.get('/', authMiddleware, getAllContentForUser);

// Delete the content for given 'id'
// Get the content id from req.params.id 
router.delete('/:id', authMiddleware, deleteContentForUser);

export default router;