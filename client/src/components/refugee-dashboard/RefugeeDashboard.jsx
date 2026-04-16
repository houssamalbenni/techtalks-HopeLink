import { useState } from 'react';
import './RefugeeDashboard.css';
import { LanguageProvider, useLanguage } from './LanguageContext';
import MapSidebar from './MapSidebar';
import MapTopBar from './MapTopBar';
import LocationList from './LocationList';
import MapView from './MapView';
import DetailPanel from './DetailPanel';

const RefugeeDashboardContent = () => {
  const { language } = useLanguage();
  const [selectedId, setSelectedId] = useState(1);

  return (
    <div className="map-page" lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <MapSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <MapTopBar />
        <div className="map-content">
          <LocationList selectedId={selectedId} onSelect={setSelectedId} />
          <MapView selectedId={selectedId} onSelect={setSelectedId} />
          <DetailPanel selectedId={selectedId} />
        </div>
      </div>
    </div>
  );
};

const RefugeeDashboard = () => {
  return (
    <LanguageProvider>
      <RefugeeDashboardContent />
    </LanguageProvider>
  );
};

export default RefugeeDashboard;
