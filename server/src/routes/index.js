const express = require("express");
const router = express.Router();
const authRoutes =require('./auth.routes.js');

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});
router.use('/auth', authRoutes);

module.exports = router;
