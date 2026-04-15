// components/Topbar.jsx

export default function Topbar({ shelterName, onCancel, onUpdate }) {
  return (
    <header className="topbar">
      <nav className="breadcrumb">
        <a href="#">Shelters</a>
        <span className="sep">›</span>
        <span className="crumb-shelter">{shelterName}</span>
        <span className="sep">›</span>
        <span className="current">Edit Shelter</span>
      </nav>

      <div className="topbar-actions">
        <button className="btn-cancel" onClick={onCancel}>Cancel</button>
        <button className="btn-update" onClick={onUpdate}>
          <span>✏️</span> Update Shelter
        </button>
      </div>
    </header>
  );
}
