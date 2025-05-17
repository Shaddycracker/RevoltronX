import { RegisterUserController } from '../api/user/controllers/register.user.controller';
import express from 'express';
import { LoginUserController } from '../api/user/controllers/login.user.controller';

const router = express.Router();

router.post('/api/v1/user/login/', LoginUserController);
router.post('/api/v1/user/register/', RegisterUserController);

export default router;
