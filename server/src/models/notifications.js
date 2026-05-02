const mongoose = require("mongoose");
const { NotificationPriority, NotificationTypes,RoleTypes } = require("../constant/enum");
const NotificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: NotificationTypes,
      required: true,
      index: true,
    },
    priority: {
      type: String,
      enum: NotificationPriority,
      default: "normal",
      index: true,
    },
    audience: {
      // target users
      type: String,
      enum: ["all", ...RoleTypes],
      default: "all",
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    image_url: {
      type: String,
    },
  },
  { timestamps: true },
);

NotificationSchema.index({ audience: 1, createdAt: -1 });

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);

module.exports = {
  Notification,
  NotificationSchema,
};
