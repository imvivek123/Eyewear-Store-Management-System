import express from 'express';
import { login, register } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', authMiddleware, roleMiddleware('hq'), register);

export default router;
