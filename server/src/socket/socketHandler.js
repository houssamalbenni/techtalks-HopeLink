const SocketEvents = require("./socketEvents");
const NotificationService = require("../service/notificationService");
const User = require("../models/User").User;
const ChatingServices = require("../service/chatingService");
let users = {};

module.exports = (io) => {
  io.on(SocketEvents.CONNECTION, (socket) => {
    socket.on(SocketEvents.REGISTER_USER, async ({ userId, role }) => {
      users[userId] = socket.id;

      if (role) {
        socket.join(role);
      }
      console.log(`User ${userId} (${role}) linked to ${socket.id}`);
    });

    socket.on(SocketEvents.ADMIN_ANNOUNCEMENT, async (data) => {
      try {
        const admin = await User.findById(data.adminId);

        if (admin && admin.role === "admin") {
          const notification = await NotificationService.createNotification({
            type: data.type || "system",
            priority: data.priority || "normal",
            audience: data.audience || "all",
            title: data.title,
            message: data.message,
            image_url: data.image_url,
          });

          if (data.audience === "all") {
            socket.broadcast.emit(
              SocketEvents.GLOBAL_NOTIFICATION,
              notification,
            );
          } else {
            socket
              .to(data.audience)
              .emit(SocketEvents.GLOBAL_NOTIFICATION, notification);
          }
        } else {
          socket.emit(SocketEvents.ERROR, { message: "Unauthorized" });
        }
      } catch (err) {
        socket.emit(SocketEvents.ERROR, { message: err.message });
      }
    });

    socket.on(SocketEvents.SEND_PRIVATE_MESSAGE, async (data) => {
      try {
        const { receivedId, senderId, message, title, type, priority } = data;

        const notificationData = {
          receivedId: receivedId,
          type: type,
          priority: priority || "normal",
          title: title,
          audience: "private",
          message: message,
          isRead: false,
        };

        const savedMessage =
          await NotificationService.createNotification(notificationData);
        const receiverSocketId = users[receivedId];
        if (receiverSocketId && receiverSocketId !== socket.id) {
          io.to(receiverSocketId).emit(SocketEvents.NEW_MESSAGE, savedMessage);
        } else {
          console.log(`User ${receivedId} is offline. Message saved to DB.`);
          console.log(`Online users are :`, users);
        }
      } catch (err) {
        socket.emit(SocketEvents.ERROR, {
          message: "Failed to send message: " + err.message,
        });
      }
    });

    socket.on(SocketEvents.CHATING, async (data) => {
      try {
        console.log("chating", data);
        const { receivedId, senderId, message } = data;
        const receiverSocketId = users[receivedId];

        const { chating: chat, messageEntry } =
          await ChatingServices.createOrAppendMessage({
            senderId,
            receivedId,
            message,
          });

        const payload = {
          senderId,
          receivedId,
          message,
          chatId: chat._id,
          createdAt: messageEntry.createdAt,
        };

        if (receiverSocketId && receiverSocketId !== socket.id) {
          io.to(receiverSocketId).emit(SocketEvents.RESPONSE, payload);
        } else {
          console.log(`User ${receivedId} is offline. Message saved to DB.`);
          console.log(`Online users are :`, users);
        }
      } catch (err) {
        socket.emit(SocketEvents.ERROR, {
          message: "Failed to send chating: " + err.message,
        });
      }
    });

    socket.on(SocketEvents.DISCONNECT, () => {
      for (let userId in users) {
        if (users[userId] === socket.id) {
          delete users[userId];
          break;
        }
      }
    });
  });
};
