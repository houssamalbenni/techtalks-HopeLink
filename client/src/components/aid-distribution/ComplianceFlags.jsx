const flags = [
  {
    id: 1,
    title: 'Duplicate QR Token Scan',
    desc: 'Token #TK-8892 was scanned twice within 5 minutes at different distribution points (Sector 2 & Sector 4).',
    iconBg: '#ef4444',
    primaryAction: 'Investigate',
    secondaryAction: 'Dismiss',
    icon: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />,
  },
  {
    id: 2,
    title: 'Inventory Discrepancy',
    desc: 'Reported delivered weight for Batch #AD8842 (120kg) does not match received weight (105kg) at Camp Alpha.',
    iconBg: '#f97316',
    primaryAction: 'Audit Batch',
    secondaryAction: null,
    icon: <path d="M20 6h-2.18c.07-.44.18-.88.18-1.33C18 2.53 15.48 1 13 1c-1.36 0-2.5.93-3 2.28C9.5 1.93 8.36 1 7 1 4.52 1 2 2.53 2 4.67c0 .45.11.88.18 1.33H0v14h20V6z" />,
  },
];

const ComplianceFlags = () => {
  return (
    <div className="aid-compliance-card">
      <div className="aid-compliance-header">
        <h3 className="aid-compliance-title">Compliance & Fraud Flags</h3>
        <span className="aid-alerts-badge">2 Alerts</span>
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
