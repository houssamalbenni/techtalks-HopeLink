export default function NavItem({ item }) {
  return (
    <button type="button" className={`portal-nav-item ${item.active ? "active" : ""}`}>
      <span className="portal-nav-icon" aria-hidden="true">{item.icon}</span>
      <span className="portal-nav-label">{item.label}</span>
      {item.badge ? <span className="portal-nav-badge">{item.badge}</span> : null}
    </button>
  );
}
