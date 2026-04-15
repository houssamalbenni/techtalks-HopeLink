export default function SearchToolbar({
  search,
  onSearchChange,
  selected,
  onBulkActivate,
  onBulkDeactivate,
  onBulkDelete,
}) {
  return (
    <div className="toolbar">
      {/* Search */}
      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          placeholder="Search shelters…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Selection badge */}
      {selected.size > 0 && (
        <span className="selection-badge">{selected.size} selected</span>
      )}

      {/* Bulk actions */}
      <div className="toolbar-right">
        {selected.size > 0 && (
          <>
            <button className="btn-action activate" onClick={onBulkActivate}>
              ✅ Activate
            </button>
            <button
              className="btn-action deactivate"
              onClick={onBulkDeactivate}
            >
              ⏸ Deactivate
            </button>
            <button className="btn-action delete" onClick={onBulkDelete}>
              🗑 Delete
            </button>
          </>
        )}
        <button className="btn-filter">Status ▾</button>
        <button className="btn-filter">City ▾</button>
        <button className="btn-filter">Capacity ▾</button>
      </div>
    </div>
  );
}
