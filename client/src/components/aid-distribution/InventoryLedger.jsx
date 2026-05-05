import { useMemo, useState } from 'react';

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'in-transit', label: 'In Transit' },
  { value: 'delivered', label: 'Delivered' },
];

const InventoryLedger = ({ batches, statusFilter, onStatusFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatch, setSelectedBatch] = useState(null);

  const filteredBatches = useMemo(() => {
    const sourceBatches = batches || [];
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return sourceBatches.filter((batch) => {
      const passesStatus = statusFilter === 'all' || batch.statusValue === statusFilter;
      if (!passesStatus) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const searchable = [
        batch.id,
        batch.category,
        batch.subcategory,
        batch.from,
        batch.to,
        batch.status,
      ]
        .join(' ')
        .toLowerCase();

      return searchable.includes(normalizedQuery);
    });
  }, [batches, searchQuery, statusFilter]);

  const getStatusClass = (statusValue) => {
    switch (statusValue) {
      case 'in-transit':
        return 'inv-status-transit';
      case 'delivered':
        return 'inv-status-delivered';
      case 'pending':
        return 'inv-status-pending';
      default:
        return '';
    }
  };

  return (
    <div className="inv-ledger-container">
      <div className="inv-ledger-header">
        <div>
          <h2 className="inv-ledger-title">Inventory Ledger & Batch Tracking</h2>
          <p className="inv-ledger-subtitle">{filteredBatches.length} visible batch(es)</p>
        </div>
        <div className="inv-ledger-controls">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`inv-filter-btn ${statusFilter === option.value ? 'active' : ''}`}
              onClick={() => onStatusFilterChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="inv-ledger-toolbar">
        <div className="inv-search-box">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28h.79L20 20.49L21.49 19L15.5 14zM9.5 14A4.5 4.5 0 1 1 14 9.5A4.5 4.5 0 0 1 9.5 14z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search batch ID, category, or route"
          />
        </div>
        {searchQuery && (
          <button type="button" className="inv-clear-search" onClick={() => setSearchQuery('')}>
            Clear
          </button>
        )}
      </div>

      <div className="inv-table-wrapper">
        <table className="inv-table">
          <thead>
            <tr>
              <th>Batch ID</th>
              <th>Category</th>
              <th>From to</th>
              <th>Weight</th>
              <th>ETA</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredBatches.length === 0 ? (
              <tr>
                <td className="inv-empty-state" colSpan="6">No batches match your filters.</td>
              </tr>
            ) : (
              filteredBatches.map((batch) => (
                <tr
                  key={batch.id}
                  className={selectedBatch?.id === batch.id ? 'inv-row-selected' : ''}
                  onClick={() => setSelectedBatch(batch)}
                >
                  <td className="inv-batch-id">
                    <span className="inv-truck-icon">TRK</span>
                    {batch.id}
                  </td>
                  <td>
                    <div className="inv-category">
                      <div className="inv-category-main">{batch.category}</div>
                      <div className="inv-category-sub">{batch.subcategory}</div>
                    </div>
                  </td>
                  <td>
                    <div className="inv-route">
                      <div className="inv-route-item">
                        <span className="inv-dot inv-from-dot" />
                        {batch.from}
                      </div>
                      <div className="inv-route-item">
                        <span className="inv-dot inv-to-dot" />
                        {batch.to}
                      </div>
                    </div>
                  </td>
                  <td>{batch.weight}</td>
                  <td>{batch.eta}</td>
                  <td>
                    <span className={`inv-status-badge ${getStatusClass(batch.statusValue)}`}>
                      {batch.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedBatch && (
        <>
          <button
            type="button"
            className="inv-drawer-backdrop"
            onClick={() => setSelectedBatch(null)}
            aria-label="Close batch details"
          />
          <aside className="inv-drawer" role="dialog" aria-modal="true" aria-label={`Batch details ${selectedBatch.id}`}>
            <div className="inv-drawer-header">
              <h3>Batch {selectedBatch.id}</h3>
              <button type="button" className="inv-drawer-close" onClick={() => setSelectedBatch(null)}>
                Close
              </button>
            </div>
            <div className="inv-drawer-body">
              <div className="inv-drawer-grid">
                <div>
                  <p className="inv-detail-label">Status</p>
                  <p className="inv-detail-value">{selectedBatch.status}</p>
                </div>
                <div>
                  <p className="inv-detail-label">Weight</p>
                  <p className="inv-detail-value">{selectedBatch.weight}</p>
                </div>
                <div>
                  <p className="inv-detail-label">Handler</p>
                  <p className="inv-detail-value">{selectedBatch.handler}</p>
                </div>
                <div>
                  <p className="inv-detail-label">Vehicle</p>
                  <p className="inv-detail-value">{selectedBatch.vehicle}</p>
                </div>
                <div>
                  <p className="inv-detail-label">Last Update</p>
                  <p className="inv-detail-value">{selectedBatch.lastUpdated}</p>
                </div>
                <div>
                  <p className="inv-detail-label">ETA</p>
                  <p className="inv-detail-value">{selectedBatch.eta}</p>
                </div>
              </div>

              <div className="inv-drawer-section">
                <h4>Route checkpoints</h4>
                <ul className="inv-checkpoint-list">
                  {selectedBatch.checkpoints.map((checkpoint) => (
                    <li key={checkpoint}>{checkpoint}</li>
                  ))}
                </ul>
              </div>

              <div className="inv-drawer-section">
                <h4>Notes</h4>
                <p className="inv-detail-note">{selectedBatch.notes}</p>
              </div>
            </div>
          </aside>
        </>
      )}
    </div>
  );
};

export default InventoryLedger;