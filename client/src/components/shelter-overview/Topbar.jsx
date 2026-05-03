export default function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-date">
        <span>📅</span>
        <span>Today, Oct 24, 2026</span>
      </div>
      <div className="topbar-actions">
        <button className="btn-export">
          <span>📤</span> Export
        </button>
        <button className="btn-icon">
          🔔
          <span className="notif-dot" />
        </button>
      </div>
    </header>
  );
}
