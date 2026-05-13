import React, { useState } from "react";
import { useLanguage } from "./LanguageContext";
import { t } from "./translation";
import {
  buildServiceStatus,
  formatServiceAddress,
} from "../../../utils/helper";
import ServiceFilterTabs from "./ServiceFilterTabs";
const LocationList = ({ selectedId, onSelect, requests = [] }) => {
  const { language } = useLanguage();
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("distance");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const locations = requests.map((entry) => {
    const service = entry;
    const serviceStatus = buildServiceStatus(service);
    const title = service.title || "";
    return {
      id: service._id,
      name: service.address.building,
      type: title || "Service",
      title,
      status: serviceStatus,
      iconBg: service.title == "shelter" ? "#5cf6dc" : "#f8ecb2",
      src:
        service.title == "shelter"
          ? "../../assets/shelters.png"
          : "../../assets/hospital.png",
      tags: (service.facilities || []).map((facility) => ({ label: facility })),
      requirements: service.requirements,
      address: formatServiceAddress(service.address),
      availability: service.availability,
      capacity: service.capacity,
      contains: service.capacity - service.availability,
    };
  });

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredBySearch = normalizedSearch
    ? locations.filter((loc) =>
        loc.name.toLowerCase().startsWith(normalizedSearch),
      )
    : locations;
  const filteredLocations =
    activeFilter === "all"
      ? filteredBySearch
      : filteredBySearch.filter((loc) => {
          const titleLower = loc.title.toLowerCase();
          if (activeFilter === "shelter") {
            return titleLower === "shelter";
          }
          if (activeFilter === "medical") {
            return titleLower === "medical" || titleLower === "hospital";
          }
          return true;
        });

  return (
    <div className="map-left-panel">
      <div className="map-left-panel-header">
        <div className="map-search-wrap">
          <div className="map-search-box">
            <svg viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            <input
              type="text"
              placeholder="Search your requests..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </div>
        <div style={{ margin: "0px 5px" }}>
          <ServiceFilterTabs
            activeFilter={activeFilter}
            onChange={setActiveFilter}
          />
        </div>
        <div className="map-results-header">
          <span>Showing {filteredLocations.length} services</span>
          <div className="map-sort-dropdown">
            {sortOpen && (
              <div className="map-sort-menu">
                <button
                  onClick={() => {
                    setSortBy("date");
                    setSortOpen(false);
                  }}
                  className={sortBy === "date" ? "active" : ""}
                >
                  Recent
                </button>
                <button
                  onClick={() => {
                    setSortBy("priority");
                    setSortOpen(false);
                  }}
                  className={sortBy === "priority" ? "active" : ""}
                >
                  Priority
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="map-left-panel-list">
        {filteredLocations.length === 0 ? (
          <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
            <p>No matching services found</p>
          </div>
        ) : (
          filteredLocations.map((loc) => (
            <div
              key={loc.id}
              className={`location-card ${selectedId === loc.id ? "selected" : ""}`}
              onClick={() => onSelect(loc.id)}
            >
              <div className="location-card-header">
                <div className="location-card-title-row">
                  <div
                    className="location-type-icon"
                    style={{ background: loc.iconBg }}
                  >
                    <img
                      src={loc.src}
                      alt="logo"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </div>
                  <div>
                    <p className="location-card-name">{loc.name}</p>
                    <p className="location-card-type">{loc.type}</p>
                  </div>
                </div>
                <span className={`status-badge ${loc.status.className}`}>
                  {loc.status.label}
                </span>
              </div>

              {/* <div className="location-distance">
              <svg viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              </svg>
              Capacity: {loc.contains}/{loc.capacity}
            </div> */}
              {loc.tags.length > 0 && (
                <div className="location-tags">
                  {loc.tags.map((tag) => (
                    <div key={tag.label} className="location-tag">
                      <svg viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                      </svg>
                      {tag.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LocationList;
