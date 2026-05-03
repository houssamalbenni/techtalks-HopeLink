export default function ChatInput({
  placeholder = "Type your message...",
  onSend,
}) {
  return (
    <div className="chatting-input">
      <div className="input-field">
        <span className="input-icon">:-)</span>
        <input type="text" placeholder={placeholder} aria-label={placeholder} />
      </div>
      <button className="send-btn" type="button" onClick={onSend} aria-label="Send message">
        Send
      </button>
    </div>
  );
}
