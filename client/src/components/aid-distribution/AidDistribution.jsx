import { useState, useEffect } from 'react';
import './AidDistribution.css';
import AidSidebar from './AidSidebar';
import AidTopBar from './AidTopBar';
import TodaysDistribution from './TodaysDistribution';
import MapTracker from './MapTracker';
import InventoryLedger from './InventoryLedger';
import ServedCountsChart from './ServedCountsChart';
import ComplianceFlags from './ComplianceFlags';
import { getAllDistributions, transformServiceToBatch } from '../../../services/aidDistributionService';

const AidDistribution = () => {
  const [statusFilter, setStatusFilter] = useState('in-transit');
  const [aidBatches, setAidBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDistributions = async () => {
      try {
        setLoading(true);
        const response = await getAllDistributions();
        const services = response.data || response || [];
        
        // Transform services to batch format
        const batches = services.map((service, index) =>
          transformServiceToBatch(service, index)
        );
        
        setAidBatches(batches);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch distributions:', err);
        // Fallback: use empty array if no data
        setAidBatches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDistributions();
  }, []);

  if (loading) {
    return (
      <div className="aid-page">
        <AidSidebar />
        <div className="aid-main">
          <AidTopBar />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '600px' }}>
            <p>Loading distributions...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="aid-page">
        <AidSidebar />
        <div className="aid-main">
          <AidTopBar />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '600px' }}>
            <p style={{ color: 'red' }}>Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="aid-page">
      <AidSidebar />
      <div className="aid-main">
        <AidTopBar />
        <div className="aid-content">
          <div className="aid-top-row">
            <TodaysDistribution distributions={aidBatches} />
            <MapTracker
              batches={aidBatches}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
            />
          </div>
          <div className={`aid-ledger-slot ${statusFilter === 'all' ? 'aid-ledger-slot-all' : ''}`}>
            <InventoryLedger
              batches={aidBatches}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
            />
          </div>
          <div className="aid-bottom-row">
            <ServedCountsChart distributions={aidBatches} />
            <ComplianceFlags distributions={aidBatches} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AidDistribution;
