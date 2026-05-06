const mongoose = require("mongoose");

const ChatRequestSchema = new mongoose.Schema(
  {
    refugeeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "cancelled"],
      default: "pending",
      index: true,
    },
    note: {
      type: String,
      default: "Looking for support",
      trim: true,
    },
    priority: {
      type: String,
      enum: ["general", "critical"],
      default: "general",
    },
    acceptedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

ChatRequestSchema.index({ refugeeId: 1, status: 1 });

const ChatRequest =
  mongoose.models.ChatRequest ||
  mongoose.model("ChatRequest", ChatRequestSchema);

module.exports = { ChatRequest, ChatRequestSchema };
