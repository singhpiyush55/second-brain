import { Router } from "express";
import { login, signup,  logout, getMe} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', authMiddleware, logout)
router.get('/me', authMiddleware, getMe);

export default router;