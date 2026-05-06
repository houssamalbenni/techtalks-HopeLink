const NotificationService = require('../service/notificationService');
const asyncHandler = require('../middleware/asyncHandler');

exports.getUserNotifications = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const role = req.user.role;
  const notifications = await NotificationService.getUserNotifications(userId, role);
  res.json({ success: true, data: notifications });
});

exports.getAllNotifications = asyncHandler(async (req, res) => {
  const notifications = await NotificationService.getAllNotifications();
  res.json({ success: true, data: notifications });
});

exports.getNotificationById = asyncHandler(async (req, res) => {
  const notification = await NotificationService.getNotificationById(req.params.id);
    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }
    res.json({ success: true, data: notification });
});

exports.deleteAllNotifications = asyncHandler(async (req, res) => {
  await NotificationService.deleteAllNotifications();
  res.json({ success: true, message: "All notifications deleted" });
});