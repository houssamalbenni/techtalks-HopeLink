const SidebarOption = ({ label, count, active, onClick, src }) => (
  <div 
    className={`sidebar-option ${active ? 'active' : ''}`} 
    onClick={onClick}
    style={{ cursor: 'pointer' }} // Ensure the user knows it's clickable
  >
    <img src={src} alt="icon" className="menu-icon" />
    <span className="option-label">{label}</span>
    {count && <span className="option-count">{count}</span>}
  </div>
);

export default SidebarOption;