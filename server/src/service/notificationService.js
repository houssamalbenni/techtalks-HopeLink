const Notification = require("../models/notifications").Notification;
class NotificationService {
  static async createNotification(data) {
    try {
      const notification = await Notification.create(data);
      console.log("Notification created:", notification);
      return notification;
    } catch (error) {
      console.error("Error creating notification:", error);
      throw new Error("Error creating notification");
    }
  }
  static async deleteNotification(notificationId) {
    try {
      await Notification.findByIdAndDelete(notificationId);
      return true;
    } catch (error) {
      throw new Error("Error deleting notification");
    }
  }

  static async getNotificationById(notificationId) {
    try {
      const notification = await Notification.findById(notificationId);
      return notification;
    } catch (error) {
      throw new Error("Error fetching notification by ID");
    }
  }

  static async getRecentNotifications(limit = 10) {
    try {
      const notifications = await Notification.find()
        .sort({ createdAt: -1 })
        .limit(limit);
      return notifications;
    } catch (error) {
      throw new Error("Error fetching recent notifications");
    }
  }
  static async getNotificationsForUserWithPagination(
    role,
    page = 1,
    limit = 10,
  ) {
    try {
      const skip = (page - 1) * limit;
      const notifications = await Notification.find({
        audience: { $in: ["all", role] },
      })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      return notifications;
    } catch (error) {
      throw new Error("Error fetching notifications with pagination");
    }
  }

  static async deleteAllNotifications() {
    try {
      await Notification.deleteMany({});
      return true;
    } catch (error) {
      throw new Error("Error deleting all notifications");
    }
  }
  static async getUserNotifications(userId, role) {
    const notifications = await Notification.find({
      $or: [
        { receivedId: userId },

        {
          receivedId: null,
          audience: { $in: ["all", role] },
        },
      ],
    }).sort({ createdAt: -1 });
    if (!notifications) {
      throw new Error("No notifications found for user");
    }
    return notifications;
  }
  static async getAllNotifications() {
    try {
      const notifications = await Notification.find().sort({ createdAt: -1 });
      return notifications;
    } catch (error) {
      throw new Error("Error fetching all notifications");
    }
  }
}
module.exports = NotificationService;
