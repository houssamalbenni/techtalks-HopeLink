import { useState } from 'react';

const getRequestStatusCounts = (requests = []) => {
  return requests.reduce(
    (accumulator, request) => {
      const status = String(request?.status || 'pending').toLowerCase();
      if (status in accumulator) {
        accumulator[status] += 1;
      } else {
        accumulator.pending += 1;
      }
      return accumulator;
    },
    { pending: 0, approved: 0, completed: 0, rejected: 0 }
  );
};

const getServiceSeries = (services = []) => {
  const visibleServices = services.slice(0, 6);
  const labels = visibleServices.map((service, index) => service.title || `Service ${index + 1}`);
  const capacity = visibleServices.map((service) => Number(service?.capacity || 0));
  const availability = visibleServices.map((service) => Number(service?.availability || 0));

  return {
    labels: labels.length > 0 ? labels : ['No data'],
    capacity: capacity.length > 0 ? capacity : [0],
    availability: availability.length > 0 ? availability : [0],
  };
};

const SupplyChart = ({ services = [] }) => {
  const [showSupplyDropdown, setShowSupplyDropdown] = useState(false);
  const [expandedSupply, setExpandedSupply] = useState(false);
  const { labels, capacity, availability } = getServiceSeries(services);
  const maxVal = Math.max(...capacity, ...availability, 1);

  const toPath = (data, color) => {
    const w = 280;
    const h = 140;
    const denom = Math.max(data.length - 1, 1);
    const points = data.map((value, index) => {
      const x = (index / denom) * w;
      const y = h - (value / maxVal) * h;
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
    <>
      <div className={`chart-card ${expandedSupply ? 'chart-active' : ''}`} onClick={() => setExpandedSupply(true)}>
        <div className="chart-header">
          <h3 className="chart-title">Service Capacity Snapshot</h3>
          <div className="chart-filter-wrapper">
            <button className="chart-filter" onClick={(e) => {
              e.stopPropagation();
              setShowSupplyDropdown(!showSupplyDropdown);
            }}>
              Live services
              <svg style={{ width: 12, height: 12, fill: '#a0aec0' }} viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </button>
            {showSupplyDropdown && (
              <div className="chart-dropdown">
                <div className="dropdown-option">Capacity</div>
                <div className="dropdown-option">Availability</div>
              </div>
            )}
          </div>
        </div>
        <svg className="chart-area" viewBox="0 0 300 150" preserveAspectRatio="xMidYMid meet">
          {[0, 50, 100, 150].map((y) => (
            <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#2a3050" strokeWidth="0.5" />
          ))}
          {toPath(capacity, '#3b82f6')}
          {toPath(availability, '#8b5cf6')}
          {labels.map((label, i) => (
            <text
              key={label}
                  x={(i / Math.max(labels.length - 1, 1)) * 280 + 10}
              y="148"
              fill="#6b7db3"
              fontSize="9"
              textAnchor="middle"
            >
              {label}
            </text>
          ))}
        </svg>
        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-dot" style={{ background: '#3b82f6' }} />
            Capacity
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: '#8b5cf6' }} />
            Availability
          </div>
        </div>
      </div>

      {expandedSupply && (
        <div className="chart-modal-overlay" onClick={() => setExpandedSupply(false)}>
          <div className="chart-modal" onClick={(e) => e.stopPropagation()}>
            <button className="chart-modal-close" onClick={() => setExpandedSupply(false)}>
              ✕
            </button>
            <h2 className="chart-modal-title">Service Capacity Snapshot</h2>
            <svg className="chart-modal-area" viewBox="0 0 300 150" preserveAspectRatio="xMidYMid meet">
              {[0, 50, 100, 150].map((y) => (
                <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#2a3050" strokeWidth="0.5" />
              ))}
              {toPath(capacity, '#3b82f6')}
              {toPath(availability, '#8b5cf6')}
              {labels.map((label, i) => (
                <text
                  key={label}
                  x={(i / Math.max(labels.length - 1, 1)) * 280 + 10}
                  y="148"
                  fill="#6b7db3"
                  fontSize="9"
                  textAnchor="middle"
                >
                  {label}
                </text>
              ))}
            </svg>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-dot" style={{ background: '#3b82f6' }} />
                Capacity
              </div>
              <div className="legend-item">
                <div className="legend-dot" style={{ background: '#8b5cf6' }} />
                Availability
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const IncidentChart = ({ requests = [] }) => {
  const [showIncidentDropdown, setShowIncidentDropdown] = useState(false);
  const [expandedIncident, setExpandedIncident] = useState(false);
  const statusCounts = getRequestStatusCounts(requests);
  const labels = ['Pending', 'Approved', 'Completed', 'Rejected'];
  const values = [statusCounts.pending, statusCounts.approved, statusCounts.completed, statusCounts.rejected];
  const maxVal = Math.max(...values, 1);

  return (
    <>
      <div className={`chart-card ${expandedIncident ? 'chart-active' : ''}`} onClick={() => setExpandedIncident(true)}>
        <div className="chart-header">
          <h3 className="chart-title">Request Status Breakdown</h3>
          <div className="chart-filter-wrapper">
            <button className="chart-filter" onClick={(e) => {
              e.stopPropagation();
              setShowIncidentDropdown(!showIncidentDropdown);
            }}>
              Current status
              <svg style={{ width: 12, height: 12, fill: '#a0aec0' }} viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </button>
            {showIncidentDropdown && (
              <div className="chart-dropdown">
                <div className="dropdown-option">Pending</div>
                <div className="dropdown-option">Completed</div>
              </div>
            )}
          </div>
        </div>
        <svg className="chart-area" viewBox="0 0 300 150" preserveAspectRatio="xMidYMid meet">
          {[0, 50, 100, 150].map((y) => (
            <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#2a3050" strokeWidth="0.5" />
          ))}
          {labels.map((label, i) => {
            const h = 130;
            const slotW = 300 / labels.length;
            const x = i * slotW + slotW * 0.15;
            const barW = slotW * 0.55;
            const barH = (values[i] / maxVal) * h;
            return (
              <g key={label}>
                <rect x={x} y={h - barH} width={barW} height={barH} fill="#3b82f6" rx="3" />
                <text x={x + barW / 2} y="148" fill="#6b7db3" fontSize="8" textAnchor="middle">
                  {label}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-dot" style={{ background: '#3b82f6' }} />
            Requests
          </div>
        </div>
      </div>

      {expandedIncident && (
        <div className="chart-modal-overlay" onClick={() => setExpandedIncident(false)}>
          <div className="chart-modal" onClick={(e) => e.stopPropagation()}>
            <button className="chart-modal-close" onClick={() => setExpandedIncident(false)}>
              ✕
            </button>
            <h2 className="chart-modal-title">Request Status Breakdown</h2>
            <svg className="chart-modal-area" viewBox="0 0 300 150" preserveAspectRatio="xMidYMid meet">
              {[0, 50, 100, 150].map((y) => (
                <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#2a3050" strokeWidth="0.5" />
              ))}
              {labels.map((label, i) => {
                const h = 130;
                const slotW = 300 / labels.length;
                const x = i * slotW + slotW * 0.15;
                const barW = slotW * 0.55;
                const barH = (values[i] / maxVal) * h;
                return (
                  <g key={label}>
                    <rect x={x} y={h - barH} width={barW} height={barH} fill="#3b82f6" rx="3" />
                    <text x={x + barW / 2} y="148" fill="#6b7db3" fontSize="8" textAnchor="middle">
                      {label}
                    </text>
                  </g>
                );
              })}
            </svg>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-dot" style={{ background: '#3b82f6' }} />
                Requests
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ChartsRow = ({ requests = [], services = [] }) => {
  return (
    <div className="charts-row">
      <SupplyChart services={services} />
      <IncidentChart requests={requests} />
    </div>
  );
};

export default ChartsRow;
