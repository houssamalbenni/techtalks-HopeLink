const navItems = [
  { icon: "⊞", label: "Refugee Dashboard", id: "dashboard" },
  { icon: "◎", label: "Interactive Map", id: "map" },
  { icon: "♾", label: "Family Reunification", id: "family" },
  { icon: "🔐", label: "Digital Identity Vault", id: "vault", active: true },
  { icon: "❤", label: "Mental Health Hub", id: "mental" },
  { icon: "⚙", label: "Profile & Settings", id: "settings" },
];

export default function Sidebar() {
  return (
    <aside className="digital-vault-sidebar">
      {/* Logo */}
      <div className="digital-vault-sidebar__logo">
        <div className="digital-vault-sidebar__logo-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="#4f8ef7" strokeWidth="2" />
            <path
              d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
              stroke="#4f8ef7"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <span className="digital-vault-sidebar__logo-text">RefugeLink</span>
      </div>

      {/* Search */}
      <div className="digital-vault-sidebar__search">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          style={{ marginRight: 6, flexShrink: 0 }}
        >
          <circle cx="11" cy="11" r="8" stroke="#4a5578" strokeWidth="2" />
          <path
            d="M21 21l-4.35-4.35"
            stroke="#4a5578"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <input
          className="digital-vault-sidebar__search-input"
          placeholder="Search resources..."
        />
      </div>

      {/* Nav */}
      <nav className="digital-vault-sidebar__nav">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`digital-vault-sidebar__nav-item ${item.active ? "digital-vault-sidebar__nav-item--active" : ""}`}
          >
            <span className="digital-vault-sidebar__nav-icon">{item.icon}</span>
            <span className="digital-vault-sidebar__nav-label">
              {item.label}
            </span>
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="digital-vault-sidebar__user">
        <div className="digital-vault-sidebar__avatar">AK</div>
        <div>
          <div className="digital-vault-sidebar__user-name">Ahmed K.</div>
          <div className="digital-vault-sidebar__user-role">
            Refugee Profile
          </div>
        </div>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          style={{ marginLeft: "auto" }}
        >
          <path
            d="M9 18l6-6-6-6"
            stroke="#4a5578"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </aside>
  );
}
