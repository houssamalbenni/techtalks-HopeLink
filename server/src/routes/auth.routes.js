const express = require("express");
const router = express.Router();
const { loginRefugeeController, registerRefugeeController }= require('../controller/auth.controller.js');
const { loginRules, registerRefugeeRules } =require('../middleware/auth.validation.js');
const userController = require('../controller/auth.controller.js');
// ─── Register Route ───────────────────────────────────────────────────────────
router.post('/register', registerRefugeeRules, userController.registerRefugeeController);

// ─── Login Route ──────────────────────────────────────────────────────────────
// router.post('/login', loginRules, loginRefugeeController);

module.exports = router;
