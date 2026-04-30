import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { t } from './translations';
import { buildServiceStatus, formatServiceAddress } from '../../services/serviceService';

const LocationList = ({ selectedId, onSelect, requests = [] }) => {
  const { language } = useLanguage();
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState('distance');
  const [activeFilter, setActiveFilter] = useState('all');

  const locations = requests.map((entry) => {
    const service = entry.service || entry;
    const request = entry.request || null;
    const serviceStatus = buildServiceStatus(service);
    const requestStatus = request?.status === 'approved'
      ? 'APPROVED'
      : request?.status === 'pending'
        ? 'PENDING'
        : request?.status === 'completed'
          ? 'COMPLETED'
          : serviceStatus.label;

    return {
      id: service._id,
      name: service.title || service.name || 'Unknown Service',
      type: service.title || service.type || 'Service',
      distance: service.location?.distance || 'N/A',
      status: requestStatus,
      statusClass: request?.status === 'approved'
        ? 'status-open'
        : request?.status === 'pending'
          ? 'status-limited'
          : serviceStatus.className,
      iconBg: '#8b5cf6',
      tags: (service.facilities || []).map((facility) => ({ label: facility })),
      priority: request?.priority || serviceStatus.label,
      description: request?.description || service.requirements,
      address: formatServiceAddress(service.address),
      availability: service.availability,
      capacity: service.capacity,
      request,
      service,
    };
  });

  return (
    <div className="map-left-panel">
      <div className="map-search-wrap">
        <div className="map-search-box">
          <svg viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input type="text" placeholder="Search your requests..." />
        </div>
      </div>

      <div className="map-results-header">
        <span>Showing {locations.length} requests</span>
        <div className="map-sort-dropdown">
          <button className="map-sort-btn" onClick={() => setSortOpen(!sortOpen)}>
            {sortBy === 'date' ? 'Recent' : 'Priority'}
            <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z" /></svg>
          </button>
          {sortOpen && (
            <div className="map-sort-menu">
              <button onClick={() => { setSortBy('date'); setSortOpen(false); }} className={sortBy === 'date' ? 'active' : ''}>
                Recent
              </button>
              <button onClick={() => { setSortBy('priority'); setSortOpen(false); }} className={sortBy === 'priority' ? 'active' : ''}>
                Priority
              </button>
            </div>
          )}
        </div>
      </div>

      {locations.length === 0 ? (
        <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
          <p>No matching services found</p>
        </div>
      ) : (
        locations.map((loc) => (
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
              Availability: {loc.availability}/{loc.capacity}
            </div>

            {loc.description && (
              <p className="location-next" style={{ fontSize: '12px', marginTop: '8px' }}>
                {loc.description.substring(0, 60)}...
              </p>
            )}

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
  );
};

export default LocationList;
