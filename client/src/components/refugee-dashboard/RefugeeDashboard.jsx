import { useState, useEffect } from 'react';
import './RefugeeDashboard.css';
import { LanguageProvider, useLanguage } from './LanguageContext';
import MapSidebar from './MapSidebar';
import MapTopBar from './MapTopBar';
import LocationList from './LocationList';
import MapView from './MapView';
import DetailPanel from './DetailPanel';
import { getMyRequests } from '../../services/refugeeService';
import { getAllServices, filterServicesByNeed } from '../../services/serviceService';
import { getStoredUserNeed } from '../../utils/authStorage';

const RefugeeDashboardContent = () => {
  const { language } = useLanguage();
  const [selectedId, setSelectedId] = useState(1);
  const [services, setServices] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [serviceResponse, requestResponse] = await Promise.all([
          getAllServices(),
          getMyRequests(),
        ]);

        const servicePayload = serviceResponse?.data || serviceResponse || [];
        const requestPayload = requestResponse?.data || requestResponse || [];

        const allServices = Array.isArray(servicePayload)
          ? servicePayload
          : servicePayload?.services || servicePayload?.service || [];
        const myRequests = Array.isArray(requestPayload)
          ? requestPayload
          : requestPayload?.request || requestPayload?.requests || [];
        const needs = getStoredUserNeed();
        const matchingServices = filterServicesByNeed(allServices, needs);
        const visibleServices = matchingServices.length > 0 ? matchingServices : allServices;

        const requestsByServiceId = new Map(
          myRequests.map((request) => [request?.service?._id || request?.service || request._id, request])
        );

        const serviceCards = visibleServices.map((service) => ({
          ...service,
          request: requestsByServiceId.get(service._id) || null,
        }));

        setServices(serviceCards);
        setRequests(myRequests);

        if (serviceCards.length > 0) {
          setSelectedId(serviceCards[0]._id);
        }
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
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
          <LocationList selectedId={selectedId} onSelect={setSelectedId} requests={services} />
          <MapView selectedId={selectedId} onSelect={setSelectedId} requests={services} />
          <DetailPanel selectedId={selectedId} requests={services} />
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
