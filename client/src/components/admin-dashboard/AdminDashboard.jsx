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
import { useNavBar } from "../../../context/NavBarContext";

import "./AdminDashboard.css";

import { getAllServices } from "../../../services/serviceService";
import {
  getAllRequests,
  getUserbyRole,
  getTotalDonations,
} from "../../../services/AdminService";
import { chartData, classifyUsersByAge } from "../../../utils/helper";
function transformService(service, index) {
  const occupied = service.capacity - service.availability;
  const capacityPercent = service.capacity
    ? Math.round((occupied / service.capacity) * 100)
    : 0;
  const statusColor =
    service.availability === 0
      ? "#ef4444"
      : capacityPercent >= 50
        ? "#f59e0b"
        : "#10b981";
  const statusLabel =
    service.availability === 0
      ? "Closed"
      : capacityPercent >= 50
        ? "Limited"
        : "Open";
  return {
    id: service._id || index + 1,
    rawId: service._id,
    name: service.title || "Unknown Service",
    location: service.address
      ? `${service.address.city || ""}, ${service.address.country || ""}`
          .trim()
          .replace(/^,|,$/, "")
      : "Unknown Location",
    capacity: `${occupied}/${service.capacity}`,
    capacityPercent,
    status: statusLabel,
    statusColor,
    contact: service.phone_number || "N/A",
    icon: service.title?.toLowerCase().includes("hospital") ? "🏥" : "🏠",
    iconBg: service.title?.toLowerCase().includes("hospital")
      ? "#dbeafe"
      : "#dcfce7",
    rawCapacity: service.capacity,
    rawAvailability: service.availability,
    requirements: service.requirements || "",
    facilities: service.facilities || [],
  };
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [shelterData, setShelterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [demographicsData, setDemographicsData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [refugees, setRefugees] = useState(0);
  const [totalDonation, setTotalDonation] = useState(0);
  const [error, setError] = useState(null);
  const [viewShelter, setViewShelter] = useState(null);
  const [editShelter, setEditShelter] = useState(null);
  const { setNavItems, setPhoto } = useNavBar();
  useState(() => {
    setNavItems([
      { label: "Dashboard", path: "/admin/dashboard" },
      { label: "Announcements", path: "/admin/announcement" },
      { label: "Services Management", path: "hospital" },
    ]);
    const photo = localStorage.getItem("user_photo");
    setPhoto(photo);
  }, []);
  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const services = await getAllServices();
      if (Array.isArray(services.data))
        setShelterData(services.data.map(transformService));
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
      setRefugees(res.data.users.length);
      const demograph = classifyUsersByAge(res.data.users);
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
  const fetchTotalDonations = async () => {
    try {
      const res = await getTotalDonations();
      setTotalDonation(res.totalAmount);
    } catch (err) {
      console.error("Failed to fetch total donations:", err);
    }
  };
  useEffect(() => {
    fetchDemographics();
    fetchWeeklyRegistrations();
    fetchServices();
    fetchTotalDonations();
  }, []);
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

  const [activeOption, setActiveOption] = useState("All Inbox");
  return (
    <div className="ad-root">
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
        <AdminHeader
          sidebarOpen={sidebarOpen}
          onToggleSidebar={setSidebarOpen}
        />

        <ErrorBanner error={error} onRetry={handleRetry} />

        <StatsGrid
          loading={loading}
          shelterData={shelterData}
          refugeeCount={refugees}
          totalDonation={totalDonation}
        />

        <ChartsSection
          weeklyData={weeklyData}
          demographicsData={demographicsData}
        />

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
