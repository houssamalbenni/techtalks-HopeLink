import "./Chatting.css";
import ChatInput from "./ChatInput";
import ChattingTopbar from "./ChattingTopbar";
import MessagesList from "./MessagesList";
import SecurityBanner from "./SecurityBanner";
import SessionFooter from "./SessionFooter";

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
