const Skeleton = () => {
  return (
    <div className="fr-case-card fr-case-skeleton">
      <div className="fr-case-card-header">
        <div className="fr-skeleton-line fr-skeleton-title" />
        <div className="fr-skeleton-pill" />
      </div>
      <div className="fr-skeleton-line fr-skeleton-sub" />
      <div className="fr-skeleton-line fr-skeleton-meta" />
    </div>
  );
};

export default Skeleton;
