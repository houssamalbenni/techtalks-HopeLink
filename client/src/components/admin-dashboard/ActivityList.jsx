export default function ActivityList({ recentActivity }) {
  return (
    <div className="ad-card">
      <div className="ad-card-header">
        <h2>Recent Activity</h2>
        <button className="ad-more-btn">...</button>
      </div>
      <div className="ad-activity-list">
        {recentActivity.length === 0 ? (
          <div style={{ textAlign: "center", padding: "20px", color: "#9ca3af" }}>No recent activity</div>
        ) : (
          recentActivity.map((activity) => (
            <div key={activity.id} className="ad-activity-item">
              <div className="ad-activity-icon">{activity.icon}</div>
              <div className="ad-activity-content">
                <div className="ad-activity-title">{activity.title}</div>
                <div className="ad-activity-desc">{activity.description}</div>
              </div>
              <div className="ad-activity-time">{activity.time}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
