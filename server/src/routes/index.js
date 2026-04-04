import { Router } from 'express';

const router = Router();

router.get('/health', (req, res) => {
	res.json({ status: 'ok', message: 'MERN API base ready' });
});

export default router;
