export default function ChattingTopbar({
  guestTitle = "Chat as Guest",
  guestSub = "Your identity is hidden",
  counselorName = "Sarah Johnson",
  counselorMeta = "Licensed Counselor - Online",
}) {
  return (
    <header className="chatting-topbar">
      <div className="guest-toggle">
        <div>
          <div className="guest-title">{guestTitle}</div>
          <div className="guest-sub">{guestSub}</div>
        </div>
        <div className="toggle-pill" role="switch" aria-checked="true">
          <span />
        </div>
      </div>
      <div className="counselor-card">
        <div className="counselor-avatar" />
        <div>
          <div className="counselor-name">{counselorName}</div>
          <div className="counselor-meta">{counselorMeta}</div>
        </div>
        <button className="dots" type="button" aria-label="More options">...</button>
      </div>
    </header>
  );
}
