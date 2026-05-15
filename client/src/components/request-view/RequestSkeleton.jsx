const RequestSkeleton = () => {
  return (
    <div className="rv-card rv-skeleton">
      <div className="rv-card-top">
        <div className="rv-card-media">
          <div className="rv-skeleton-block rv-skeleton-avatar"></div>
        </div>
        <div className="rv-card-title">
          <div className="rv-skeleton-line"></div>
          <div className="rv-skeleton-line short"></div>
        </div>
        <div className="rv-badges">
          <div className="rv-skeleton-pill"></div>
          <div className="rv-skeleton-pill"></div>
        </div>
      </div>
      <div className="rv-skeleton-line"></div>
      <div className="rv-skeleton-line"></div>
      <div className="rv-meta">
        <div className="rv-skeleton-line short"></div>
        <div className="rv-skeleton-line short"></div>
        <div className="rv-skeleton-line short"></div>
        <div className="rv-skeleton-line short"></div>
      </div>
      <div className="rv-actions">
        <div className="rv-skeleton-button"></div>
      </div>
    </div>
  );
};

export default RequestSkeleton;
