const express = require("express");
const router = express.Router();

const { loginRules} =require('../middleware/auth.validation.js');
const userController = require('../controller/auth.controller.js');
// ─── Register Route ───────────────────────────────────────────────────────────
router.post('/register', userController.registerRefugeeController);

// ─── Login Route ──────────────────────────────────────────────────────────────
 router.post('/login', loginRules, userController.login);

module.exports = router;