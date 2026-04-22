const tags = [
  { label: 'Medical 450kg', color: '#3b82f6' },
  { label: 'Food 1,200kg', color: '#f97316' },
  { label: 'Shelter 800kg', color: '#10b981' },
];

const TodaysDistribution = () => {
  return (
    <div className="aid-dist-card">
      <div className="aid-dist-card-header">
        <span className="aid-dist-card-title">Today's Distribution</span>
        <div className="aid-dist-expand">↗</div>
      </div>

      <div className="aid-dist-tags">
        {tags.map((tag) => (
          <div key={tag.label} className="aid-dist-tag">
            <div className="aid-dist-tag-dot" style={{ background: tag.color }} />
            {tag.label}
          </div>
        ))}
      </div>

      <div className="aid-dist-chart-area">
        <svg width="100%" height="120" viewBox="0 0 300 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="distGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 40, 80].map((y) => (
            <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#2a3050" strokeWidth="0.5" />
          ))}
          <path d="M0,80 C50,70 80,50 120,60 C160,70 180,30 240,20 C270,15 290,10 300,8" fill="url(#distGrad)" stroke="none" />
          <path d="M0,80 C50,70 80,50 120,60 C160,70 180,30 240,20 C270,15 290,10 300,8" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>

      <div className="aid-dist-progress-section">
        <div className="aid-progress-bar-wrap">
          <div className="aid-progress-bar-fill">
            <span className="aid-progress-label">68%</span>
          </div>
        </div>
        <div className="aid-progress-meta">
          <span>0%</span>
          <span>2,450 kg / 3,600 kg daily goal (68%)</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};

export default TodaysDistribution;
