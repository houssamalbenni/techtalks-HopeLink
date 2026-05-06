import "./SupportHome.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmergencyBanner from "./EmergencyBanner";
import LibrarySection from "./LibrarySection";
import SupportHeader from "./SupportHeader";
import SupportSidebar from "./SupportSidebar";
import {
  createChatRequest,
  getActiveChatRequest,
  getChatRequestById,
} from "../../../services/chatRequestService";

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", active: true },
  { id: "mood", label: "Mood" },
  { id: "journal", label: "Journal" },
  { id: "resources", label: "Resources" },
  { id: "goals", label: "Goals" },
  { id: "insights", label: "Insights" },
  { id: "settings", label: "Settings" },
];

const librarySections = [
  {
    id: "quick",
    title: "Quick Support Library",
    items: [
      { id: 1, title: "Coping with Displacement Shock", time: "6 min read" },
      { id: 2, title: "Fast Grounding Strategies", time: "4 min read" },
      { id: 3, title: "Build a Safe Daily Routine", time: "5 min read" },
    ],
  },
  {
    id: "articles",
    title: "Articles",
    items: [
      {
        id: 4,
        title: "Understanding Your Stress Triggers",
        time: "7 min read",
      },
      { id: 5, title: "Restoring Safety After Trauma", time: "6 min read" },
      { id: 6, title: "Practical Self-Care Plans", time: "5 min read" },
    ],
  },
  {
    id: "videos",
    title: "Videos",
    items: [
      { id: 7, title: "Breathing Reset in 60 Seconds", time: "3 min watch" },
      { id: 8, title: "Body Scan for Calm", time: "5 min watch" },
      { id: 9, title: "Grounding with 5-4-3-2-1", time: "4 min watch" },
    ],
  },
  {
    id: "breathing",
    title: "Breathing Exercises",
    items: [
      { id: 10, title: "Box Breathing", time: "4 min" },
      { id: 11, title: "4-7-8 Breath", time: "3 min" },
      { id: 12, title: "Calm Wave Breathing", time: "5 min" },
    ],
  },
];

export default function SupportHome() {
  const [request, setRequest] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const loadActiveRequest = async () => {
      try {
        const res = await getActiveChatRequest();
        if (isMounted && res?.data) {
          setRequest(res.data);
        }
      } catch {
        if (isMounted) {
          setRequest(null);
        }
      }
    };

    loadActiveRequest();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!request || request.status !== "pending") {
      return;
    }

    let isMounted = true;
    const intervalId = setInterval(async () => {
      try {
        const res = await getChatRequestById(request._id);
        const updatedRequest = res?.data;
        if (!isMounted || !updatedRequest) {
          return;
        }

        setRequest(updatedRequest);

        if (updatedRequest.status === "accepted" && updatedRequest.doctorId) {
          navigate(`/test/refugee-chat/${updatedRequest.doctorId}`);
        }
      } catch {
        if (isMounted) {
          setErrorMessage("Unable to check request status. Please try again.");
        }
      }
    }, 4000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [request, navigate]);

  const handleRequestChat = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await createChatRequest({
        note: "Looking for guidance and support",
        priority: "general",
      });

      setRequest(res?.data || null);
    } catch (error) {
      setErrorMessage(error?.message || "Failed to send request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="support-home-page">
      <div className="support-layout">
        <SupportSidebar items={sidebarItems} />

        <main className="support-main">
          <SupportHeader />
          <EmergencyBanner />
          {request && (
            <div className={`support-request-card ${request.status}`}>
              <div className="support-request-title">
                {request.status === "accepted"
                  ? "Doctor accepted your request"
                  : "Waiting for a doctor to accept"}
              </div>
              <div className="support-request-note">
                {request.status === "accepted"
                  ? "Opening your chat now."
                  : "Please stay on this page. You will be connected shortly."}
              </div>
            </div>
          )}
          {errorMessage && (
            <div className="support-request-error">{errorMessage}</div>
          )}
          <div className="library-stack">
            {librarySections.map((section) => (
              <LibrarySection
                key={section.id}
                title={section.title}
                items={section.items}
              />
            ))}
          </div>
        </main>
      </div>

      <button
        className="floating-action"
        type="button"
        onClick={handleRequestChat}
        disabled={isSubmitting || request?.status === "pending"}
      >
        {request?.status === "pending" ? "Request Sent" : "Chat Now"}
      </button>
    </div>
  );
}
