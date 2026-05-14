function ProfileSettingsSkeleton() {
  return (
    <div className="ps-skeleton-stack">
      <div className="ps-skeleton ps-skeleton-profile">
        <div className="ps-skeleton-avatar" />
        <div className="ps-skeleton-lines">
          <div className="ps-skeleton-line ps-skeleton-line-lg" />
          <div className="ps-skeleton-line ps-skeleton-line-md" />
        </div>
      </div>
      <div className="ps-divider" />
      <div className="ps-skeleton-section">
        <div className="ps-skeleton-line ps-skeleton-line-sm" />
        <div className="ps-skeleton-grid">
          <div className="ps-skeleton-block" />
          <div className="ps-skeleton-block" />
          <div className="ps-skeleton-block" />
          <div className="ps-skeleton-block" />
        </div>
      </div>
    </div>
  );
}

export default ProfileSettingsSkeleton;