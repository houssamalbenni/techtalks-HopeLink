const express = require("express");
const router = express.Router();
const NotificationController = require('../controller/notificationController');
const { validation_token } = require('../middleware/auth.validation');

router.use(validation_token); // Apply authentication middleware to all routes
router.get("/", NotificationController.getAllNotifications);
router.get("/user", NotificationController.getUserNotifications);
router.get("/:id", NotificationController.getNotificationById);
router.delete("/", NotificationController.deleteAllNotifications);
module.exports = router;