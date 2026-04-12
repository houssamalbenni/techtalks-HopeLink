const requests = [
  {
    id: 1,
    title: 'Emergency Medical Supply',
    badge: 'Urgent',
    badgeClass: 'badge-urgent',
    dotClass: '',
    desc: 'Camp Alpha needs insulin and basic first aid kits immediately.',
    location: 'Camp Alpha, Sector 4',
    time: '2 mins ago',
  },
  {
    id: 2,
    title: 'Blankets & Winter Gear',
    badge: 'High Priority',
    badgeClass: 'badge-high',
    dotClass: 'high',
    desc: 'Requesting 200 blankets for new arrivals at the registration center.',
    location: 'Main Registration Hub',
    time: '15 mins ago',
  },
  {
    id: 3,
    title: 'Food Rations',
    badge: 'Standard',
    badgeClass: 'badge-standard',
    dotClass: 'standard',
    desc: 'Weekly food ration replenishment required for Sector 2.',
    location: 'Camp Beta, Sector 2',
    time: '1 hour ago',
  },
];

const AidRequestQueue = () => {
  return (
    <div className="section-card">
      <div className="section-header">
        <h2 className="section-title">Live Aid Request Queue</h2>
        <button className="filter-btn">
          Filter
          <svg style={{ width: 12, height: 12, fill: '#a0aec0' }} viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </button>
      </div>
      <div className="request-list">
        {requests.map((req) => (
          <div key={req.id} className="request-item">
            <div className="request-item-header">
              <div className="request-item-title">
                <div className={`request-dot ${req.dotClass}`} />
                {req.title}
                <span className={`badge ${req.badgeClass}`}>{req.badge}</span>
              </div>
              <span className="request-time">{req.time}</span>
            </div>
            <p className="request-desc">{req.desc}</p>
            <div className="request-footer">
              <div className="request-location">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                {req.location}
              </div>
              <div className="request-actions">
                <button className="btn-approve">Approve</button>
                <button className="btn-review">Review</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AidRequestQueue;
