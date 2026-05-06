import React, { useEffect, useState } from "react";
import { useNotifications } from "../../../context/NotificationContext";
import { formatNotificationTime } from "../../../utils/helper";
import "../chatting/Chatting.css";

const navItems = [
  {
    id: "chat",
    label: "Chat",
    active: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 5h16v10H7l-3 3V5z" />
      </svg>
    ),
  },
  {
    id: "resources",
    label: "Resources",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 4h12v16H6z" />
        <path d="M10 8h4" />
      </svg>
    ),
  },
  {
    id: "tools",
    label: "Wellness Tools",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
  },
  {
    id: "journal",
    label: "Journaling",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 4h10a2 2 0 012 2v12H6z" />
        <path d="M8 8h6" />
        <path d="M8 12h6" />
      </svg>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M4 12h2m12 0h2M12 4v2m0 12v2" />
      </svg>
    ),
  },
  {
    id: "privacy",
    label: "Privacy",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5" y="10" width="14" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 018 0v3" />
      </svg>
    ),
  },
];

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
    <div className="chatting-page">
      <div className="chatting-shell">
        <aside className="chatting-sidebar">
          <div className="chatting-brand">
            <div className="brand-mark">
              <span className="brand-petal" />
              <span className="brand-petal" />
              <span className="brand-petal" />
            </div>
            <div>
              <div className="brand-title">MindfulCare</div>
              <div className="brand-sub">You matter. We're here.</div>
            </div>
          </div>

          <nav className="chatting-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item${item.active ? " active" : ""}`}
                type="button"
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="privacy-card">
            <div className="privacy-badge">i</div>
            <div>
              <div className="privacy-title">Your privacy matters</div>
              <div className="privacy-text">
                All messages are encrypted and confidential. Your mental health
                is safe with us.
              </div>
              <button className="privacy-link" type="button">
                Learn more -&gt;
              </button>
            </div>
          </div>

          <div className="sidebar-art">
            <div className="art-chair" />
            <div className="art-plant">
              <span />
              <span />
              <span />
            </div>
          </div>
        </aside>

        <main className="chatting-main">
          <header className="chatting-topbar">
            <div className="guest-toggle">
              <div>
                <div className="guest-title">Refugee Chat</div>
                <div className="guest-sub">Secure session active</div>
              </div>
              <div className="toggle-pill" role="switch" aria-checked="true">
                <span />
              </div>
            </div>
            <div className="counselor-card">
              <div className="counselor-avatar" />
              <div>
                <div className="counselor-name">Assigned Doctor</div>
                <div className="counselor-meta">Live chat</div>
              </div>
              <button className="dots" type="button" aria-label="More options">
                ...
              </button>
            </div>
          </header>

          <div className="security-banner">
            <div className="shield">OK</div>
            <div>
              <div className="security-title">Secure & Private</div>
              <div className="security-sub">
                Your conversations are end-to-end encrypted and confidential.
              </div>
            </div>
          </div>

          <section className="chatting-messages">
            {chating.map((msg, i) => {
              const side = msg.senderId === refugeeId ? "user" : "counselor";

              return (
                <div key={i} className={`message-row ${side}`}>
                  {side === "counselor" && <div className="message-avatar" />}
                  <div className="message-bubble">
                    <p>{msg.message}</p>
                    <span className="message-time">
                      {formatNotificationTime(msg.createdAt)}
                    </span>
                  </div>
                </div>
              );
            })}
          </section>

          <div className="chatting-input">
            <div className="input-field">
              <span className="input-icon">:-)</span>
              <input
                type="text"
                placeholder="Type your message..."
                aria-label="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button
              className="send-btn"
              type="button"
              onClick={handleSend}
              aria-label="Send message"
            >
              Send
            </button>
          </div>

          <div>
            <button className="end-session" type="button">
              End Session
            </button>
            <div className="session-note">
              Your session will end and messages will be cleared.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RefugeeChat;
