import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNotifications } from "../../../context/NotificationContext";

const PRIORITIES = ["critical", "important", "normal"];
const TYPES = [
  "emergency_alert",
  "aid_request_update",
  "shelter_update",
  "medicine_update",
  "ngo_announcement",
  "system",
];
const AUDIENCES = ["all", "refugee", "doctor", "ngo", "private","donor"];

export const Announcement = ({ selectedUserId, setSelectedUserId }) => {
  const { registerToSocket, sendAnnouncement, sendPrivateMessage } =
    useNotifications();
  const [userId] = useState(() => localStorage.getItem("userId") || "");
  const [role] = useState(() => localStorage.getItem("role") || "");
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "",
    priority: "",
    audience: "",
    targetUserId: "",
  });

  useEffect(() => {
    if (selectedUserId) {
      setFormData((prev) => ({
        ...prev,
        targetUserId: selectedUserId,
        audience: "private",
      }));
    }
  }, [selectedUserId]);

  useEffect(() => {
    if (!userId || !role) {
      return;
    }
    registerToSocket(userId, role);
  }, [registerToSocket, role, userId]);

  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "audience" && value !== "private") {
      setSelectedUserId("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId) {
      toast.error("Missing user session. Please sign in again.");
      return;
    }
    if (!formData.title || !formData.message) {
      toast.error("Fill title and message");
      return;
    }
    if (formData.audience === "private" && !formData.targetUserId) {
      toast.error("Select a recipient user");
      return;
    }
    setIsSending(true);

    try {
      if (formData.audience === "private") {
        sendPrivateMessage({
          senderId: userId,
          receivedId: formData.targetUserId,
          title: formData.title,
          message: formData.message,
          type: formData.type,
          priority: formData.priority,
          audience: "private",
        });
        toast.success("Private message sent");
      } else {
        sendAnnouncement({
          adminId: userId,
          title: formData.title,
          message: formData.message,
          type: formData.type,
          priority: formData.priority,
          audience: formData.audience,
        });
        toast.success("Announcement sent");
      }

      setStatus("success");
      setFormData({
        title: "",
        message: "",
        type: "",
        priority: "",
        audience: "",
        targetUserId: "",
      });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      toast.error(error?.message || "Failed to send message");
    } finally {
      setIsSending(false);
      setSelectedUserId("");
    }
  };

  const isFormValid =
    userId &&
    formData.title &&
    formData.message &&
    formData.type &&
    formData.priority &&
    formData.audience &&
    (formData.audience !== "private" || formData.targetUserId);

  return (
    <div className="card">
      <div className="header">
        <h1>
          <img
            src="https://api.iconify.design/lucide:bell.svg?color=%232563eb"
            alt="Announcement icon"
            style={{
              width: 24,
              height: 24,
              marginRight: 8,
              verticalAlign: "bottom",
            }}
            referrerPolicy="no-referrer"
          />
          Send Announcement
        </h1>
        <p>
          Broadcast high-priority alerts or send private updates to specific
          individuals.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="field-group">
            <label htmlFor="type" className="field-label">
              Notification Type
            </label>
            <select
              className="input-base"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select type
              </option>
              {TYPES.map((type) => (
                <option key={type} value={type}>
                  {type
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          <div className="field-group">
            <label htmlFor="priority" className="field-label">
              Priority Level
            </label>
            <select
              className="input-base"
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select priority
              </option>
              {PRIORITIES.map((priority) => (
                <option key={priority} value={priority}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="field-group">
          <label htmlFor="audience" className="field-label">
            Target Audience
          </label>
          <select
            className="input-base"
            id="audience"
            name="audience"
            value={formData.audience}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select audience
            </option>
            {AUDIENCES.map((audience) => (
              <option key={audience} value={audience}>
                {audience.charAt(0).toUpperCase() + audience.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {formData.audience === "private" && (
          <div className="private-id-field">
            <div className="field-group">
              <label htmlFor="targetUserId" className="field-label">
                Recipient User ID
              </label>
              <input
                className="input-base"
                id="targetUserId"
                name="targetUserId"
                placeholder="Paste or select a User ID (e.g., USR-1234)"
                value={formData.targetUserId}
                onChange={handleChange}
                required
              />
            </div>
            <p
              style={{
                fontSize: "12px",
                color: "var(--primary-color)",
                margin: "4px 0 0 0",
              }}
            >
              Tip: Click a user in the sidebar to fill this field automatically.
            </p>
          </div>
        )}

        <div className="field-group">
          <label htmlFor="title" className="field-label">
            Announcement Title
          </label>
          <input
            className="input-base"
            id="title"
            name="title"
            placeholder="e.g., Emergency Update"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field-group">
          <label htmlFor="message" className="field-label">
            Message Content
          </label>
          <textarea
            className="input-base textarea-field"
            id="message"
            name="message"
            placeholder="Details of the announcement..."
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn-primary"
          id="send-btn"
          disabled={!isFormValid || isSending}
        >
          {isSending ? (
            "Sending Notification..."
          ) : (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <img
                src="https://api.iconify.design/lucide:send.svg?color=%23dbe4f0"
                alt="Send icon"
                style={{ width: 18, height: 18 }}
                referrerPolicy="no-referrer"
              />
              Send{" "}
              {formData.audience === "private"
                ? "Private Message"
                : "Announcement"}
            </span>
          )}
        </button>

        {status === "success" && (
          <div className="feedback-msg feedback-success">
            Message successfully dispatched.
          </div>
        )}
      </form>
    </div>
  );
};
