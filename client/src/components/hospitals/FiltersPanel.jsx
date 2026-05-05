import FilterSelect from "./FilterSelect";

export default function FiltersPanel({
  filterOptions,
  tags,
  searchQuery,
  onSearchChange,
  statusValue,
  onStatusChange,
  cityValue,
  onCityChange,
  specialtyValue,
  onSpecialtyChange,
  onRemoveTag,
  onClearAll,
  onMoreFilters,
}) {
  return (
    <section className="hospitals-filters">
      <div className="hospitals-filter-row">
        <label className="hospitals-search" htmlFor="hospital-search">
          <i className="fa-solid fa-search" />
          <input
            id="hospital-search"
            type="text"
            placeholder="Search hospitals by name or ID..."
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
          />
          <span>Ctrl K</span>
        </label>

        <div className="hospitals-selects">
          <FilterSelect
            placeholder="Status"
            options={filterOptions.status}
            value={statusValue}
            onChange={(event) => onStatusChange(event.target.value)}
          />
          <FilterSelect
            placeholder="City"
            options={filterOptions.city}
            value={cityValue}
            onChange={(event) => onCityChange(event.target.value)}
          />
          <FilterSelect
            placeholder="Specialties"
            options={filterOptions.specialty}
            value={specialtyValue}
            onChange={(event) => onSpecialtyChange(event.target.value)}
          />
          <button type="button" className="hospitals-filter-btn" onClick={onMoreFilters}>
            <i className="fa-solid fa-sliders" /> More Filters
          </button>
        </div>
      </div>

      <div className="hospitals-tags">
        {tags.map((tag) => (
          <span key={tag.label} className={tag.primary ? "primary-tag" : ""}>
            {tag.label}
            <button
              type="button"
              aria-label={`Remove ${tag.label} filter`}
              onClick={() => onRemoveTag(tag.key)}
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </span>
        ))}

        <button type="button" className="hospitals-clear-btn" onClick={onClearAll}>
          Clear All
        </button>
      </div>
    </section>
  );
}
