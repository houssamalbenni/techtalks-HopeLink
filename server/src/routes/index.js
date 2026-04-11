const express = require("express");
const router = express.Router();
const authRoutes =require('./auth.routes.js');

router.get('/health', (req, res) => {
	res.json({ status: 'ok', message: 'MERN API base ready' });
});
router.use('/auth', authRoutes);

module.exports = router;
