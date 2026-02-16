import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { generateShareLink, shareContent } from "../controllers/brain.controller.js";
const router = Router();

router.post('/share', authMiddleware, generateShareLink);
router.get('/share/:shareId', shareContent);

export default router;