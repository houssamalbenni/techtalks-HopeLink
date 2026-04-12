import { useState } from 'react';

const SupplyChart = () => {
  const [showSupplyDropdown, setShowSupplyDropdown] = useState(false);
  const [supplyClicked, setSupplyClicked] = useState(false);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const foodData = [300, 450, 380, 520, 480, 600];
  const medData = [200, 320, 410, 350, 550, 490];

  const toPath = (data, color) => {
    const maxVal = 700;
    const w = 280;
    const h = 140;
    const points = data.map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - (v / maxVal) * h;
      return `${x},${y}`;
    });
    return (
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    );
  };

  return (
    <div className={`chart-card ${supplyClicked ? 'chart-active' : ''}`} onClick={() => setSupplyClicked(!supplyClicked)}>
      <div className="chart-header">
        <h3 className="chart-title">Supply Inventory Trends</h3>
        <div className="chart-filter-wrapper">
          <button className="chart-filter" onClick={() => setShowSupplyDropdown(!showSupplyDropdown)}>
            Last 30 Days
            <svg style={{ width: 12, height: 12, fill: '#a0aec0' }} viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </button>
          {showSupplyDropdown && (
            <div className="chart-dropdown">
              <div className="dropdown-option">Medical</div>
              <div className="dropdown-option">Security</div>
            </div>
          )}
        </div>
      </div>
      <svg className="chart-area" viewBox="0 0 300 150" preserveAspectRatio="xMidYMid meet">
        {[0, 50, 100, 150].map((y) => (
          <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#2a3050" strokeWidth="0.5" />
        ))}
        {toPath(foodData, '#3b82f6')}
        {toPath(medData, '#8b5cf6')}
        {months.map((m, i) => (
          <text
            key={m}
            x={(i / (months.length - 1)) * 280 + 10}
            y="148"
            fill="#6b7db3"
            fontSize="9"
            textAnchor="middle"
          >
            {m}
          </text>
        ))}
      </svg>
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-dot" style={{ background: '#3b82f6' }} />
          Food
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ background: '#8b5cf6' }} />
          Medical
        </div>
      </div>
    </div>
  );
};

const IncidentChart = () => {
  const [showIncidentDropdown, setShowIncidentDropdown] = useState(false);
  const [incidentClicked, setIncidentClicked] = useState(false);
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  const medical = [12, 18, 14, 20];
  const security = [6, 8, 10, 7];

  return (
    <div className={`chart-card ${incidentClicked ? 'chart-active' : ''}`} onClick={() => setIncidentClicked(!incidentClicked)}>
      <div className="chart-header">
        <h3 className="chart-title">Incident Report Volume</h3>
        <div className="chart-filter-wrapper">
          <button className="chart-filter" onClick={() => setShowIncidentDropdown(!showIncidentDropdown)}>
            All Categories
            <svg style={{ width: 12, height: 12, fill: '#a0aec0' }} viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </button>
          {showIncidentDropdown && (
            <div className="chart-dropdown">
              <div className="dropdown-option">Medical</div>
              <div className="dropdown-option">Security</div>
            </div>
          )}
        </div>
      </div>
      <svg className="chart-area" viewBox="0 0 300 150" preserveAspectRatio="xMidYMid meet">
        {[0, 50, 100, 150].map((y) => (
          <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#2a3050" strokeWidth="0.5" />
        ))}
        {weeks.map((w, i) => {
          const maxVal = 25;
          const h = 130;
          const slotW = 300 / weeks.length;
          const x = i * slotW + slotW * 0.15;
          const barW = slotW * 0.28;
          const mH = (medical[i] / maxVal) * h;
          const sH = (security[i] / maxVal) * h;
          return (
            <g key={w}>
              <rect x={x} y={h - mH} width={barW} height={mH} fill="#3b82f6" rx="3" />
              <rect x={x + barW + 4} y={h - sH} width={barW} height={sH} fill="#ef4444" rx="3" />
              <text x={x + barW} y="148" fill="#6b7db3" fontSize="8" textAnchor="middle">
                {w}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-dot" style={{ background: '#3b82f6' }} />
          Medical
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ background: '#ef4444' }} />
          Security
        </div>
      </div>
    </div>
  );
};

const ChartsRow = () => {
  return (
    <div className="charts-row">
      <SupplyChart />
      <IncidentChart />
    </div>
  );
};

export default ChartsRow;
