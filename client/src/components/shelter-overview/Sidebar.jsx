export default function Sidebar({ activeNav, onNavChange, navItems }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">🏥</div>
        <span className="logo-text">CareAdmin</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={`nav-item${activeNav === item.label ? " active" : ""}`}
            onClick={() => onNavChange(item.label)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-chip">
          <div className="user-avatar">DA</div>
          <div className="user-info">
            <div className="user-name">Dr. Admin</div>
            <div className="user-email">admin@careadmin.com</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
