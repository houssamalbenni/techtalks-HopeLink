import { Router } from 'express';
import authRoutes from './auth.routes.js';
const router = Router();

router.get('/health', (req, res) => {
	res.json({ status: 'ok', message: 'MERN API base ready' });
});
router.use('/auth', authRoutes);

export default router;
