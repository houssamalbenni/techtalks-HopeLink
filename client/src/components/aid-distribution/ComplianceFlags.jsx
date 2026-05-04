const ComplianceFlags = ({ distributions = [] }) => {
  const lowAvailabilityBatches = distributions.filter((batch) => Number(batch.availability || 0) <= Number(batch.capacity || 0) * 0.2);

  const flags = [
    ...(lowAvailabilityBatches.length > 0
      ? [{
        id: 1,
        title: 'Low Availability',
        desc: `${lowAvailabilityBatches[0].to || lowAvailabilityBatches[0].category} is running low on capacity.`,
        iconBg: '#f97316',
        primaryAction: 'Review Batch',
        secondaryAction: null,
        icon: <path d="M20 6h-2.18c.07-.44.18-.88.18-1.33C18 2.53 15.48 1 13 1c-1.36 0-2.5.93-3 2.28C9.5 1.93 8.36 1 7 1 4.52 1 2 2.53 2 4.67c0 .45.11.88.18 1.33H0v14h20V6z" />,
      }]
      : []),
    ...(distributions.length === 0
      ? [{
        id: 2,
        title: 'No Live Batches',
        desc: 'No aid batches are currently loaded from the backend.',
        iconBg: '#ef4444',
        primaryAction: 'Retry Sync',
        secondaryAction: null,
        icon: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />,
      }]
      : [])
  ];

  if (flags.length === 0) {
    flags.push({
      id: 99,
      title: 'No Compliance Issues',
      desc: 'Loaded batches are within capacity thresholds.',
      iconBg: '#10b981',
      primaryAction: 'View Details',
      secondaryAction: null,
      icon: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14l-4-4 1.41-1.41L11 13.17l4.59-4.59L17 10l-6 6z" />,
    });
  }
  return (
    <div className="aid-compliance-card">
      <div className="aid-compliance-header">
        <h3 className="aid-compliance-title">Compliance & Fraud Flags</h3>
        <span className="aid-alerts-badge">{flags.length} Alert{flags.length !== 1 ? 's' : ''}</span>
      </div>

      {flags.map((flag) => (
        <div key={flag.id} className="aid-flag-item">
          <div className="aid-flag-icon" style={{ background: flag.iconBg }}>
            <svg viewBox="0 0 24 24">{flag.icon}</svg>
          </div>
          <div style={{ flex: 1 }}>
            <p className="aid-flag-title">{flag.title}</p>
            <p className="aid-flag-desc">{flag.desc}</p>
            <div className="aid-flag-actions">
              <button className="aid-flag-action-primary">{flag.primaryAction}</button>
              {flag.secondaryAction && (
                <button className="aid-flag-action-secondary">{flag.secondaryAction}</button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComplianceFlags;
