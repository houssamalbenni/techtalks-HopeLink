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
import AidDistribution from './components/aid-distribution/AidDistribution';
import Hospitals from "./components/hospitals/Hospitals";
import AddHospital from "./components/add-hospital/AddHospital";
import EditHospital from "./components/edit-hospital/EditHospital";
import LoginPage from "./components/login/LoginPage";
import InteractiveExercises from "./components/InteractiveExercises/InteractiveExercises";
import Chatting from "./components/chatting/Chatting";
import CounselorPortal from "./components/counselor-portal/CounselorPortal";
import SupportHome from "./components/support-home/SupportHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<SignupFlow />} />
        <Route path="/digital-identity" element={<DigitalIdentityVault />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/shelter-overview" element={<ShelterOverview />} />
        <Route path="/add-shelter" element={<AddShelter />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/add-hospital" element={<AddHospital />} />
        <Route path="/edit-hospital/:id" element={<EditHospital />} />
        <Route path="/EditShelter" element={<EditShelter />} />
        <Route path="/family-reunification" element={<FamilyReunification />} />
        <Route path="/refugee-dashboard" element={<RefugeeDashboard />} />
        <Route path="/aid-distribution" element={<AidDistribution />} />
         <Route path="/InteractiveExercises" element={<InteractiveExercises />} />
         <Route path="/chatting" element={<Chatting />} />
         <Route path="/counselor-portal" element={<CounselorPortal />} />
         <Route path="/support-home" element={<SupportHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
