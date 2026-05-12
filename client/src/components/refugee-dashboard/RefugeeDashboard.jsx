import { useState, useEffect } from "react";
import "./RefugeeDashboard.css";
import { LanguageProvider, useLanguage } from "./LanguageContext";
import MapSidebar from "./MapSidebar";
import MapTopBar from "./MapTopBar";
import LocationList from "./LocationList";
import MapView from "./MapView";
import DetailPanel from "./DetailPanel";
import { getMyRequests } from "../../../services/refugeeService";
import { getAllServices } from "../../../services/serviceService";
import { getStoredUserNeed } from "../../../utils/authStorage";
import { useNavBar } from "../../../context/NavBarContext";
const RefugeeDashboardContent = () => {
  const { language } = useLanguage();
  const [selectedId, setSelectedId] = useState(1);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aleardyRequested, setAleardyRequested] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { setNavItems,setPhoto } = useNavBar();
  const navItems = [
    { label: "Dashboard", path: "/refugee-dashboard" },
    { label: "Family Reunification", path: "/family-reunification" },
    { label: "Mental Health", path: "/Health" },
  ];
  const handleSelect = (id) => {
    setSelectedId(id);
    setIsPanelOpen(true);
  };
  const fetchDashboardData = async () => {
    try {
      const [serviceResponse, myRequestsResponse] = await Promise.all([
        getAllServices(),
        getMyRequests(),
      ]);
      console.log("Fetched services:", serviceResponse);
      console.log("Fetched my requests:", myRequestsResponse);
      if (serviceResponse) {
        setServices(serviceResponse.data);
      }
      if (myRequestsResponse) {
        const requestedServiceIds = myRequestsResponse.data.request.map(
          (req) => req.service._id,
        );
        setAleardyRequested(requestedServiceIds);
        console.log("Already requested service IDs:", requestedServiceIds);
      }
      if (serviceResponse.data.length > 0) {
        setSelectedId(serviceResponse.data[0]._id);
        setIsPanelOpen(true);
      }
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDashboardData();
    setNavItems(navItems);
    const photo = localStorage.getItem("user_photo");
    setPhoto(photo);
  }, []);

  if (loading) {
    return (
      <div
        className="map-page"
        lang={language}
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <div className="loading-container">
          <p>Loading Data</p>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="map-page"
        lang={language}
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <p style={{ color: "red" }}>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="map-page"
      lang={language}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* <MapSidebar /> */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* <MapTopBar /> */}
        <div className="map-content">
          <LocationList
            selectedId={selectedId}
            onSelect={handleSelect}
            requests={services}
          />
          <MapView
            selectedId={selectedId}
            onSelect={handleSelect}
            requests={services}
          />
          <DetailPanel
            selectedId={selectedId}
            requests={services}
            isOpen={isPanelOpen}
            onClose={() => setIsPanelOpen(false)}
            myRequests={aleardyRequested}
          />
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
