import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./components/landing/LandingPage";
import Dashboard from "./components/ngo-dashboard/Dashboard";
import SignupFlow from "./components/full-create-account/SignupFlow";
import NotificationPage from "./components/notification/Notification";
import DoctorChat from "./components/test/DoctorChat";
import RefugeeChat from "./components/test/RefugeeChat";
import AnnouncementPage from "./components/admin/AnnouncementPage";
import LoginPage from "./components/login/LoginPage";
import FamilyReunification from "./components/family-reunification/FamilyReunification"
import ProfileSettings from "./components/profile-settings/ProfileSettings";
import RefugeeDashboard from "./components/refugee-dashboard/RefugeeDashboard";
import { Navbar } from "./components/navBar/NavBar";
import { useNavBar } from "../context/NavBarContext";
function App() {
  const { navitems ,photo } = useNavBar();
  const navigation = useLocation();

  return (
    <>
      {navigation.pathname !== "/login" &&
        navigation.pathname !== "/create" &&
        navigation.pathname !== "/" && <Navbar navItems={navitems} photo={photo} />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create" element={<SignupFlow />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/test/doctor-chat" element={<DoctorChat />} />
        <Route path="/test/refugee-chat" element={<RefugeeChat />} />
        <Route path="/admin/announcement" element={<AnnouncementPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfileSettings />} />
        <Route path="/refugee-dashboard" element={<RefugeeDashboard />} />
        <Route path="/family-reunification" element={<FamilyReunification />} />
      </Routes>
    </>
  );
}

export default App;
