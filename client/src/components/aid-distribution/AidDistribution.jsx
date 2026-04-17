import { useState } from 'react';
import './AidDistribution.css';
import AidSidebar from './AidSidebar';
import AidTopBar from './AidTopBar';
import TodaysDistribution from './TodaysDistribution';
import MapTracker from './MapTracker';
import InventoryLedger from './InventoryLedger';
import ServedCountsChart from './ServedCountsChart';
import ComplianceFlags from './ComplianceFlags';

const aidBatches = [
  {
    id: '#AD8842',
    category: 'Medical Supplies',
    subcategory: 'First Aid Kits',
    from: 'Central Hub, Sector 1',
    to: 'Camp Alpha, Sector 4',
    weight: '120 kg',
    eta: 'Today, 14:30',
    status: 'In Transit',
    statusValue: 'in-transit',
    mapTop: '38%',
    mapLeft: '55%',
    handler: 'Amina Noor',
    vehicle: 'Truck T-14',
    lastUpdated: 'Today, 13:58',
    notes: 'Temperature-controlled kits loaded and sealed before dispatch.',
    checkpoints: [
      'Departed Central Hub at 13:05',
      'Checkpoint Sector 2 at 13:28',
      'Checkpoint Sector 3 at 13:44',
      'ETA Camp Alpha at 14:30',
    ],
  },
  {
    id: '#BC9921',
    category: 'Food Rations',
    subcategory: 'Dry Goods',
    from: 'Logistics Center B',
    to: 'Camp Beta, Sector 2',
    weight: '850 kg',
    eta: 'Today, 10:15',
    status: 'Delivered',
    statusValue: 'delivered',
    mapTop: '52%',
    mapLeft: '42%',
    handler: 'Khaled Sami',
    vehicle: 'Truck F-07',
    lastUpdated: 'Today, 10:21',
    notes: 'Delivery signed by Camp Beta intake officer.',
    checkpoints: [
      'Departed Logistics Center B at 08:12',
      'Checkpoint Sector 1 at 08:47',
      'Arrived Camp Beta at 10:10',
      'Proof of delivery logged at 10:21',
    ],
  },
  {
    id: '#EF4412',
    category: 'Winter Gear',
    subcategory: 'Blankets and Coats',
    from: 'Warehouse North',
    to: 'Registration Hub',
    weight: '400 kg',
    eta: 'Tomorrow, 09:00',
    status: 'Pending',
    statusValue: 'pending',
    mapTop: '30%',
    mapLeft: '68%',
    handler: 'Mariam Yousif',
    vehicle: 'Truck W-03',
    lastUpdated: 'Today, 16:40',
    notes: 'Loading starts at 07:30 tomorrow pending gate clearance.',
    checkpoints: [
      'Stock audit completed at 16:05',
      'Packaging line confirmed at 16:24',
      'Dispatch window opens tomorrow at 07:30',
    ],
  },
];

const AidDistribution = () => {
  const [statusFilter, setStatusFilter] = useState('in-transit');

  return (
    <div className="aid-page">
      <AidSidebar />
      <div className="aid-main">
        <AidTopBar />
        <div className="aid-content">
          <div className="aid-top-row">
            <TodaysDistribution />
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
            <ServedCountsChart />
            <ComplianceFlags />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AidDistribution;
