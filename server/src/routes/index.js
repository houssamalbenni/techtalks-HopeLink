import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'API root is working' });
});

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default router;
