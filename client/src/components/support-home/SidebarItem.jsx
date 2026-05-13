export default function SidebarItem({ item }) {
  return (
    <button type="button" className={`sidebar-link ${item.active ? "active" : ""}`}>
      <span className="sidebar-dot" aria-hidden="true" />
      {item.label}
    </button>
  );
}
