import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { generateShareLink } from "../controllers/brain.controller.js";
const router = Router();

// /brain route will handle the sharing part. 
// /brain/share will generate a shareable link for the content.
// /brain/share/:id will respond with the shared content. 

// Body will have the content id and auth will provide the user id.
router.post('/share', authMiddleware, generateShareLink);

export default router;