import FilterSelect from "./FilterSelect";

export default function FiltersPanel({ filterOptions, tags }) {
  return (
    <section className="hospitals-filters">
      <div className="hospitals-filter-row">
        <label className="hospitals-search" htmlFor="hospital-search">
          <i className="fa-solid fa-search" />
          <input id="hospital-search" type="text" placeholder="Search hospitals by name or ID..." />
          <span>Ctrl K</span>
        </label>

        <div className="hospitals-selects">
          <FilterSelect placeholder="Status" options={filterOptions.status} />
          <FilterSelect placeholder="City" options={filterOptions.city} />
          <FilterSelect placeholder="Specialties" options={filterOptions.specialty} />
          <button type="button" className="hospitals-filter-btn">
            <i className="fa-solid fa-sliders" /> More Filters
          </button>
        </div>
      </div>

      <div className="hospitals-tags">
        {tags.map((tag) => (
          <span key={tag.label} className={tag.primary ? "primary-tag" : ""}>
            {tag.label}
            <button type="button" aria-label={`Remove ${tag.label} filter`}>
              <i className="fa-solid fa-xmark" />
            </button>
          </span>
        ))}

        <button type="button" className="hospitals-clear-btn">
          Clear All
        </button>
      </div>
    </section>
  );
}
