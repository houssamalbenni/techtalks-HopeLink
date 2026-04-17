import { useMemo } from 'react';

const MapTracker = ({ batches, statusFilter, onStatusFilterChange }) => {
  const visibleBatches = useMemo(() => {
    const sourceBatches = batches || [];

    if (statusFilter === 'all') {
      return sourceBatches;
    }

    return sourceBatches.filter((batch) => batch.statusValue === statusFilter);
  }, [batches, statusFilter]);

  const highlightedBatch = visibleBatches[0] || null;

  return (
    <div className="aid-map-card">
      <div className="aid-map-topbar">
        <div className="aid-map-search">
          <svg viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input type="text" placeholder="Search sectors..." />
        </div>
        <div className="aid-map-sort">
          <select
            className="aid-map-sort-select"
            value={statusFilter}
            onChange={(event) => onStatusFilterChange(event.target.value)}
            aria-label="Sort aid batches"
          >
            <option value="all">Sort by All Statuses</option>
            <option value="in-transit">Sort by In Transit</option>
            <option value="delivered">Sort by Delivered</option>
            <option value="pending">Sort by Pending</option>
          </select>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5z" /></svg>
        </div>
        <div className="aid-map-expand">
          <svg viewBox="0 0 24 24">
            <path d="M21 11V3h-8l3.29 3.29-10 10L3 13v8h8l-3.29-3.29 10-10z" />
          </svg>
        </div>
      </div>

      <div className="aid-map-body">
        <div className="aid-map-grid-bg" />
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.3 }} viewBox="0 0 600 220" preserveAspectRatio="none">
          <line x1="0" y1="80" x2="600" y2="80" stroke="#b0bec5" strokeWidth="6" />
          <line x1="0" y1="140" x2="600" y2="140" stroke="#b0bec5" strokeWidth="10" />
          <line x1="120" y1="0" x2="120" y2="220" stroke="#b0bec5" strokeWidth="6" />
          <line x1="300" y1="0" x2="300" y2="220" stroke="#b0bec5" strokeWidth="10" />
          <line x1="480" y1="0" x2="480" y2="220" stroke="#b0bec5" strokeWidth="6" />
          <rect x="140" y="90" width="100" height="40" fill="#c8d0d8" rx="3" />
          <rect x="320" y="50" width="80" height="30" fill="#c8d0d8" rx="3" />
          <rect x="50" y="100" width="60" height="30" fill="#c8d0d8" rx="3" />
        </svg>

        {highlightedBatch ? (
          <>
            <div className="aid-map-pin" style={{ top: highlightedBatch.mapTop, left: highlightedBatch.mapLeft }}>
              <div className={`aid-map-pin-icon aid-map-pin-icon-${highlightedBatch.statusValue}`}>
                <svg viewBox="0 0 24 24">
                  <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z" />
                </svg>
              </div>
            </div>

            <div className="aid-map-tooltip">
              <div className={`aid-map-tooltip-icon aid-map-tooltip-icon-${highlightedBatch.statusValue}`}>
                <svg viewBox="0 0 24 24">
                  <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z" />
                </svg>
              </div>
              <div>
                <p className="aid-map-tooltip-id">{highlightedBatch.id}</p>
                <p className="aid-map-tooltip-sub">{highlightedBatch.category} {highlightedBatch.weight}</p>
              </div>
            </div>

            <p className="aid-map-count">{visibleBatches.length} batch(es) shown</p>
          </>
        ) : (
          <p className="aid-map-empty">No batches match this status.</p>
        )}
      </div>
    </div>
  );
};

export default MapTracker;
