import { formatDonation } from "../../../utils/helper";
export default function StatsGrid({
  loading,
  shelterData,
  refugeeCount,
  totalDonation,
}) {
  const availableCapacity = loading
    ? "..."
    : shelterData
        .reduce((sum, shelter) => {
          const parts = shelter.capacity.split("/");
          return sum + (parseInt(parts[1]) - parseInt(parts[0]));
        }, 0)
        .toLocaleString();

  return (
    <div className="ad-stats-grid">
      <div className="ad-stat-card">
        <div className="ad-stat-icon" style={{ backgroundColor: "#d1fae5" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 10l8-6 8 6v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 20v-6h6v6"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="ad-stat-content">
          <div className="ad-stat-value">
            {loading ? "..." : shelterData.length}
          </div>
          <div className="ad-stat-label">Total Services</div>
        </div>
      </div>
      <div className="ad-stat-card">
        <div className="ad-stat-icon" style={{ backgroundColor: "#ede9fe" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 10h16M6 6h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"
              stroke="#8b5cf6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 10v8M17 10v8"
              stroke="#8b5cf6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="ad-stat-content">
          <div className="ad-stat-value">{availableCapacity}</div>
          <div className="ad-stat-label">Available Capacity</div>
        </div>
      </div>
      <div className="ad-stat-card">
        <div className="ad-stat-icon" style={{ backgroundColor: "#dbeafe" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M16 11a4 4 0 1 0-8 0"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 20c1.5-3 4-5 8-5s6.5 2 8 5"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="ad-stat-content">
          <div className="ad-stat-value">{loading ? "..." : refugeeCount}</div>
          <div className="ad-stat-label">Refugee Number</div>
        </div>
      </div>
      <div className="ad-stat-card">
        <div className="ad-stat-icon" style={{ backgroundColor: "#fef3c7" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="#f59e0b" strokeWidth="2" />
            <path
              d="M8.5 9.5c0-1.4 1.2-2.5 3.5-2.5 1.7 0 3 .7 3 2"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 7v10"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.5 14.5c0 1.5 1.2 2.5 3.5 2.5 2.1 0 3.5-.9 3.5-2.5"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="ad-stat-content">
          <div className="ad-stat-value donation">
            {loading ? "..." : formatDonation(totalDonation)}
          </div>
          <div className="ad-stat-label">Total donation</div>
        </div>
      </div>
    </div>
  );
}
