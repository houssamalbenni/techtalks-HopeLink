export default function AdminHeader({ sidebarOpen, onToggleSidebar }) {
  return (
    <header className="ad-header">
      <button className="ad-menu-btn" onClick={() => onToggleSidebar(!sidebarOpen)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M3 6h18M3 12h18M3 18h18" stroke="#e5e7eb" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <div className="ad-header-title">
        <h1>Admin Dashboard</h1>
        <p>System overview and resource management</p>
      </div>
      <div className="ad-header-actions">
        <button className="ad-btn ad-btn--primary ad-header-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          Add Shelter
        </button>
        <button className="ad-btn ad-btn--primary ad-header-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          Add Hospital
        </button>
      </div>
    </header>
  );
}
