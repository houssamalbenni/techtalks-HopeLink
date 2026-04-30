// components/FormFooter.jsx

export default function FormFooter({ isDirty, loading, onCancel, onSave }) {
  return (
    <div className="form-footer">
      {/* Unsaved indicator */}
      {isDirty && !loading && (
        <div className="unsaved-badge">
          <span className="unsaved-dot" />
          Unsaved changes
        </div>
      )}

      {/* Loading indicator */}
      {loading && (
        <div className="unsaved-badge">
          <span className="unsaved-dot" style={{ backgroundColor: "#33c" }} />
          Saving...
        </div>
      )}

      <div style={{ flex: 1 }} />

      <button className="btn-footer-cancel" onClick={onCancel} disabled={loading}>
        Cancel
      </button>
      <button className="btn-save" onClick={onSave} disabled={loading || !isDirty}>
        <span>💾</span> {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
