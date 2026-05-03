const express = require("express");
const router = express.Router();

const { loginRules} =require('../middleware/auth.validation.js');
const userController = require('../controller/auth.controller.js');

router.post('/register', userController.registerRefugeeController);
router.post('/login', loginRules, userController.login);

module.exports = router;