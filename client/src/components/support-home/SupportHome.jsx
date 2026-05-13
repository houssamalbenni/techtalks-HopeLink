import "./SupportHome.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmergencyBanner from "./EmergencyBanner";
import LibrarySection from "./LibrarySection";
import SupportHeader from "./SupportHeader";
import SupportNavbar from "../support-nav/SupportNavbar";
import breathingImage1 from "./breathing/breathing-1.svg";
import breathingImage2 from "./breathing/breathing-2.svg";
import breathingImage3 from "./breathing/breathing-3.svg";
import breathingImage4 from "./breathing/breathing-4.svg";
import breathingImage5 from "./breathing/breathing-5.svg";
import breathingImage6 from "./breathing/breathing-6.svg";
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
      {
        id: 1,
        title:
          "Standing Together in Crisis: How Support Homes Shelter Families During War",
        time: "7 min read",
        path: "/support-home/articles/standing-together-in-crisis",
        image: "https://picsum.photos/seed/hopelink-1/800/480",
      },
      {
        id: 2,
        title:
          "Safe Haven in Hard Times: The Role of Support Homes in Conflict Zones",
        time: "6 min read",
        path: "/support-home/articles/safe-haven-conflict-zones",
        image: "https://picsum.photos/seed/hopelink-2/800/480",
      },
      {
        id: 3,
        title: "Hope Under Fire: Why Emergency Housing Matters in War",
        time: "6 min read",
        path: "/support-home/articles/hope-under-fire",
        image: "https://picsum.photos/seed/hopelink-3/800/480",
      },
    ],
  },
  {
    id: "articles",
    title: "Articles",
    items: [
      {
        id: 4,
        title: "Rebuilding Lives: Support Homes for Displaced Families",
        time: "7 min read",
        path: "/support-home/articles/rebuilding-lives",
        image: "https://picsum.photos/seed/hopelink-4/800/480",
      },
      {
        id: 5,
        title: "A Roof of Hope: Helping Civilians Through Support Housing",
        time: "6 min read",
        path: "/support-home/articles/roof-of-hope",
        image: "https://picsum.photos/seed/hopelink-5/800/480",
      },
      {
        id: 6,
        title: "From Fear to Safety: How Support Homes Change Lives During War",
        time: "6 min read",
        path: "/support-home/articles/from-fear-to-safety",
        image: "https://picsum.photos/seed/hopelink-6/800/480",
      },
    ],
  },

  {
    id: "breathing",
    title: "Breathing Exercises",
    items: [
      {
        id: 10,
        title: "Box Breathing",
        time: "4 min",
        description: "Inhale, hold, exhale, hold. Four counts each to settle your pace.",
        path: "/support-home/breathing/box-breathing",
        image: breathingImage1,
      },
      {
        id: 11,
        title: "4-7-8 Breath",
        time: "3 min",
        description: "Slow the body with a longer exhale to soften tension.",
        path: "/support-home/breathing/4-7-8-breath",
        image: breathingImage2,
      },
      {
        id: 12,
        title: "Calm Wave Breathing",
        time: "5 min",
        description: "Ride a gentle inhale and longer exhale like a steady wave.",
        path: "/support-home/breathing/calm-wave",
        image: breathingImage3,
      },
      {
        id: 13,
        title: "Triangle Breath",
        time: "4 min",
        description: "Three equal counts to build a smooth rhythm and focus.",
        path: "/support-home/breathing/triangle-breath",
        image: breathingImage4,
      },
      {
        id: 14,
        title: "Extended Exhale",
        time: "3 min",
        description: "Exhale longer than you inhale to cue calm quickly.",
        path: "/support-home/breathing/extended-exhale",
        image: breathingImage5,
      },
      {
        id: 15,
        title: "Morning Reset Breath",
        time: "5 min",
        description: "Wake the body gently with a slow inhale and steady release.",
        path: "/support-home/breathing/morning-reset",
        image: breathingImage6,
      },
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
      <SupportNavbar />
      <div className="support-layout">
        <main className="support-main">
          <SupportHeader />
          <EmergencyBanner
            onChat={handleRequestChat}
            disabled={isSubmitting || request?.status === "pending"}
            label={request?.status === "pending" ? "Request Sent" : "Chat Now"}
          />
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
