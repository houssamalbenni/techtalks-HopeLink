export default function MessagesList({ messages }) {
  return (
    <section className="chatting-messages">
      {messages.map((message) => (
        <div key={message.id} className={`message-row ${message.side}`}>
          {message.side === "counselor" && <div className="message-avatar" />}
          <div className="message-bubble">
            <p>{message.text}</p>
            <span className="message-time">{message.time}</span>
          </div>
        </div>
      ))}
    </section>
  );
}
