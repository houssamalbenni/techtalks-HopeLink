import { useEffect, useRef, useState } from "react";
import { formatNotificationTime } from "../../../utils/helper";
import { updateMissingPerson } from "../../../services/MissingPerson";
import { toast } from "react-hot-toast";
import { useFamilyReunification } from "../../../context/FamilyReunificationContext";
const CaseDetail = () => {
  const casePhotoUrl = "";
  const chatEndRef = useRef(null);
  const { selectedCase, handleCaseUpdated } = useFamilyReunification();
  const [isNewCaseOpen, setIsNewCaseOpen] = useState(false);
  const [isNewCaseClosing, setIsNewCaseClosing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isSendingNote, setIsSendingNote] = useState(false);
  const [message, setMessage] = useState("");
  const [notes, setNotes] = useState([]);

  const update = async (id, data) => {
    try {
      if (data && message.length == 0) {
        toast.error("Message cannot be empty");
        return;
      }
      let updateData = {};
      const isStatusUpdate = !data;
      const isNoteUpdate = Boolean(data);
      setLoading(true);
      if (isStatusUpdate) {
        setIsUpdatingStatus(true);
      }
      if (isNoteUpdate) {
        setIsSendingNote(true);
      }
      if (data) {
        updateData = {
          note: data.note,
          image: data.image,
        };
      } else {
        updateData = {
          status: "matched",
        };
      }
      const res = await updateMissingPerson(id, updateData);
      if (res.success) {
        setNotes(res.data.notes);
        setMessage("");
        if (handleCaseUpdated) {
          handleCaseUpdated(res.data);
        }
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
      setIsUpdatingStatus(false);
      setIsSendingNote(false);
    }
  };

  useEffect(() => {
    if (selectedCase?.notes) {
      setNotes(selectedCase.notes);
    }
  }, [selectedCase]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [notes, selectedCase?._id]);

  if (selectedCase) {
    const owner = selectedCase.owner._id.toString();
    const isMatched = selectedCase.status === "matched";
    const markDoneLabel = isMatched
      ? "Matched"
      : isUpdatingStatus
        ? "Updating..."
        : "Mark as done";
    return (
      <div className="fr-right-panel">
        {/* Case Header */}
        <div className="fr-case-header">
          <div className="fr-case-header-left">
            <div className="fr-case-icon">
              <svg viewBox="0 0 24 24" className="fr-case-icon-svg">
                <defs>
                  <linearGradient
                    id="caseGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1e40af" />
                  </linearGradient>
                </defs>
                <circle
                  cx="12"
                  cy="12"
                  r="11"
                  fill="url(#caseGradient)"
                  opacity="0.2"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                  opacity="0.4"
                />
                <path
                  d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
                  fill="#3b82f6"
                />
              </svg>
            </div>
            <div>
              <h2 className="fr-case-title">
                Case #
                {selectedCase.owner.full_name.substring(0, 2).toUpperCase()}-
                {selectedCase._id.substring(0, 4)}-
                {selectedCase._id.substring(4, 8)}-
                {selectedCase._id.substring(8, 12)}
              </h2>
              <div className="fr-case-meta">
                <span>
                  Initiated on {formatNotificationTime(selectedCase.createdAt)}
                </span>
                <div className="fr-case-meta-dot" />
                <span className="fr-active-search">
                  {selectedCase.status == "matched"
                    ? "● Matched"
                    : "○ Active Search"}{" "}
                </span>
              </div>
            </div>
          </div>
          <div className="fr-case-actions">
            <button
              className={`fr-mark-done-btn ${isMatched ? "fr-mark-done-btn-matched" : ""}`}
              type="button"
              onClick={() => update(selectedCase._id, null)}
              disabled={isUpdatingStatus || isMatched}
            >
              {markDoneLabel}
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="fr-info-row">
          <div className="fr-info-card">
            <p className="fr-info-card-label">Target Individual</p>
            <div className="fr-info-card-value-row">
              <div>
                <p className="fr-info-card-value">{selectedCase.name}</p>
                <p className="fr-info-card-sub">
                  Relation: {selectedCase.relation}
                </p>
              </div>
            </div>
          </div>

          <div className="fr-info-card">
            <p className="fr-info-card-label">Last Known Location</p>
            <div className="fr-info-card-value-row">
              <div>
                <p className="fr-info-card-value">
                  {selectedCase.last_known_location || "Unknown"}
                </p>
                <p className="fr-info-card-sub">
                  Date: {formatNotificationTime(selectedCase.last_known_date)}
                </p>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "82px",
              height: "82px",
              border: "1px solid #6b7db3",
              borderRadius: "10px",
            }}
          >
            {selectedCase.photo ? (
              <img
                src={selectedCase.photo}
                alt="Individual from the case"
                width={80}
                height={80}
                style={{ borderRadius: "10px" }}
              />
            ) : (
                      <img
                        src="/assets/logo.jpeg"
                        alt="logo"
                        width={80}
                        height={80}
                        style={{ borderRadius: "10px" }}
                      />
            )}
          </div>
        </div>
        {/* Chat */}
        <div className="fr-chat-section">
          <div className="fr-chat-header">
            <svg viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
            </svg>
            <span className="fr-chat-title">Secure Case Notes & Comms</span>
          </div>

          <div className="fr-chat-encrypted-note">
            <svg viewBox="0 0 24 24">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
            End-to-end encryption enabled
          </div>
          <div className="fr-chat-messages">
            {notes?.map((note) => {
              const isMe =
                note.sender?._id.toString() ===
                localStorage.getItem("userId").toString();
              const isOwner = owner === note.sender?._id.toString();
              return (
                <div
                  key={note._id}
                  className={`fr-msg-row ${isMe ? "right" : ""}`}
                >
                  <div className="fr-msg-avatar">
                    {note.image ? (
                      <img
                        src={note.image}
                        alt={note.sender.full_name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      note.sender?.full_name
                        ?.split(" ")
                        ?.map((n) => n[0])
                        ?.join("")
                        ?.substring(0, 2)
                    )}
                  </div>

                  <div className="fr-msg-content">
                    <div className={`fr-msg-meta ${isMe ? "right" : ""}`}>
                      {isMe ? (
                        <>
                          <span>{formatNotificationTime(note.createdAt)}</span>
                          <span className="fr-msg-name">
                            You
                            {isOwner && (
                              <span className="fr-owner-badge"> (Owner)</span>
                            )}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="fr-msg-name">
                            {note.sender?.full_name}
                            {isOwner && (
                              <span className="fr-owner-badge"> (Owner)</span>
                            )}
                          </span>
                          <span>{formatNotificationTime(note.createdAt)}</span>
                        </>
                      )}
                    </div>

                    <div className="fr-msg-bubble">{note.body}</div>
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>

          {selectedCase.status == "inProgress" && (
            <div className="fr-chat-input-row">
              <button className="fr-attach-btn">
                <svg viewBox="0 0 24 24">
                  <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z" />
                </svg>
              </button>
              <input
                className="fr-chat-input"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a secure message or note..."
                disabled={isSendingNote}
              />
              <button
                className="fr-send-btn"
                onClick={() =>
                  update(selectedCase._id, {
                    note: message,
                    image: localStorage.getItem("user_photo"),
                  })
                }
                disabled={isSendingNote}
              >
                {isSendingNote ? (
                  <svg className="fr-send-spinner" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="42"
                      strokeDashoffset="12"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="loader-container">
        <p>Waiting for selection</p>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  }
};

export default CaseDetail;
