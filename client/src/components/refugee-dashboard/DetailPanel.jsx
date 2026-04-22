import { useLanguage } from './LanguageContext';

const DetailPanel = ({ selectedId, requests = [] }) => {
  const { language } = useLanguage();

  // Find the request by ID
  const request = requests.find(req => req._id === selectedId);

  if (!request || !request.service) {
    return (
      <div className="map-detail-panel">
        <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
          <p>Select a request to view details</p>
        </div>
      </div>
    );
  }

  const service = request.service;
  const statusColors = {
    pending: '#f97316',
    approved: '#22c55e',
    completed: '#3b82f6'
  };

  return (
    <div className="map-detail-panel">
      <div className="detail-image-wrap">
        <div className="detail-image-placeholder">
          <svg viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </div>
        <span className="detail-shelter-badge" style={{ background: statusColors[request.status] || '#8b5cf6' }}>
          {request.status?.toUpperCase() || 'PENDING'}
        </span>
        <div className="detail-nav-btn">
          <svg viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          </svg>
        </div>
      </div>

      <div className="detail-body">
        <h2 className="detail-name">{service.name}</h2>

        <div className="detail-action-btns">
          <button className="detail-reserve-btn">
            <svg viewBox="0 0 24 24">
              <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
            </svg>
            View Timeline
          </button>
          <button className="detail-contact-btn">
            <svg viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            Contact Support
          </button>
        </div>

        <div className="detail-divider" />

        <p className="detail-section-label">Request Details</p>

        <div className="detail-info-item">
          <div className="detail-info-icon">
            <svg viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
            </svg>
          </div>
          <div>
            <p className="detail-info-label">Type</p>
            <p className="detail-info-value">{service.type || 'Service Request'}</p>
          </div>
        </div>

        <div className="detail-info-item">
          <div className="detail-info-icon">
            <svg viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
          </div>
          <div>
            <p className="detail-info-label">Priority Level</p>
            <p className="detail-info-value">{request.priority?.charAt(0).toUpperCase() + request.priority?.slice(1) || 'Standard'}</p>
          </div>
        </div>

        <div className="detail-info-item">
          <div className="detail-info-icon">
            <svg viewBox="0 0 24 24">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
            </svg>
          </div>
          <div>
            <p className="detail-info-label">Status</p>
            <p className="detail-info-value" style={{ color: statusColors[request.status] }}>
              {request.status?.toUpperCase() || 'PENDING'}
            </p>
          </div>
        </div>

        {request.description && (
          <>
            <div className="detail-divider" />
            <p className="detail-section-label">Description</p>
            <p className="detail-info-value" style={{ lineHeight: '1.5' }}>
              {request.description}
            </p>
          </>
        )}

        <div className="detail-divider" />
        <p style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>
          Created: {new Date(request.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default DetailPanel;
        <div className="detail-nav-btn">
          <svg viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          </svg>
        </div>
      </div>

      <div className="detail-body">
        <h2 className="detail-name">{location.name}</h2>

        {location.capacity && (
          <>
            <p className="detail-section-label">{t(language, 'detailPanel.currentCapacity')}</p>
            <div className="detail-capacity-row">
              <span></span>
              <span className="detail-capacity-status">{location.capacityStatus}</span>
            </div>
            <div style={{ marginBottom: '8px' }}>
              <span className="detail-capacity-number">{location.capacity.split('/')[0]}</span>
              <span className="detail-capacity-total"> / {location.capacity.split('/')[1]} beds available</span>
            </div>
            <div className="detail-capacity-bar">
              <div className="detail-capacity-fill" style={{ width: `${location.capacityPercent}%` }} />
            </div>
            <p className="detail-updated">Last updated: 10 mins ago</p>
          </>
        )}

        <div className="detail-action-btns">
          <button className="detail-reserve-btn">
            <svg viewBox="0 0 24 24">
              <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
            </svg>
            {t(language, 'detailPanel.reserve')}
          </button>
          <button className="detail-contact-btn">
            <svg viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            {t(language, 'detailPanel.contact')}
          </button>
        </div>

        <div className="detail-divider" />

        <p className="detail-section-label">{t(language, 'detailPanel.information')}</p>

        <div className="detail-info-item">
          <div className="detail-info-icon">
            <svg viewBox="0 0 24 24">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
            </svg>
          </div>
          <div>
            <p className="detail-info-label">{t(language, 'detailPanel.intakeHours')}</p>
            <p className="detail-info-value">{location.intakeHours}</p>
          </div>
        </div>

        <div className="detail-info-item">
          <div className="detail-info-icon">
            <svg viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
          <div>
            <p className="detail-info-label">{t(language, 'detailPanel.addressLabel')}</p>
            <p className="detail-info-value">{location.address}</p>
          </div>
        </div>

        <div className="detail-info-item">
          <div className="detail-info-icon">
            <svg viewBox="0 0 24 24">
              <path d="M14 6l-1-2H5v17h2v-7h5l1 2h7V6h-6zm4 8h-4l-1-2H7V6h5l1 2h5v6z" />
            </svg>
          </div>
          <div>
            <p className="detail-info-label">{t(language, 'detailPanel.requirementsLabel')}</p>
            <p className="detail-info-value">{location.requirements}</p>
          </div>
        </div>

        <div className="detail-divider" />

        <p className="detail-facilities-title">{t(language, 'detailPanel.facilities')}</p>
        <div className="detail-facilities-grid">
          {location.facilities.map((facility) => (
            <div key={facility} className="detail-facility-tag">
              <svg viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
              </svg>
              {facility}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailPanel;
