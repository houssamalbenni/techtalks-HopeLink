const STATUS_META = {
  active: { label: "Available", tone: "active" },
  maintenance: { label: "Limited", tone: "maintenance" },
  capacity: { label: "Closed", tone: "capacity" },
};

export default function StatusBadge({ status }) {
  const resolvedStatus = STATUS_META[status] || STATUS_META.active;

  return (
    <span className={`hospitals-status hospitals-status-${resolvedStatus.tone}`}>
      {resolvedStatus.label}
    </span>
  );
}
