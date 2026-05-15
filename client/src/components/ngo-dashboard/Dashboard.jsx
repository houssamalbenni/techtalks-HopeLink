import "./Dashboard.css";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import StatsCards from "./StatsCards";
import AidRequestQueue from "./AidRequestQueue";
import ChartsRow from "./ChartsRow";
import { useNotifications } from "../../../context/NotificationContext";
import { useEffect } from "react";
const Dashboard = () => {
  const { registerToSocket } = useNotifications();
  const [userId] = useState(() => localStorage.getItem("userId") || "");
  const [role] = useState(() => localStorage.getItem("role") || "");
  useEffect(() => {
    if (!userId || !role) {
      return;
    }
    registerToSocket(userId, role);
  }, [registerToSocket, role, userId]);
  return (
    <div className="dashboard-layout">
      {/* <Sidebar /> */}
      <div className="dashboard-main">
        {/* <TopBar /> */}
        <StatsCards />
        <AidRequestQueue />
        <ChartsRow />
      </div>
    </div>
  );
};

export default Dashboard;
