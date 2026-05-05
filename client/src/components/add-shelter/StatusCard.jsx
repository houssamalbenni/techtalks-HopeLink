// components/StatusCard.jsx

function Toggle({ on, onToggle, label, hint }) {
  return (
    <div className="toggle-row">
      <div className="toggle-info">
        <div className="toggle-label">{label}</div>
        <div className="toggle-hint">{hint}</div>
      </div>
      <div
        className={`toggle${on ? " on" : ""}`}
        onClick={onToggle}
        role="switch"
        aria-checked={on}
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onToggle()}
      >
        <div className="toggle-thumb" />
      </div>
    </div>
  );
}

export default function StatusCard({ status, onStatusChange, onPublish }) {
  return (
    <div className="status-card">
      <div>
        <div className="status-card-title">
          <span>🔐</span> Status
        </div>
        <div className="status-card-desc">Visibility settings.</div>
      </div>

      <div className="status-divider" />

      <Toggle
        on={status.active}
        onToggle={() => onStatusChange("active", !status.active)}
        label="Active Status"
        hint="Visible in directory"
      />

      <Toggle
        on={status.acceptingReferrals}
        onToggle={() =>
          onStatusChange("acceptingReferrals", !status.acceptingReferrals)
        }
        label="Accepting Referrals"
        hint="Open for new intake"
      />

      <div className="status-divider" />

      <button className="btn-publish-card" onClick={onPublish}>
        🚀 Publish Shelter
      </button>
    </div>
  );
}
