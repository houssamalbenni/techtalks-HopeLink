function SidebarNav({ logo, searchPlaceholder, navItems, user }) {
  return (
    <aside className="ps-sidebar">
      <div className="ps-logo-wrap">
        <div className="ps-logo-icon">
          <i className={`fa-solid ${logo.icon}`} aria-hidden="true" />
        </div>
        <span>{logo.label}</span>
      </div>

      <div className="ps-search-wrap">
        <i className="fa-solid fa-search" aria-hidden="true" />
        <input type="text" placeholder={searchPlaceholder} />
      </div>

      <nav>
        {navItems.map((item) => (
          <button key={item.id} type="button" className={item.active ? 'active' : ''}>
            <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <button type="button" className="ps-user-card">
        <img src={user.avatar} alt={user.name} />
        <div>
          <p>{user.name}</p>
          <small>{user.role}</small>
        </div>
        <i className="fa-solid fa-chevron-right" aria-hidden="true" />
      </button>
    </aside>
  );
}

export default SidebarNav;
