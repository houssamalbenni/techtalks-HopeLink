export default function StatsGrid({ loading, shelterData }) {
  const availableCapacity = loading
    ? "..."
    : shelterData.reduce((sum, shelter) => {
      const parts = shelter.capacity.split("/");
      return sum + (parseInt(parts[1]) - parseInt(parts[0]));
    }, 0).toLocaleString();

  return (
    <div className="ad-stats-grid">
      <div className="ad-stat-card">
        <div className="ad-stat-icon" style={{ backgroundColor: "#dbeafe" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 12l2 3 4-5 4 5 4-5 4 5" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <div className="ad-stat-content">
          <div className="ad-stat-value">{loading ? "..." : shelterData.length}</div>
          <div className="ad-stat-label">Total Services</div>
        </div>
      </div>
      <div className="ad-stat-card">
        <div className="ad-stat-icon" style={{ backgroundColor: "#ddd6fe" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 12l2 3 4-5 4 5 4-5 4 5" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <div className="ad-stat-content">
          <div className="ad-stat-value">{availableCapacity}</div>
          <div className="ad-stat-label">Available Capacity</div>
        </div>
      </div>
    </div>
  );
}
