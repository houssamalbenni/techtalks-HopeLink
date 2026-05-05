

const TopBar = () => {
  return (
    <div className="dashboard-topbar">
      <h1 className="dashboard-title">NGO Operations Dashboard</h1>
      <div className="topbar-actions">

        <button className="btn-primary">
          <svg className="btn-icon" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
          Post Announcement
        </button>
        <div className="topbar-actions-group">
          <button className="btn-secondary">
            <svg className="btn-icon" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
            </svg>
            Update Capacity
          </button>
          <button className="btn-notification">
            <svg className="btn-icon" viewBox="0 0 24 24">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
            </svg>
            <span className="notification-badge">3</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
