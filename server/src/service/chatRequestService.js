const { ChatRequest } = require("../models/chatRequest");

class ChatRequestService {
  static async createRequest({ refugeeId, note, priority }) {
    const existing = await ChatRequest.findOne({
      refugeeId,
      status: "pending",
    });

    if (existing) {
      return existing;
    }

    return ChatRequest.create({
      refugeeId,
      note,
      priority,
    });
  }

  static async listPending() {
    return ChatRequest.find({ status: "pending" }).sort({ createdAt: -1 });
  }

  static async getActiveForRefugee(refugeeId) {
    return ChatRequest.findOne({
      refugeeId,
      status: { $in: ["pending", "accepted"] },
    }).sort({ createdAt: -1 });
  }

  static async getById(requestId) {
    return ChatRequest.findById(requestId);
  }

  static async acceptRequest({ requestId, doctorId }) {
    return ChatRequest.findOneAndUpdate(
      { _id: requestId, status: "pending" },
      { status: "accepted", doctorId, acceptedAt: new Date() },
      { new: true },
    );
  }
}

module.exports = ChatRequestService;
