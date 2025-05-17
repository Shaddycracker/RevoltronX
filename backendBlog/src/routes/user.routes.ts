import { RegisterUserController } from '../api/user/controllers/register.user.controller';
import express from 'express';
import { LoginUserController } from '../api/user/controllers/login.user.controller';

const router = express.Router();

router.post('/login', LoginUserController);
router.post('/register', RegisterUserController);

export default router;
