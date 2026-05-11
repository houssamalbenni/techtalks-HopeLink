import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNotifications } from "../../../context/NotificationContext";
import { formatNotificationTime } from "../../../utils/helper";
import { getStoredUserId, getStoredUserRole } from "../../../utils/authStorage";
import { getChatHistory } from "../../../services/chatingService";
import { getUserById } from "../../../services/userService";
import "../chatting/Chatting.css";

const RefugeeChat = () => {
  const {
    registerToSocket,
    chating,
    sendChats,
    clearChatting,
    endSessionSignal,
    clearEndSessionSignal,
  } = useNotifications();
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [avatars, setAvatars] = useState({ doctor: "", refugee: "" });
  const navigate = useNavigate();
  const { doctorId: doctorIdParam } = useParams();
  const refugeeId = getStoredUserId();
  const refugeeRole = getStoredUserRole() || "refugee";
  const doctorId = doctorIdParam;

  useEffect(() => {
    if (!refugeeId) {
      return;
    }

    registerToSocket(refugeeId, refugeeRole);
  }, [refugeeId, refugeeRole, registerToSocket]);

  useEffect(() => {
    if (!refugeeId || !doctorId) {
      return;
    }

    let isMounted = true;

    const loadHistory = async () => {
      try {
        const res = await getChatHistory(doctorId);
        const messages = res?.data?.messages || [];
        if (isMounted) {
          setHistory(messages);
        }
      } catch {
        if (isMounted) {
          setHistory([]);
        }
      }
    };

    loadHistory();

    return () => {
      isMounted = false;
    };
  }, [refugeeId, doctorId]);

  useEffect(() => {
    if (!refugeeId || !doctorId) {
      return;
    }

    let isMounted = true;

    const loadAvatars = async () => {
      try {
        const [doctorRes, refugeeRes] = await Promise.all([
          getUserById(doctorId),
          getUserById(refugeeId),
        ]);
        const doctor = doctorRes?.data?.user || doctorRes?.user || doctorRes;
        const refugee = refugeeRes?.data?.user || refugeeRes?.user || refugeeRes;

        if (isMounted) {
          setAvatars({
            doctor: doctor?.profile_url || "",
            refugee: refugee?.profile_url || "",
          });
        }
      } catch {
        if (isMounted) {
          setAvatars({ doctor: "", refugee: "" });
        }
      }
    };

    loadAvatars();

    return () => {
      isMounted = false;
    };
  }, [doctorId, refugeeId]);

  const handleSend = () => {
    if (!message.trim()) return;

    if (!refugeeId || !doctorId) {
      return;
    }

    sendChats({
      senderId: refugeeId,
      receivedId: doctorId,
      message: message,
    });
    setMessage("");
  };

  const filteredMessages = chating.filter((msg) => {
    if (!refugeeId || !doctorId) {
      return false;
    }

    const isRefugeeSender =
      msg.senderId === refugeeId && msg.receivedId === doctorId;
    const isDoctorSender =
      msg.senderId === doctorId && msg.receivedId === refugeeId;
    return isRefugeeSender || isDoctorSender;
  });

  const mergedMessages = [...history, ...filteredMessages].sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime();
    const timeB = new Date(b.createdAt).getTime();
    return timeA - timeB;
  });

  useEffect(() => {
    if (!endSessionSignal || !doctorId || !refugeeId) {
      return;
    }

    const isMatch =
      endSessionSignal.senderId === doctorId &&
      endSessionSignal.receivedId === refugeeId;

    if (!isMatch) {
      return;
    }

    setMessage("");
    setHistory([]);
    clearChatting();
    clearEndSessionSignal();
    window.location.assign("/support-home");
  }, [
    endSessionSignal,
    doctorId,
    refugeeId,
    clearChatting,
    clearEndSessionSignal,
  ]);

  return (
    <div className="chatting-page">
      <div className="chatting-shell">
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
            {mergedMessages.map((msg, i) => {
              const side = msg.senderId === refugeeId ? "user" : "counselor";
              const avatarUrl = side === "counselor" ? avatars.doctor : avatars.refugee;

              return (
                <div key={i} className={`message-row ${side}`}>
                  {side === "counselor" && (
                    <div className="message-avatar">
                      {avatarUrl ? <img src={avatarUrl} alt="User avatar" /> : null}
                    </div>
                  )}
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

          <div className="session-note">
            Your session will end and messages will be cleared.
          </div>
        </main>
      </div>
    </div>
  );
};

export default RefugeeChat;
