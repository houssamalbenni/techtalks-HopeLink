const SidebarOption = ({ label, count, active, onClick, src, icon }) => (
  <div
    className={`sidebar-option ${active ? "active" : ""}`}
    onClick={onClick}
    style={{ cursor: "pointer" }} // Ensure the user knows it's clickable
  >
    {src && <img src={src} alt="icon" className="menu-icon" />}
    {icon && <i className={icon} />}
    <span className="option-label" style={{marginLeft:"8px"}}>{label}</span>
    {count && <span className="option-count">{count}</span>}
  </div>
);

export default SidebarOption;
