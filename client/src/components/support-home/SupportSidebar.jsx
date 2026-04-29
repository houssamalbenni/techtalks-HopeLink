import SidebarItem from "./SidebarItem";

export default function SupportSidebar({ items }) {
  return (
    <aside className="support-sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <span />
          <span />
          <span />
        </div>
        <div>
          <div className="brand-title">MindfulMe</div>
          <div className="brand-sub">Your wellness journey</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => (
          <SidebarItem key={item.id} item={item} />
        ))}
      </nav>

      <div className="sidebar-note">
        <div className="note-icon">OK</div>
        <p>You matter. Take things one step at a time.</p>
      </div>
    </aside>
  );
}
