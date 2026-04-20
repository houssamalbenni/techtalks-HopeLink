import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing/LandingPage";
import CompleteProfile from "./components/complete-profile/CompleteProfile";
import CreateAccountForm from "./components/create-account/CreateAccountForm";
import Dashboard from "./components/ngo-dashboard/Dashboard";
import ShelterOverview from "./components/shelter-overview/ShelterOverview";
import ProfileSettings from "./components/profile-settings/ProfileSettings";
import AddShelter from "./components/add-shelter/AddShelter";
import DigitalIdentityVault from "./components/digital-identity-profile/DigitalIdentityVault";
import SignupFlow from "./components/full-create-account/SignupFlow";
import EditShelter from "./components/edit-shelter/EditShelter";
import FamilyReunification from './components/family-reunification/FamilyReunification';
import RefugeeDashboard from './components/refugee-dashboard/RefugeeDashboard';
import Hospitals from "./components/hospitals/Hospitals";
import AddHospital from "./components/add-hospital/AddHospital";
import EditHospital from "./components/edit-hospital/EditHospital";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={<SignupFlow />} />
        <Route path="/digital-identity" element={<DigitalIdentityVault />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/shelter-overview" element={<ShelterOverview />} />
        <Route path="/add-shelter" element={<AddShelter />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/add-hospital" element={<AddHospital />} />
        <Route path="/edit-hospital" element={<EditHospital />} />
        <Route path="/" element={<EditShelter />} />
        <Route path="/family-reunification" element={<FamilyReunification />} />
        <Route path="/refugee-dashboard" element={<RefugeeDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
