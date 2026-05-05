export default function NavItem({ item, onSelect }) {
  return (
    <button
      type="button"
      className={`nav-item ${item.active ? "active" : ""}`}
      onClick={() => onSelect?.(item.id)}
    >
      <span className="nav-icon" aria-hidden="true">{item.icon}</span>
      {item.label}
    </button>
  );
}
