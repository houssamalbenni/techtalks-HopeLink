export default function RequestFilters({ filters, onSelect }) {
  return (
    <div className="portal-filters">
      {filters.map((filter) => (
        <button
          key={filter.id}
          type="button"
          className={`portal-filter ${filter.active ? "active" : ""} ${filter.tone}`}
          onClick={() => onSelect?.(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
