import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLanguage } from './LanguageContext';
import { buildServiceStatus, formatServiceAddress } from '../../../services/serviceService';

// Lebanon coordinates
const LEBANON_CENTER = [33.8547, 35.8623];

// Lebanon bounds - restricts map to show only Lebanon area
const LEBANON_BOUNDS = [
  [32.3567, 35.1027],  // Southwest corner
  [34.6564, 36.6389],  // Northeast corner
];

// Create custom marker icons
const createCustomMarker = (color) => {
  return L.divIcon({
    html: `<div style="background: ${color}; width: 24px; height: 24px; border-radius: 50%; box-shadow: 0 0 10px ${color}; border: 3px solid #0d1117;" />`,
    iconSize: [24, 24],
    className: 'custom-marker',
  });
};

const MapView = ({ selectedId, onSelect, requests = [] }) => {
  const { language } = useLanguage();

  const markers = requests.map((entry, index) => {
    const service = entry.service || entry;
    const request = entry.request || null;
    const status = buildServiceStatus(service);
    const coordinates = service.location?.coordinates;
    const position = Array.isArray(coordinates) && coordinates.length === 2
      ? [coordinates[1], coordinates[0]]
      : [33.8742 + index * 0.01, 35.4906 + index * 0.01];

    return {
      id: service._id,
      name: service.title || service.name || 'Service',
      type: service.title || service.type || 'Service',
      coords: position,
      color: request?.status === 'approved'
        ? '#22c55e'
        : request?.status === 'pending'
          ? '#f97316'
          : status.className === 'status-full'
            ? '#ef4444'
            : '#3b82f6',
      status: request?.status || status.label.toLowerCase(),
      address: formatServiceAddress(service.address),
    };
  });

  return (
    <div className="map-area">
      <MapContainer
        center={LEBANON_CENTER}
        zoom={8}
        minZoom={7}
        maxZoom={13}
        scrollWheelZoom={true}
        maxBounds={LEBANON_BOUNDS}
        maxBoundsViscosity={1.0}
        style={{ height: '100%', width: '100%' }}
        className="leaflet-map"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
          opacity={0.7}
        />

        {/* Markers for requests */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.coords}
            icon={createCustomMarker(marker.color)}
            eventHandlers={{
              click: () => onSelect(marker.id),
            }}
          >
            <Popup>
              <div>
                <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>{marker.name}</p>
                <p style={{ margin: '0 0 5px 0', fontSize: '12px' }}>{marker.type}</p>
                  <p style={{ margin: '0', fontSize: '11px', color: '#666' }}>Status: {marker.status?.toUpperCase()}</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#666' }}>{marker.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="map-legend">
        <p className="map-legend-title">{language === 'en' ? 'Legend' : 'مفتاح الخريطة'}</p>
        <div className="map-legend-item">
          <div className="map-legend-dot" style={{ background: '#22c55e' }} />
          {language === 'en' ? 'Approved' : 'موافق عليه'}
        </div>
        <div className="map-legend-item">
          <div className="map-legend-dot" style={{ background: '#f97316' }} />
          {language === 'en' ? 'Pending' : 'قيد الانتظار'}
        </div>
        <div className="map-legend-item">
          <div className="map-legend-dot" style={{ background: '#3b82f6' }} />
          {language === 'en' ? 'Completed' : 'مكتمل'}
        </div>
      </div>
    </div>
  );
};

export default MapView;
