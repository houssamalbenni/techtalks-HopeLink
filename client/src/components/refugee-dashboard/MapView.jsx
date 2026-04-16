import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLanguage } from './LanguageContext';
import { t } from './translations';

// Lebanon coordinates
const LEBANON_CENTER = [33.8547, 35.8623];

// Lebanon bounds - restricts map to show only Lebanon area
const LEBANON_BOUNDS = [
  [32.3567, 35.1027],  // Southwest corner
  [34.6564, 36.6389],  // Northeast corner
];

// Lebanon locations with coordinates
const locations = [
  {
    id: 1,
    name: 'SafeHaven Central',
    type: 'Emergency Shelter',
    coords: [33.8742, 35.4906], // Beirut area
    color: '#8b5cf6',
  },
  {
    id: 2,
    name: 'City General Clinic',
    type: 'Medical Care',
    coords: [33.7920, 35.4858], // South Beirut
    color: '#3b82f6',
  },
  {
    id: 3,
    name: 'Community Kitchen #4',
    type: 'Food Distribution',
    coords: [34.4411, 35.9544], // Tripoli area
    color: '#f97316',
  },
];

// Create custom marker icons
const createCustomMarker = (color) => {
  return L.divIcon({
    html: `<div style="background: ${color}; width: 24px; height: 24px; border-radius: 50%; box-shadow: 0 0 10px ${color}; border: 3px solid #0d1117;" />`,
    iconSize: [24, 24],
    className: 'custom-marker',
  });
};

const MapView = ({ selectedId, onSelect }) => {
  const { language } = useLanguage();

  // Translate location names based on language
  const getLocationName = (nameEn, typeEn) => {
    if (language === 'ar') {
      const translations = {
        'SafeHaven Central': 'مركز الملاذ الآمن',
        'Emergency Shelter': 'مأوى طارئ',
        'City General Clinic': 'عيادة المدينة العامة',
        'Medical Care': 'الرعاية الطبية',
        'Community Kitchen #4': 'مطبخ المجتمع #4',
        'Food Distribution': 'توزيع الغذاء',
      };
      return [translations[nameEn] || nameEn, translations[typeEn] || typeEn];
    }
    return [nameEn, typeEn];
  };

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

        {/* Markers for locations */}
        {locations.map((location) => {
          const [translatedName] = getLocationName(location.name, location.type);
          return (
            <Marker
              key={location.id}
              position={location.coords}
              icon={createCustomMarker(location.color)}
              eventHandlers={{
                click: () => onSelect(location.id),
              }}
            >
              <Popup>{translatedName}</Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Legend */}
      <div className="map-legend">
        <p className="map-legend-title">{language === 'en' ? 'Legend' : 'مفتاح الخريطة'}</p>
        <div className="map-legend-item">
          <div className="map-legend-dot" style={{ background: '#8b5cf6' }} />
          {t(language, 'filters.shelter')}
        </div>
        <div className="map-legend-item">
          <div className="map-legend-dot" style={{ background: '#3b82f6' }} />
          {t(language, 'filters.medical')}
        </div>
        <div className="map-legend-item">
          <div className="map-legend-dot" style={{ background: '#f97316' }} />
          {t(language, 'filters.foodWater')}
        </div>
      </div>
    </div>
  );
};

export default MapView;
