const ChatingService = require("../models/chating").Chating;

class ChatingServices {
  static async createOrAppendMessage({ senderId, receivedId, message }) {
    try {
      const filter = {
        $or: [
          { senderId, receivedId },
          { senderId: receivedId, receivedId: senderId },
        ],
      };

      const messageEntry = {
        senderId,
        text: message,
        createdAt: new Date(),
      };

      const update = {
        $setOnInsert: { senderId, receivedId },
        $push: { messages: messageEntry },
      };

      const chating = await ChatingService.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true,
      });

      return { chating, messageEntry };
    } catch (error) {
      throw new Error("Failed to save chating: " + error.message);
    }
  }
  static async getChatHistory(userId1, userId2) {
    try {
      const chat = await ChatingService.findOne({
        $or: [
          { senderId: userId1, receivedId: userId2 },
          { senderId: userId2, receivedId: userId1 },
        ],
      });
      return chat;
    } catch (error) {
      throw new Error("Failed to retrieve chat history: " + error.message);
    }
  }
}

module.exports = ChatingServices;
