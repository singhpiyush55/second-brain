import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { addBrain, getBrains } from "../controllers/brain.controller.js";

const router = Router();

// POST endpoint to create a new brain  
router.post('/', authMiddleware, addBrain);

// GET endpoint to retrieve all brains for a user
router.get('/', authMiddleware, getBrains);

export default router;