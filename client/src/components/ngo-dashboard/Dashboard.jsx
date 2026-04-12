import './Dashboard.css';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import StatsCards from './StatsCards';
import AidRequestQueue from './AidRequestQueue';
import ChartsRow from './ChartsRow';

const Dashboard = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <TopBar />
        <StatsCards />
        <AidRequestQueue />
        <ChartsRow />
      </div>
    </div>
  );
};

export default Dashboard;
