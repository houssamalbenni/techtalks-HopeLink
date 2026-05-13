import "./CounselorPortal.css";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import SectionHeader from "./SectionHeader";
import RequestFilters from "./RequestFilters";
import RequestList from "./RequestList";
import {
  acceptChatRequest,
  getChatRequestQueue,
} from "../../../services/chatRequestService";
import { formatNotificationTime } from "../../../utils/helper";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    active: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 11l8-7 8 7v8a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1z" />
      </svg>
    ),
  },
  {
    id: "queue",
    label: "Queue",
    badge: "5",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 6h14v10H7l-2 2z" />
      </svg>
    ),
  },
  {
    id: "conversations",
    label: "Conversations",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 7h14v9H7l-2 2z" />
      </svg>
    ),
  },
  {
    id: "clients",
    label: "Clients",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="8" cy="9" r="3" />
        <circle cx="16" cy="9" r="3" />
        <path d="M4 19c0-3 3-5 6-5" />
        <path d="M14 14c3 0 6 2 6 5" />
      </svg>
    ),
  },
  {
    id: "resources",
    label: "Resources",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 4h12v16H6z" />
        <path d="M9 8h6" />
      </svg>
    ),
  },
  {
    id: "reports",
    label: "Reports",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 19V5" />
        <path d="M9 19V9" />
        <path d="M13 19V12" />
        <path d="M17 19V7" />
      </svg>
    ),
  },
  {
    id: "calendar",
    label: "Calendar",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="6" width="16" height="14" rx="2" />
        <path d="M8 4v4M16 4v4" />
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
];

export default function CounselorPortal() {
  const [requests, setRequests] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [acceptingId, setAcceptingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const loadQueue = async () => {
      setIsLoading(true);
      try {
        const res = await getChatRequestQueue();
        const queue = res?.data?.requests || [];
        if (isMounted) {
          setRequests(queue);
        }
      } catch {
        if (isMounted) {
          setRequests([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadQueue();
    const intervalId = setInterval(loadQueue, 5000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const mappedRequests = useMemo(
    () =>
      requests.map((request) => {
        const tone = request.priority === "critical" ? "critical" : "general";

        return {
          id: request._id,
          type: tone === "critical" ? "Critical" : "General",
          note: request.note || "Looking for guidance and support",
          time: formatNotificationTime(request.createdAt),
          priority: tone === "critical" ? "High Priority" : "Normal Priority",
          tone,
          refugeeId: request.refugeeId,
        };
      }),
    [requests],
  );

  const filteredRequests = mappedRequests.filter((request) => {
    if (activeFilter === "all") {
      return true;
    }

    return request.tone === activeFilter;
  });

  const filters = [
    {
      id: "all",
      label: `All (${mappedRequests.length})`,
      active: activeFilter === "all",
      tone: "all",
    },
    {
      id: "critical",
      label: `Critical (${mappedRequests.filter((r) => r.tone === "critical").length})`,
      active: activeFilter === "critical",
      tone: "critical",
    },
    {
      id: "general",
      label: `General (${mappedRequests.filter((r) => r.tone === "general").length})`,
      active: activeFilter === "general",
      tone: "general",
    },
  ];

  const handleAccept = async (requestId) => {
    if (acceptingId) {
      return;
    }

    setAcceptingId(requestId);
    try {
      const res = await acceptChatRequest(requestId);
      const acceptedRequest = res?.data;
      if (acceptedRequest?.refugeeId) {
        navigate(`/test/doctor-chat/${acceptedRequest.refugeeId}`);
      }
      setRequests((prev) => prev.filter((item) => item._id !== requestId));
    } catch {
      setAcceptingId(null);
    } finally {
      setAcceptingId(null);
    }
  };

  return (
    <div className="portal-page">
      <div className="portal-shell">
        <Sidebar navItems={navItems} />
        <main className="portal-main">
          <Topbar
            title="Welcome back, Counselor"
            subtitle="You're here to make a difference. Take it one conversation at a time."
          />
          <section className="portal-card">
            <SectionHeader
              title="Incoming Chat Requests"
              subtitle="Queue is prioritized by urgency"
              action={
                isLoading ? "Loading..." : `View All (${mappedRequests.length})`
              }
            />
            <RequestFilters filters={filters} onSelect={setActiveFilter} />
            <RequestList
              requests={filteredRequests}
              onAccept={handleAccept}
              acceptingId={acceptingId}
            />
          </section>
        </main>
      </div>
    </div>
  );
}
