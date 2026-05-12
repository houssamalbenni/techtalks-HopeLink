import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing/LandingPage";
import Dashboard from "./components/ngo-dashboard/Dashboard";
import ShelterOverview from "./components/shelter-overview/ShelterOverview";
import ProfileSettings from "./components/profile-settings/ProfileSettings";
import AddShelter from "./components/add-shelter/AddShelter";
import DigitalIdentityVault from "./components/digital-identity-profile/DigitalIdentityVault";
import SignupFlow from "./components/full-create-account/SignupFlow";
import EditShelter from "./components/edit-shelter/EditShelter";
import FamilyReunification from "./components/family-reunification/FamilyReunification";
import RefugeeDashboard from "./components/refugee-dashboard/RefugeeDashboard";
import AidDistribution from "./components/aid-distribution-----/AidDistribution";
import Hospitals from "./components/hospitals/Hospitals";
import AddHospital from "./components/add-hospital/AddHospital";
import EditHospital from "./components/edit-hospital/EditHospital";
import LoginPage from "./components/login/LoginPage";
import InteractiveExercises from "./components/InteractiveExercises/InteractiveExercises";
import Chatting from "./components/chatting/Chatting";
import CounselorPortal from "./components/counselor-portal/CounselorPortal";
import SupportHome from "./components/support-home/SupportHome";
import StandingTogetherInCrisis from "./components/support-home/articles/StandingTogetherInCrisis";
import SafeHavenConflictZones from "./components/support-home/articles/SafeHavenConflictZones";
import HopeUnderFire from "./components/support-home/articles/HopeUnderFire";
import RebuildingLives from "./components/support-home/articles/RebuildingLives";
import RoofOfHope from "./components/support-home/articles/RoofOfHope";
import FromFearToSafety from "./components/support-home/articles/FromFearToSafety";
import BoxBreathing from "./components/support-home/breathing/BoxBreathing";
import FourSevenEightBreath from "./components/support-home/breathing/FourSevenEightBreath";
import CalmWaveBreathing from "./components/support-home/breathing/CalmWaveBreathing";
import TriangleBreath from "./components/support-home/breathing/TriangleBreath";
import ExtendedExhale from "./components/support-home/breathing/ExtendedExhale";
import MorningResetBreath from "./components/support-home/breathing/MorningResetBreath";
// import EditShelter from "./components/edit-shelter/EditShelter";
// import FamilyReunification from './components/family-reunification/FamilyReunification';
// import RefugeeDashboard from './components/refugee-dashboard/RefugeeDashboard';
// import Hospitals from "./components/hospitals/Hospitals";
// import AddHospital from "./components/add-hospital/AddHospital";
// import EditHospital from "./components/edit-hospital/EditHospital";
import MeshAdmin2 from "./components/test/meshAdmin2";
import NotificationPage from "./components/notification/Notification";
import DoctorChat from "./components/test/DoctorChat";
import RefugeeChat from "./components/test/RefugeeChat";
import AdminDashboard from "./components/admin-dashboard/AdminDashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create/:role" element={<SignupFlow />} />
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
        <Route
          path="/InteractiveExercises"
          element={<InteractiveExercises />}
        />
        <Route path="/chatting" element={<Chatting />} />
        <Route path="/counselor-portal" element={<CounselorPortal />} />
        <Route path="/support-home" element={<SupportHome />} />
        <Route
          path="/support-home/articles/standing-together-in-crisis"
          element={<StandingTogetherInCrisis />}
        />
        <Route
          path="/support-home/articles/safe-haven-conflict-zones"
          element={<SafeHavenConflictZones />}
        />
        <Route
          path="/support-home/articles/hope-under-fire"
          element={<HopeUnderFire />}
        />
        <Route
          path="/support-home/articles/rebuilding-lives"
          element={<RebuildingLives />}
        />
        <Route
          path="/support-home/articles/roof-of-hope"
          element={<RoofOfHope />}
        />
        <Route
          path="/support-home/articles/from-fear-to-safety"
          element={<FromFearToSafety />}
        />
        <Route
          path="/support-home/breathing/box-breathing"
          element={<BoxBreathing />}
        />
        <Route
          path="/support-home/breathing/4-7-8-breath"
          element={<FourSevenEightBreath />}
        />
        <Route
          path="/support-home/breathing/calm-wave"
          element={<CalmWaveBreathing />}
        />
        <Route
          path="/support-home/breathing/triangle-breath"
          element={<TriangleBreath />}
        />
        <Route
          path="/support-home/breathing/extended-exhale"
          element={<ExtendedExhale />}
        />
        <Route
          path="/support-home/breathing/morning-reset"
          element={<MorningResetBreath />}
        />
        <Route path="/test/doctor-chat" element={<DoctorChat />} />
        <Route path="/test/doctor-chat/:refugeeId" element={<DoctorChat />} />
        <Route path="/test/refugee-chat" element={<RefugeeChat />} />
        <Route path="/test/refugee-chat/:doctorId" element={<RefugeeChat />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
