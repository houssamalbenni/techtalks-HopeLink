export default function AdminSidebar({ logoText, navItems, activeItem, user }) {
  return (
    <aside id="sidebar" className="hospitals-sidebar">
      <div className="hospitals-logo-wrap">
        <div className="hospitals-logo-icon">
          <i className="fa-solid fa-hospital-user" />
        </div>
        <span className="hospitals-logo-text">{logoText}</span>
      </div>

      <nav className="hospitals-nav">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`hospitals-nav-link ${activeItem === item.label ? "is-active" : ""}`}
          >
            <i className={item.icon} />
            {item.label}
          </a>
        ))}
      </nav>

      <div className="hospitals-user-card">
        <div className="hospitals-user-avatar">{user.initials}</div>
        <div className="hospitals-user-meta">
          <p>{user.name}</p>
          <span>{user.email}</span>
        </div>
      </div>
    </aside>
  );
}
