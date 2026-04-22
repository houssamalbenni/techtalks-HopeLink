import { useState, useEffect } from 'react';
import './RefugeeDashboard.css';
import { LanguageProvider, useLanguage } from './LanguageContext';
import MapSidebar from './MapSidebar';
import MapTopBar from './MapTopBar';
import LocationList from './LocationList';
import MapView from './MapView';
import DetailPanel from './DetailPanel';
import { getMyRequests } from '../../services/refugeeService';

const RefugeeDashboardContent = () => {
  const { language } = useLanguage();
  const [selectedId, setSelectedId] = useState(1);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const data = await getMyRequests();
        setRequests(data || []);
        if (data && data.length > 0) {
          setSelectedId(data[0]._id);
        }
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch requests:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="map-page" lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="map-page" lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <p style={{ color: 'red' }}>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="map-page" lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <MapSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <MapTopBar />
        <div className="map-content">
          <LocationList selectedId={selectedId} onSelect={setSelectedId} requests={requests} />
          <MapView selectedId={selectedId} onSelect={setSelectedId} requests={requests} />
          <DetailPanel selectedId={selectedId} requests={requests} />
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
