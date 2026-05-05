import "./Chatting.css";
import ChatInput from "./ChatInput";
import ChattingSidebar from "./ChattingSidebar";
import ChattingTopbar from "./ChattingTopbar";
import MessagesList from "./MessagesList";
import SecurityBanner from "./SecurityBanner";
import SessionFooter from "./SessionFooter";

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

const messages = [
  {
    id: 1,
    side: "user",
    text: "I've been feeling overwhelmed lately and having a hard time managing my anxiety.",
    time: "10:30 AM",
  },
  {
    id: 2,
    side: "counselor",
    text: "Thank you for sharing that with me. It takes a lot of courage to reach out. Can you tell me more about what you've been experiencing?",
    time: "10:31 AM",
  },
  {
    id: 3,
    side: "user",
    text: "I just feel like there's so much going on, and I can't keep up with everything.",
    time: "10:32 AM",
  },
  {
    id: 4,
    side: "counselor",
    text: "That sounds really challenging. Let's take this one step at a time. You don't have to face it all alone.",
    time: "10:33 AM",
  },
];

export default function Chatting() {
  return (
    <div className="chatting-page">
      <div className="chatting-shell">
        <ChattingSidebar navItems={navItems} />

        <main className="chatting-main">
          <ChattingTopbar />
          <SecurityBanner />
          <MessagesList messages={messages} />
          <ChatInput />
          <SessionFooter />
        </main>
      </div>
    </div>
  );
}
