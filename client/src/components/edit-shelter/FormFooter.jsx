// components/FormFooter.jsx

export default function FormFooter({ isDirty, onCancel, onSave }) {
  return (
    <div className="form-footer">
      {/* Unsaved indicator */}
      {isDirty && (
        <div className="unsaved-badge">
          <span className="unsaved-dot" />
          Unsaved changes
        </div>
      )}

      <div style={{ flex: 1 }} />

      <button className="btn-footer-cancel" onClick={onCancel}>
        Cancel
      </button>
      <button className="btn-save" onClick={onSave}>
        <span>💾</span> Save Changes
      </button>
    </div>
  );
}
