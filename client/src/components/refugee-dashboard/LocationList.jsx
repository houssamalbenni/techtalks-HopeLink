import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { t } from './translations';

const locations = [
  {
    id: 1,
    name: 'SafeHaven Central',
    type: 'Emergency Shelter',
    distance: '2.1 km away',
    status: 'LIMITED',
    statusClass: 'status-limited',
    iconBg: '#8b5cf6',
    capacity: 24,
    capacityText: '12/50 beds available',
    capacityColor: '#f97316',
    tags: [
      { label: 'Accessible' },
      { label: 'Family' },
    ],
  },
  {
    id: 2,
    name: 'City General Clinic',
    type: 'Medical Care',
    distance: '3.8 km away',
    status: 'OPEN',
    statusClass: 'status-open',
    iconBg: '#3b82f6',
    capacity: null,
    tags: [
      { label: '24/7' },
      { label: 'Trauma' },
    ],
  },
  {
    id: 3,
    name: 'Community Kitchen #4',
    type: 'Food Distribution',
    distance: '85 km away',
    status: 'FULL',
    statusClass: 'status-full',
    iconBg: '#f97316',
    capacity: null,
    next: 'Next distribution: Tomorrow 08:00 AM',
    tags: [],
  },
];

const LocationList = ({ selectedId, onSelect }) => {
  const { language } = useLanguage();
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState('distance');
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="map-left-panel">
      <div className="map-search-wrap">
        <div className="map-search-box">
          <svg viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input type="text" placeholder="Search shelters, hospitals..." />
        </div>
      </div>

      <div className="map-filter-tabs">
        <button className={`map-filter-tab ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>
          <svg viewBox="0 0 24 24" className="map-filter-icon">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          {t(language, 'filters.all')}
        </button>
        <button className={`map-filter-tab ${activeFilter === 'shelter' ? 'active' : ''}`} onClick={() => setActiveFilter('shelter')}>
          <svg viewBox="0 0 24 24" className="map-filter-icon">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          {t(language, 'filters.shelter')}
        </button>
        <button className={`map-filter-tab ${activeFilter === 'medical' ? 'active' : ''}`} onClick={() => setActiveFilter('medical')}>
          <svg viewBox="0 0 24 24" className="map-filter-icon">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 9.5h-3.5V16h-2v-3.5H5v-2h3.5V7h2v3.5H14v2z" />
          </svg>
          {t(language, 'filters.medical')}
        </button>
        <button className={`map-filter-tab ${activeFilter === 'food' ? 'active' : ''}`} onClick={() => setActiveFilter('food')}>
          <svg viewBox="0 0 24 24" className="map-filter-icon">
            <path d="M11 9H9V2H7v7H5V2H3v7c0 2.55 1.92 4.63 4.39 4.94.63 1.91 1.68 3.98 2.61 5.56 1.06-1.86 2.12-4.05 2.75-6.02 2.22.18 4 1.69 4 3.52 0 2.02-1.46 3.75-3.44 3.95.41.75.72 1.6.88 2.48 1.79-.66 3.06-2.34 3.06-4.34 0-2.55-2.05-4.71-4.57-4.82 0 0-1.25-2.53-2.75-6.28z" />
          </svg>
          {t(language, 'filters.foodWater')}
        </button>
        <button className={`map-filter-tab ${activeFilter === 'legal' ? 'active' : ''}`} onClick={() => setActiveFilter('legal')}>
          <svg viewBox="0 0 24 24" className="map-filter-icon">
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zm-5.04-6.71l-2.75 3.54 1.3 1.54 1.45-1.84 3.15 3.84L23 8.07z" />
          </svg>
          {t(language, 'filters.legal')}
        </button>
      </div>

      <div className="map-results-header">
        <span>Showing 24 results</span>
        <div className="map-sort-dropdown">
          <button className="map-sort-btn" onClick={() => setSortOpen(!sortOpen)}>
            {sortBy === 'distance' ? t(language, 'sort.distance') : t(language, 'sort.availability')}
            <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z" /></svg>
          </button>
          {sortOpen && (
            <div className="map-sort-menu">
              <button onClick={() => { setSortBy('distance'); setSortOpen(false); }} className={sortBy === 'distance' ? 'active' : ''}>
                {t(language, 'sort.distance')}
              </button>
              <button onClick={() => { setSortBy('availability'); setSortOpen(false); }} className={sortBy === 'availability' ? 'active' : ''}>
                {t(language, 'sort.availability')}
              </button>
            </div>
          )}
        </div>
      </div>

      {locations.map((loc) => (
        <div
          key={loc.id}
          className={`location-card ${selectedId === loc.id ? 'selected' : ''}`}
          onClick={() => onSelect(loc.id)}
        >
          <div className="location-card-header">
            <div className="location-card-title-row">
              <div className="location-type-icon" style={{ background: loc.iconBg }}>
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                </svg>
              </div>
              <div>
                <p className="location-card-name">{loc.name}</p>
                <p className="location-card-type">{loc.type}</p>
              </div>
            </div>
            <span className={`status-badge ${loc.statusClass}`}>{loc.status}</span>
          </div>

          <div className="location-distance">
            <svg viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            </svg>
            {loc.distance}
          </div>

          {loc.capacity && (
            <>
              <div className="location-capacity-bar">
                <div className="location-capacity-fill" style={{ width: `${loc.capacity}%`, background: loc.capacityColor }} />
              </div>
              <p className="location-capacity-text">{loc.capacityText}</p>
            </>
          )}

          {loc.next && <p className="location-next">{loc.next}</p>}

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
      ))}
    </div>
  );
};

export default LocationList;
