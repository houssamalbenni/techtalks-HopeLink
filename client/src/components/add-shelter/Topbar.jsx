// components/Topbar.jsx

export default function Topbar({ onCancel, onDraft, onPublish, loading }) {
  return (
    <header className="topbar">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <a href="#">Shelters</a>
        <span className="sep">›</span>
        <span className="current">Add New Shelter</span>
      </nav>

      {/* Actions */}
      <div className="topbar-actions">
        <button className="btn-cancel" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
        <button className="btn-draft" onClick={onDraft} disabled={loading}>
          Save Draft
        </button>
        <button className="btn-publish" onClick={onPublish} disabled={loading}>
          <span>🚀</span> {loading ? "Publishing..." : "Publish Shelter"}
        </button>
      </div>
    </header>
  );
}
