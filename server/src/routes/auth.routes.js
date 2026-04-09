import { Router } from 'express';
import { loginRefugeeController, registerRefugeeController } from '../controller/auth.controller.js';
import { loginRules, registerRefugeeRules } from '../middleware/auth.validation.js';

const router = Router();

// ─── Register Route ───────────────────────────────────────────────────────────
router.post('/register', registerRefugeeRules, registerRefugeeController);

// ─── Login Route ──────────────────────────────────────────────────────────────
router.post('/login', loginRules, loginRefugeeController);

export default router;
