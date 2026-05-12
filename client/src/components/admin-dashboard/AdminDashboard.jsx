import { useEffect, useState } from "react";
import ActivityList from "./ActivityList";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import ChartsSection from "./ChartsSection";
import EditModal from "./EditModal";
import ErrorBanner from "./ErrorBanner";
import ShelterTable from "./ShelterTable";
import StatsGrid from "./StatsGrid";
import ViewModal from "./ViewModal";
import "./AdminDashboard.css";

import {getAllServices} from "../../../services/serviceService";
import {getAllRequests ,getUserbyRole} from "../../../services/AdminService";
import { chartData, classifyUsersByAge } from "../../../utils/helper";
function transformService(service, index) {
  const occupied = service.capacity - service.availability;
  const capacityPercent = service.capacity ? Math.round((occupied / service.capacity) * 100) : 0;
  const statusColor = service.availability === 0 ? "#ef4444" : capacityPercent >= 50 ? "#f59e0b" : "#10b981";
  const statusLabel = service.availability === 0 ? "Closed" : capacityPercent >= 50 ? "Limited" : "Open";
  return {
    id: service._id || index + 1,
    rawId: service._id,
    name: service.title || "Unknown Service",
    location: service.address
      ? `${service.address.city || ""}, ${service.address.country || ""}`.trim().replace(/^,|,$/, "")
      : "Unknown Location",
    capacity: `${occupied}/${service.capacity}`,
    capacityPercent,
    status: statusLabel,
    statusColor,
    contact: service.phone_number || "N/A",
    icon: service.title?.toLowerCase().includes("hospital") ? "🏥" : "🏠",
    iconBg: service.title?.toLowerCase().includes("hospital") ? "#dbeafe" : "#dcfce7",
    rawCapacity: service.capacity,
    rawAvailability: service.availability,
    requirements: service.requirements || "",
    facilities: service.facilities || [],
  };
}

// Transform notification to activity format
function transformActivity(notification, index) {
  const typeIconMap = {
    alert: "🚨",
    info: "ℹ️",
    medical: "⚕️",
    registration: "👥",
    announcement: "📢",
  };

  const icon = typeIconMap[notification.type] || "🔔";

  const createdAt = new Date(notification.createdAt);
  const now = new Date();
  const diffMs = now - createdAt;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  let timeAgo;
  if (diffMins < 60) timeAgo = `${diffMins} minutes ago`;
  else if (diffHours < 24) timeAgo = `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  else timeAgo = `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

  return {
    id: notification._id || index,
    title: notification.title,
    description: notification.message,
    time: timeAgo,
    icon,
  };
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [shelterData, setShelterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [demographicsData, setDemographicsData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [error, setError] = useState(null);
  const [viewShelter, setViewShelter] = useState(null);
  const [editShelter, setEditShelter] = useState(null);

  useEffect(() => {
    fetchServices();
    fetchDemographics();
    fetchWeeklyRegistrations();
    fetchRecentActivity();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const services = await getAllServices();
      if (Array.isArray(services.data)) setShelterData(services.data.map(transformService));
    } catch (err) {
      console.error("Failed to fetch services:", err);
      setError("Failed to load services. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchDemographics = async () => {
    try {
      const res = await getUserbyRole();
      const demograph = classifyUsersByAge(res.data.users)
      setDemographicsData(demograph);
    } catch (err) {
      console.error("Failed to fetch demographics:", err);
    }
  };

  const fetchWeeklyRegistrations = async () => {
    try {
      const res = await getAllRequests();
      const chartDatas = chartData(res.data.requests);
      setWeeklyData(chartDatas);
    } catch (err) {
      console.error("Failed to fetch weekly registrations:", err);
    }
  };

  const fetchRecentActivity = async () => {
    try {
      const data = await adminService.getRecentActivity();
      if (Array.isArray(data)) setRecentActivity(data.map(transformActivity));
    } catch (err) {
      console.error("Failed to fetch recent activity:", err);
    }
  };

  const handleRetry = () => {
    setError(null);
    fetchServices();
  };
const settingsOptions = [
    {
      label: "All Inbox",
      src: "../../assets/inbox.png",
    },
    {
      label: "Shelter Updates",
      src: "../../assets/shelters.png",
    },
    {
      label: "Medicine Updates",
      src: "../../assets/hospital.png",
    },
    {
      label: "Emergency Alerts",
      src: "../../assets/critical.png",
    },
    {
      label: "System",
      src: "../../assets/system.png",
    },
    {
      label: "Request Updates",
      src: "../../assets/request.png",
    },
  ];
  const handleUpdateService = (serviceId, payload) => adminService.updateService(serviceId, payload);
  const [activeOption, setActiveOption] = useState("All Inbox");
  return (
    <div className="ad-root">
      {viewShelter && <ViewModal shelter={viewShelter} onClose={() => setViewShelter(null)} />}
      {editShelter && (
        <EditModal
          shelter={editShelter}
          onClose={() => setEditShelter(null)}
          onSave={fetchServices}
          onUpdate={handleUpdateService}
        />
      )}

      {/* <AdminSidebar sidebarOpen={sidebarOpen} /> */}
      <aside className="left-sidebar desktop-only">
          <section className="sidebar-group">
            <h4 className="sidebar-title">NOTIFICATION SETTINGS</h4>
            {settingsOptions.map((opt) => (
              <AdminSidebar
                key={opt.label}
                label={opt.label}
                src={opt.src}
                count={opt.count}
                active={activeOption === opt.label}
                onClick={() => setActiveOption(opt.label)}
              />
            ))}
          </section>
        </aside>

      <div className="ad-content">
        <AdminHeader sidebarOpen={sidebarOpen} onToggleSidebar={setSidebarOpen} />

        <ErrorBanner error={error} onRetry={handleRetry} />

        <StatsGrid loading={loading} shelterData={shelterData} />

        <ChartsSection weeklyData={weeklyData} demographicsData={demographicsData} />

        <div className="ad-bottom-grid">
          {/* <ShelterTable
            loading={loading}
            shelterData={shelterData}
            onViewShelter={setViewShelter}
            onEditShelter={setEditShelter}
          /> */}
        </div>
      </div>
    </div>
  );
}