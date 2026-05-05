import { useEffect, useState } from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import StatsCards from './StatsCards';
import AidRequestQueue from './AidRequestQueue';
import ChartsRow from './ChartsRow';
import { getNgoRequests } from '../../../services/ngoService';
import { getAllServices } from '../../../services/serviceService';

const normalizeList = (payload, keys = []) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  for (const key of keys) {
    if (Array.isArray(payload?.[key])) {
      return payload[key];
    }

    if (Array.isArray(payload?.data?.[key])) {
      return payload.data[key];
    }
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  return [];
};

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [requestsResponse, servicesResponse] = await Promise.all([
          getNgoRequests(),
          getAllServices(),
        ]);

        setRequests(normalizeList(requestsResponse, ['requests', 'request']));
        setServices(normalizeList(servicesResponse, ['services', 'service']));
      } catch (err) {
        setError(err.message || 'Failed to load dashboard data');
        console.error('Failed to load NGO dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const totalRequests = requests.length;
  const pendingRequests = requests.filter((request) => request?.status === 'pending').length;
  const approvedRequests = requests.filter((request) => request?.status === 'approved').length;
  const completedRequests = requests.filter((request) => request?.status === 'completed').length;
  const totalCapacity = services.reduce((sum, service) => sum + Number(service?.capacity || 0), 0);
  const availableSlots = services.reduce((sum, service) => sum + Number(service?.availability || 0), 0);
  const capacityUsed = totalCapacity > 0 ? Math.round(((totalCapacity - availableSlots) / totalCapacity) * 100) : 0;

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <TopBar />
        <StatsCards
          loading={loading}
          error={error}
          metrics={{
            totalRequests,
            pendingRequests,
            approvedRequests,
            completedRequests,
            totalCapacity,
            availableSlots,
            capacityUsed,
            serviceCount: services.length,
          }}
        />
        <AidRequestQueue loading={loading} error={error} requests={requests} />
        <ChartsRow requests={requests} services={services} />
      </div>
    </div>
  );
};

export default Dashboard;
