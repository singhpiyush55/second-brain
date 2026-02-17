import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { shareBrain, getSharedBrainContent } from "../controllers/share.controller.js";
const router = Router();

// Now Brains will be shared.
// POST endpoint to catch brain_id. 
// Create a entry in share modal, with brain_id and generated shareId.
// Return the shareId to user.
router.post('/', authMiddleware, shareBrain);

router.get('/:shareId', getSharedBrainContent);



// GET endpoint to catch shareId, find the brainId from share modal, and return the content of that brain.
export default router;