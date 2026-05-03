import './Sider.css'
const SkeletonNotificationCard = () => {
  return (
    <div className="notification-card skeleton-card">
      <div className="card-icon-container">
        <div className="skeleton-icon shimmer"></div>
      </div>
      <div className="card-content">
        <div className="card-header">
          <div className="skeleton-tag shimmer"></div>
          <div className="skeleton-time shimmer"></div>
        </div>
        <div className="skeleton-title shimmer"></div>
        <div className="skeleton-desc shimmer"></div>
        <div className="skeleton-desc shimmer short"></div>
      </div>
    </div>
  );
};
export default SkeletonNotificationCard