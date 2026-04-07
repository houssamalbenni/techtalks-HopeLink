import { Router } from 'express';
import { loginRules, registerRefugeeRules } from '../middleware/auth.validation.js';
import { loginRefugeeController, registerRefugeeController } from './controller/auth.controller.js';

const router = Router();

// POST /api/auth/register/refugee
router.post('/register/refugee', registerRefugeeRules, registerRefugeeController);

// POST /api/auth/login/refugee
router.post('/login/refugee', loginRules, loginRefugeeController);

export default router;