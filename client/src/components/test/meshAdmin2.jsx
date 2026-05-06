import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import toast, { Toaster } from "react-hot-toast";
import { useNotifications } from "../../../context/NotificationContext";
const socket = io("http://localhost:5000"); // change backend url if needed

const MeshAdmin2 = () => {
  // Change these to test users
  const [userId] = useState("69e63b214bf8bccbeb1cf109");
  const [role] = useState("admin");

  const { sendAnnouncement, sendPrivateMessage } = useNotifications();
  // try role = "user"

  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const { registerToSocket } = useNotifications();
  const [announcement, setAnnouncement] = useState({
    title: "",
    message: "",
    audience: "all",
    priority: "normal",
    type: "shelter_update",
  });

  const [privateMsg, setPrivateMsg] = useState({
    receivedId: "",
    title: "",
    message: "",
    type: "aid_request_update",
    priority: "normal",
    audience: "private",
  });

  useEffect(() => {
    // Register user in socket
    // socket.emit("register_user", {
    //   userId,
    //   role,
    // });

    registerToSocket(userId, role);
    socket.on("error", (err) => {
      toast.error(err.message || "Socket error");
    });

    return () => {
      socket.off("global_notification");
      socket.off("new_message");
      socket.off("error");
    };
  }, []);

  const sendAnnouncementee = () => {
    if (!announcement.title || !announcement.message) {
      toast.error("Fill title and message");
      return;
    }

    sendAnnouncement({ adminId: userId, ...announcement });

    toast.success("Announcement sent");
  };

  const sendPrivateMessages = () => {
    if (!privateMsg.receivedId || !privateMsg.title || !privateMsg.message) {
      toast.error("Complete all fields");
      return;
    }

    sendPrivateMessage({ senderId: userId, ...privateMsg });
    toast.success("Message sent");

    setPrivateMsg({
      receivedId: "",
      title: "",
      message: "",
      type: "system",
      priority: "normal",
    });
  };

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <h1>Socket Notification Test</h1>

      <h3>
        Logged in as: {userId} ({role})
      </h3>

      {/* ADMIN ANNOUNCEMENTS */}
      {role === "admin" && (
        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
            marginBottom: "30px",
          }}
        >
          <h2>Send Admin Announcement</h2>

          <input
            placeholder="Title"
            value={announcement.title}
            onChange={(e) =>
              setAnnouncement({
                ...announcement,
                title: e.target.value,
              })
            }
          />

          <br />
          <br />

          <textarea
            rows="4"
            cols="50"
            placeholder="Message"
            value={announcement.message}
            onChange={(e) =>
              setAnnouncement({
                ...announcement,
                message: e.target.value,
              })
            }
          />

          <br />
          <br />

          <label>Audience: </label>

          <select
            value={announcement.audience}
            onChange={(e) =>
              setAnnouncement({
                ...announcement,
                audience: e.target.value,
              })
            }
          >
            <option value="all">all</option>

            <option value="refugee">refugee</option>

            <option value="volunteer">volunteer</option>
          </select>

          <br />
          <br />

          <button onClick={sendAnnouncementee}>Send Announcement</button>
        </div>
      )}

      {/* PRIVATE MESSAGE */}
      <div
        style={{
          border: "1px solid gray",
          padding: "20px",
          marginBottom: "30px",
        }}
      >
        <h2>Send Private Message</h2>

        <input
          placeholder="Receiver Id"
          value={privateMsg.receivedId}
          onChange={(e) =>
            setPrivateMsg({
              ...privateMsg,
              receivedId: e.target.value,
            })
          }
        />

        <br />
        <br />

        <input
          placeholder="Message Title"
          value={privateMsg.title}
          onChange={(e) =>
            setPrivateMsg({
              ...privateMsg,
              title: e.target.value,
            })
          }
        />

        <br />
        <br />

        <textarea
          rows="4"
          cols="50"
          placeholder="Message"
          value={privateMsg.message}
          onChange={(e) =>
            setPrivateMsg({
              ...privateMsg,
              message: e.target.value,
            })
          }
        />

        <br />
        <br />

        <button onClick={sendPrivateMessages}>Send Private Message</button>
      </div>

      {/* ANNOUNCEMENTS RECEIVED */}
      <div
        style={{
          marginBottom: "40px",
        }}
      >
        <h2>Notifications Received</h2>

        {notifications.length === 0 && <p>No notifications yet</p>}

        {notifications.map((n, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "12px",
              marginBottom: "10px",
            }}
          >
            <h4>{n.title}</h4>

            <p>{n.message}</p>

            <small>Priority: {n.priority}</small>
          </div>
        ))}
      </div>

      {/* PRIVATE MESSAGES */}
      <div>
        <h2>Private Messages</h2>

        {messages.length === 0 && <p>No messages yet</p>}

        {messages.map((m, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "12px",
              marginBottom: "10px",
            }}
          >
            <h4>{m.title}</h4>

            <p>{m.message}</p>

            <small>Priority: {m.priority}</small>

            {m.senderId && (
              <div>
                <small>From: {m.senderId}</small>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeshAdmin2;
