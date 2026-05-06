const SocketEvents = Object.freeze({
  CONNECTION: "connection",
  DISCONNECT: "disconnect",

  REGISTER_USER: "register_user",
  SEND_PRIVATE_MESSAGE: "send_private_message",
  ADMIN_ANNOUNCEMENT: "admin_announcement",

  USER_ONLINE: "user_online",
  NEW_MESSAGE: "new_message",
  GLOBAL_NOTIFICATION: "global_notification",
  ERROR: "socket_error",
  CHATING: "chating",
  RESPONSE: "response",
  END_SESSION: "end_session",
});

module.exports = SocketEvents;
