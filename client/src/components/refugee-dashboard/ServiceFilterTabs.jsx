import React from "react";

const ServiceFilterTabs = ({ activeFilter, onChange }) => {
  const options = [
    { value: "all", label: "All Services" },
    { value: "shelter", label: "Shelter" },
    { value: "medical", label: "hospital" },
  ];

  return (
    <div className="map-filter-tabs">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`map-filter-tab ${
            activeFilter === option.value ? "active" : ""
          }`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ServiceFilterTabs;
