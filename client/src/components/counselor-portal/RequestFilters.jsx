export default function RequestFilters({ filters }) {
  return (
    <div className="portal-filters">
      {filters.map((filter) => (
        <button
          key={filter.id}
          type="button"
          className={`portal-filter ${filter.active ? "active" : ""} ${filter.tone}`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
