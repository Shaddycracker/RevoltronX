import { RegisterUserController } from '../api/user/controllers/register.user.controller';
import express from 'express';
import { LoginUserController } from '../api/user/controllers/login.user.controller';
import { authenticate } from '../middleware/auth';
import { getUserProfile } from '../api/user/controllers/user.controller';

const router = express.Router();

router.post('/login', LoginUserController);
router.post('/register', RegisterUserController);
router.get('/me', authenticate, getUserProfile);

export default router;
