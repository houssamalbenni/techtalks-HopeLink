const ServedCountsChart = ({ distributions = [] }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  // Generate served counts from distributions
  const served = days.map(() => 
    Math.floor(Math.random() * 500) + (distributions.length * 100)
  );
  const gaps = days.map(() => 
    Math.floor(Math.random() * 300) + 200
  );
  const maxVal = 1800;
  const h = 140;
  const w = 340;

  const toPoints = (data) =>
    data.map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - (v / maxVal) * h;
      return `${x},${y}`;
    }).join(' ');

  return (
    <div className="aid-chart-card">
      <div className="aid-chart-header">
        <div>
          <h3 className="aid-chart-title">Served Counts vs Gaps</h3>
          <p className="aid-chart-subtitle">Beneficiary verification via privacy tokens</p>
        </div>
        <button className="aid-chart-dots-btn">···</button>
      </div>

      <svg className="aid-chart-area" viewBox="0 0 360 160" preserveAspectRatio="none">
        {[0, 500, 1000, 1500].map((v) => {
          const y = h - (v / maxVal) * h + 10;
          return (
            <g key={v}>
              <line x1="30" y1={y} x2="360" y2={y} stroke="#2a3050" strokeWidth="0.5" />
              <text x="25" y={y + 4} fill="#6b7db3" fontSize="9" textAnchor="end">{v > 0 ? v : 0}</text>
            </g>
          );
        })}

        <g transform="translate(10, 10)">
          <polyline points={toPoints(served)} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points={toPoints(gaps)} fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5,4" strokeLinecap="round" />
        </g>

        {days.map((d, i) => (
          <text key={d} x={10 + (i / (days.length - 1)) * 340} y="158" fill="#6b7db3" fontSize="9" textAnchor="middle">{d}</text>
        ))}
      </svg>

      <div className="aid-chart-legend">
        <div className="aid-legend-item">
          <div className="aid-legend-line" style={{ background: '#3b82f6' }} />
          Served
        </div>
        <div className="aid-legend-item">
          <div className="aid-legend-dashed" />
          Gaps (Unmet Need)
        </div>
      </div>
    </div>
  );
};

export default ServedCountsChart;
