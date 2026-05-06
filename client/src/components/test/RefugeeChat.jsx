import React, { useEffect, useState } from "react";
import { useNotifications } from "../../../context/NotificationContext";
import { formatNotificationTime } from "../../../utils/helper";
const RefugeeChat = () => {
  const { registerToSocket, chating, sendChats } = useNotifications();
  const [message, setMessage] = useState("");

  const refugeeId = "69e12b58350ccd29cbc674c9";
  const doctorId = "69e63b214bf8bccbeb1cf109";

  useEffect(() => {
    registerToSocket(refugeeId, "refugee");
  }, []);

  const handleSend = () => {
    if (!message.trim()) return;

    sendChats({
      senderId: refugeeId,
      receivedId: doctorId,
      message: message,
    });
    setMessage("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Refugee Chat</h2>

      {/* Messages */}
      <div
        style={{
          border: "1px solid #ccc",
          height: 300,
          overflowY: "auto",
          padding: 10,
        }}
      >
        {chating.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.senderId === refugeeId ? "right" : "left",
              margin: "5px 0",
            }}
          >
            <span
              style={{
                background: msg.senderId === refugeeId ? "#DCF8C6" : "#eee",
                padding: "8px 12px",
                borderRadius: 10,
                display: "inline-block",
              }}
            >
              {msg.message}
            </span>
            <span>{formatNotificationTime(msg.createdAt)}</span>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ marginTop: 10 }}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
          style={{ width: "80%", padding: 10 }}
        />
        <button onClick={handleSend} style={{ padding: 10 }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default RefugeeChat;
