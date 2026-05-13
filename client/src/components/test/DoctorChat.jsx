import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNotifications } from "../../../context/NotificationContext";
import { formatNotificationTime } from "../../../utils/helper";
import { getStoredUserId, getStoredUserRole } from "../../../utils/authStorage";
import { getChatHistory } from "../../../services/chatingService";
import { getUserById } from "../../../services/userService";
import "./chatting.css";

const DoctorChat = () => {
  const {
    registerToSocket,
    chating,
    sendChats,
    clearChatting,
    sendEndSession,
  } = useNotifications();
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [avatars, setAvatars] = useState({ doctor: "", refugee: "" });
  const messagesRef = useRef(null);
  const navigate = useNavigate();
  const { refugeeId: refugeeIdParam } = useParams();
  const doctorId = getStoredUserId();
  const doctorRole = getStoredUserRole() || "doctor";
  const refugeeId = refugeeIdParam;

  useEffect(() => {
    if (!doctorId) {
      return;
    }

    registerToSocket(doctorId, doctorRole);
  }, [doctorId, doctorRole, registerToSocket]);

  useEffect(() => {
    if (!doctorId || !refugeeId) {
      return;
    }

    let isMounted = true;

    const loadHistory = async () => {
      try {
        const res = await getChatHistory(refugeeId);
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
  }, [doctorId, refugeeId]);

  useEffect(() => {
    if (!doctorId || !refugeeId) {
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

    if (!doctorId || !refugeeId) {
      return;
    }

    sendChats({
      senderId: doctorId,
      receivedId: refugeeId,
      message: message,
    });
    setMessage("");
  };

  const filteredMessages = chating.filter((msg) => {
    if (!doctorId || !refugeeId) {
      return false;
    }

    const isDoctorSender =
      msg.senderId === doctorId && msg.receivedId === refugeeId;
    const isRefugeeSender =
      msg.senderId === refugeeId && msg.receivedId === doctorId;
    return isDoctorSender || isRefugeeSender;
  });

  const mergedMessages = [...history, ...filteredMessages].sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime();
    const timeB = new Date(b.createdAt).getTime();
    return timeA - timeB;
  });

  useEffect(() => {
    if (!messagesRef.current) {
      return;
    }

    const container = messagesRef.current;
    requestAnimationFrame(() => {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    });
  }, [mergedMessages.length]);

  const handleEndSession = () => {
    if (doctorId && refugeeId) {
      sendEndSession({ senderId: doctorId, receivedId: refugeeId });
    }
    setMessage("");
    setHistory([]);
    clearChatting();
    navigate("/counselor-portal");
  };

  return (
    <div className="chatting-page">
      <div className="chatting-shell">
        <main className="chatting-main">


          <div className="security-banner">
            <div className="shield">OK</div>
            <div>
              <div className="security-title">Secure & Private</div>
              <div className="security-sub">
                Your conversations are end-to-end encrypted and confidential.
              </div>
            </div>
          </div>

          <section className="chatting-messages" ref={messagesRef}>
            {mergedMessages.map((msg, i) => {
              const side = msg.senderId === doctorId ? "user" : "counselor";
              const avatarUrl = side === "counselor" ? avatars.refugee : avatars.doctor;

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

          <div>
            <button
              className="end-session"
              type="button"
              onClick={handleEndSession}
            >
              End Session
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorChat;
