// components/Sidebar.jsx

const NAV_ITEMS = [
  { label: "Admin Dashboard", icon: "🏠" },
  { label: "Shelters", icon: "🏥" },
  { label: "Hospitals", icon: "🏨" },
  { label: "Add Shelter", icon: "➕" },
  { label: "Add Hospital", icon: "🏗️" },
  { label: "Settings", icon: "⚙️" },
];

export default function Sidebar({ activeNav, setActiveNav }) {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">🏥</div>
        <span className="logo-text">CareAdmin</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <div
            key={item.label}
            className={`nav-item${activeNav === item.label ? " active" : ""}`}
            onClick={() => setActiveNav(item.label)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      {/* User footer */}
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
