const express = require("express");
const router = express.Router();
const ChatingController = require("../controller/chatingController");
const { validation_token } = require("../middleware/auth.validation");

router.use(validation_token);
router.get("/history/:otherUserId", ChatingController.getChatHistory);

module.exports = router;
