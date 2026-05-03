const TodaysDistribution = ({ distributions = [] }) => {
  // Calculate total weight from distributions
  const totalWeight = distributions.reduce((sum, dist) => {
    const weight = parseInt(dist.weight) || 0;
    return sum + weight;
  }, 0);

  // Daily goal (can be adjusted)
  const dailyGoal = 3600;
  const progressPercent = Math.min(Math.round((totalWeight / dailyGoal) * 100), 100);

  // Generate tags from distributions
  const tags = distributions.slice(0, 3).map((dist, index) => {
    const colors = ['#3b82f6', '#f97316', '#10b981'];
    return {
      label: `${dist.category} ${dist.weight}`,
      color: colors[index % colors.length],
    };
  });

  return (
    <div className="aid-dist-card">
      <div className="aid-dist-card-header">
        <span className="aid-dist-card-title">Today's Distribution</span>
        <div className="aid-dist-expand">↗</div>
      </div>

      <div className="aid-dist-tags">
        {tags.length > 0 ? (
          tags.map((tag) => (
            <div key={tag.label} className="aid-dist-tag">
              <div className="aid-dist-tag-dot" style={{ background: tag.color }} />
              {tag.label}
            </div>
          ))
        ) : (
          <p style={{ fontSize: '12px', color: '#666' }}>No distributions today</p>
        )}
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
          <div className="aid-progress-bar-fill" style={{ width: `${progressPercent}%` }}>
            <span className="aid-progress-label">{progressPercent}%</span>
          </div>
        </div>
        <div className="aid-progress-meta">
          <span>0%</span>
          <span>{totalWeight} kg / {dailyGoal} kg daily goal ({progressPercent}%)</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};

export default TodaysDistribution;
