import "./CounselorPortal.css";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import SectionHeader from "./SectionHeader";
import RequestFilters from "./RequestFilters";
import RequestList from "./RequestList";

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

const filters = [
  { id: "all", label: "All (5)", active: true, tone: "all" },
  { id: "critical", label: "Critical (2)", tone: "critical" },
  { id: "general", label: "General (3)", tone: "general" },
];

const requests = [
  {
    id: 1,
    type: "Critical",
    note: "Someone needs immediate support",
    time: "Just now",
    priority: "High Priority",
    tone: "critical",
  },
  {
    id: 2,
    type: "Critical",
    note: "Someone needs immediate support",
    time: "2 min ago",
    priority: "High Priority",
    tone: "critical",
  },
  {
    id: 3,
    type: "General",
    note: "Looking for guidance and support",
    time: "5 min ago",
    priority: "Normal Priority",
    tone: "general",
  },
  {
    id: 4,
    type: "General",
    note: "Looking for guidance and support",
    time: "8 min ago",
    priority: "Normal Priority",
    tone: "general",
  },
  {
    id: 5,
    type: "General",
    note: "Looking for guidance and support",
    time: "12 min ago",
    priority: "Normal Priority",
    tone: "general",
  },
];

export default function CounselorPortal() {
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
              action="View All (5)"
            />
            <RequestFilters filters={filters} />
            <RequestList requests={requests} />
          </section>
        </main>
      </div>
    </div>
  );
}
