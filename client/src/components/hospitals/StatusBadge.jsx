const STATUS_META = {
  active: { label: "Active", tone: "active" },
  maintenance: { label: "Maintenance", tone: "maintenance" },
  capacity: { label: "At Capacity", tone: "capacity" },
};

export default function StatusBadge({ status }) {
  const resolvedStatus = STATUS_META[status] || STATUS_META.active;

  return (
    <span className={`hospitals-status hospitals-status-${resolvedStatus.tone}`}>
      {resolvedStatus.label}
    </span>
  );
}
