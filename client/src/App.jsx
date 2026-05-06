import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing/LandingPage";
import Dashboard from "./components/ngo-dashboard/Dashboard";
import ProfileSettings from "./components/profile-settings/ProfileSettings";

import DigitalIdentityVault from "./components/digital-identity-profile/DigitalIdentityVault";
import SignupFlow from "./components/full-create-account/SignupFlow";
// import EditShelter from "./components/edit-shelter/EditShelter";
// import FamilyReunification from './components/family-reunification/FamilyReunification';
// import RefugeeDashboard from './components/refugee-dashboard/RefugeeDashboard';
// import Hospitals from "./components/hospitals/Hospitals";
// import AddHospital from "./components/add-hospital/AddHospital";
// import EditHospital from "./components/edit-hospital/EditHospital";
// import MeshAdmin from "./components/test/meshAdmin";
// import Socket from "./components/test/socket";
import MeshAdmin2 from "./components/test/meshAdmin2";
import NotificationPage from "./components/notification/Notification";
import DoctorChat from "./components/test/DoctorChat";
import RefugeeChat from "./components/test/RefugeeChat";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={<SignupFlow />} />
        <Route path="/digital-identity" element={<DigitalIdentityVault />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/profile-settings" element={<ProfileSettings />} /> */}
        {/* <Route path="/shelter-overview" element={<ShelterOverview />} /> */}
        {/* <Route path="/add-shelter" element={<AddShelter />} /> */}
        {/* <Route path="/hospitals" element={<Hospitals />} /> */}
        {/* <Route path="/add-hospital" element={<AddHospital />} /> */}
        {/* <Route path="/edit-hospital" element={<EditHospital />} /> */}
        {/* <Route path="/" element={<EditShelter />} /> */}
        {/* <Route path="/family-reunification" element={<FamilyReunification />} /> */}
        {/* <Route path="/refugee-dashboard" element={<RefugeeDashboard />} /> */}
        {/* <Route path="/test/meshadmin" element={<MeshAdmin />} /> */}
        <Route path="/test/meshadmin2" element={<MeshAdmin2 />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/test/doctor-chat" element={<DoctorChat />} />
        <Route path="/test/refugee-chat" element={<RefugeeChat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
