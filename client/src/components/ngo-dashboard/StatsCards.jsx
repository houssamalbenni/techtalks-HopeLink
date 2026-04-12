const StatsCards = () => {
  return (
    <div className="stats-row">
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-card-label">Incoming Aid Requests</span>
          <div className="stat-card-icon">
            <svg viewBox="0 0 24 24">
              <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
            </svg>
          </div>
        </div>
        <div className="stat-card-value">1,245</div>
        <div className="stat-card-badge">
          ↑ 12% <span>vs last week</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-card-label">Shelter Occupancy</span>
          <div className="stat-card-icon">
            <svg viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </div>
        </div>
        <div className="stat-card-value">8,432</div>
        <div className="capacity-bar-wrap">
          <div className="capacity-bar-labels">
            <span>85% Capacity</span>
            <span>1,568 spots left</span>
          </div>
          <div className="capacity-bar">
            <div className="capacity-bar-fill" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
