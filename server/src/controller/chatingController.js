const asyncHandler = require("../middleware/asyncHandler");
const ChatingServices = require("../service/chatingService");

exports.getChatHistory = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const otherUserId = req.params.otherUserId;

  const chat = await ChatingServices.getChatHistory(userId, otherUserId);

  if (!chat) {
    return res.json({ success: true, data: { messages: [] } });
  }

  const messages = chat.messages.map((message) => {
    const senderId = message.senderId.toString();
    const receivedId = senderId === userId ? otherUserId : userId;

    return {
      senderId,
      receivedId,
      message: message.text,
      createdAt: message.createdAt,
    };
  });

  res.json({
    success: true,
    data: {
      chatId: chat._id,
      senderId: chat.senderId,
      receivedId: chat.receivedId,
      messages,
    },
  });
});
