import { createContext, useContext, useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import toast from "react-hot-toast";
import { getUserNotifications } from "./../services/notificationsService";
const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chating, setChating] = useState([]);
  const [endSessionSignal, setEndSessionSignal] = useState(null);
  const SOCKET_URL = "http://localhost:5000";
  const socketRef = useRef(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL);
    }
    if (!localStorage.getItem("token")) {
      setLoading(false);
      return;
    }
    getUserNotifications()
      .then((res) => {
        setNotifications(res.data);
      })
      .then(() => setLoading(false))
      .catch((err) => {
        toast.error(err.message || "Error fetching notifications", {
          style: { background: "#e44f4f86", color: "#fff" },
        });
        setLoading(false);
      });

    const socket = socketRef.current;

    const handleGlobalNotification = (data) => {
      toast.success(`new ${data.type.toUpperCase()} message`, {
        duration: 5000,
      });
      setNotifications((prev) => [{ ...data, _isNew: true }, ...prev]);
    };

    const handleNewMessage = (data) => {
      toast(`new ${data.type.toUpperCase()} message`, {
        icon: "📩",
        duration: 5000,
      });
      setNotifications((prev) => [{ ...data, _isNew: true }, ...prev]);
    };

    const handleSocketError = (err) => {
      toast.error(err.message || "Socket error");
    };
    const handleChating = (data) => {
      const createdAt = data.createdAt || new Date().toISOString();
      setChating((prev) => [...prev, { ...data, createdAt }]);
    };

    const handleEndSession = (data) => {
      setEndSessionSignal(data);
    };

    socket.on("global_notification", handleGlobalNotification);
    socket.on("new_message", handleNewMessage);
    socket.on("error", handleSocketError);
    socket.on("response", handleChating);
    socket.on("end_session", handleEndSession);

    return () => {
      socket.off("global_notification", handleGlobalNotification);
      socket.off("new_message", handleNewMessage);
      socket.off("error", handleSocketError);
      socket.off("response", handleChating);
      socket.off("end_session", handleEndSession);
    };
  }, []);

  const registerToSocket = (userId, role) => {
    if (socketRef.current) {
      socketRef.current.emit("register_user", { userId, role });
      console.log(`Registered user ${userId} with role ${role}`);
    }
  };

  const sendAnnouncement = (announcementData) => {
    socketRef.current.emit("admin_announcement", announcementData);
  };

  const sendPrivateMessage = (msgData) => {
    socketRef.current.emit("send_private_message", msgData);
  };

  const sendChats = (data) => {
    const createdAt = new Date().toISOString();
    socketRef.current.emit("chating", data);

    setChating((prev) => [...prev, { ...data, createdAt }]);
  };

  const sendEndSession = (data) => {
    socketRef.current.emit("end_session", data);
  };

  const clearChatting = () => {
    setChating([]);
  };

  const clearEndSessionSignal = () => {
    setEndSessionSignal(null);
  };

  const value = {
    notifications,
    loading,
    registerToSocket,
    sendAnnouncement,
    sendPrivateMessage,
    socket: socketRef.current,
    chating,
    sendChats,
    clearChatting,
    endSessionSignal,
    sendEndSession,
    clearEndSessionSignal,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  }
  return context;
};
