import NavItem from "./NavItem";

export default function Sidebar({
  navItems,
  brandTitle = "Mindful Support",
  brandSub = "Counselor Portal",
}) {
  return (
    <aside className="portal-sidebar">
      <div className="portal-brand">
        <div className="brand-icon">
          <span className="brand-leaf" />
          <span className="brand-leaf" />
          <span className="brand-leaf" />
        </div>
        <div>
          <div className="brand-title">{brandTitle}</div>
          <div className="brand-subtitle">{brandSub}</div>
        </div>
      </div>

      <nav className="portal-nav">
        {navItems.map((item) => (
          <NavItem key={item.id} item={item} />
        ))}
      </nav>
    </aside>
  );
}
