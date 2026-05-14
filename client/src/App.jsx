import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./components/landing/LandingPage";
import Dashboard from "./components/ngo-dashboard/Dashboard";
import SignupFlow from "./components/full-create-account/SignupFlow";
import NotificationPage from "./components/notification/Notification";
import DoctorChat from "./components/test/DoctorChat";
import RefugeeChat from "./components/test/RefugeeChat";
import AnnouncementPage from "./components/admin/AnnouncementPage";
import LoginPage from "./components/login/LoginPage";
import FamilyReunification from "./components/family-reunification/FamilyReunification";
import ProfileSettings from "./components/profile-settings/ProfileSettings";
import RefugeeDashboard from "./components/refugee-dashboard/RefugeeDashboard";
import NgoDashboard from "./components/ngo-portal/NgoDashboard";
import AddHospital from "./components/add-hospital/AddHospital";
import Hospitals from "./components/hospitals/Hospitals";
import { Navbar } from "./components/navBar/NavBar";
import { useNavBar } from "../context/NavBarContext";
import {
  BASIC_FIELDS_HOSPITAL,
  BASIC_FIELDS_SHELTER,
} from "../../client/src/components/hospitals/hospitalsData";
import AdminDashboard from "./components/admin-dashboard/AdminDashboard";
import EditHospital from "./components/edit-hospital/EditHospital";
import EditShelter from "./components/edit-shelter/EditShelter";
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
import CounselorPortal from "./components/counselor-portal/CounselorPortal";
import InteractiveExercises from "./components/InteractiveExercises/InteractiveExercises";
import MentalHealth from "./components/mental-health/MentalHealth";
function App() {
  const { navitems, photo } = useNavBar();
  const navigation = useLocation();

  return (
    <>
      {navigation.pathname !== "/login" &&
        navigation.pathname !== "/create" &&
        navigation.pathname !== "/create/refugee" &&
        navigation.pathname !== "/create/ngo" &&
        navigation.pathname !== "/create/donor" &&
        navigation.pathname !== "/" && (
          <Navbar navItems={navitems} photo={photo} />
        )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create/:role" element={<SignupFlow />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ngo/dashboard" element={<NgoDashboard />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/test/doctor-chat" element={<DoctorChat />} />
        <Route path="/test/refugee-chat" element={<RefugeeChat />} />
        <Route path="/admin/announcement" element={<AnnouncementPage />} />
        <Route path="/counselor-portal" element={<CounselorPortal />} />
        <Route path="/support-home" element={<SupportHome />} />
        <Route
          path="/interactive-exercises"
          element={<InteractiveExercises />}
        />
        <Route path="/mental-health" element={<MentalHealth />} />
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfileSettings />} />
        <Route path="/refugee-dashboard" element={<RefugeeDashboard />} />
        <Route path="/family-reunification" element={<FamilyReunification />} />
        <Route
          path="/add-hospital"
          element={
            <AddHospital basicField={BASIC_FIELDS_HOSPITAL} type="hospital" />
          }
        />
        <Route
          path="/add-shelter"
          element={
            <AddHospital basicField={BASIC_FIELDS_SHELTER} type="shelter" />
          }
        />
        <Route path="/hospital" element={<Hospitals type={"hospital"} />} />
        <Route path="/shelter" element={<Hospitals type={"shelter"} />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/edit-hospital/:id" element={<EditHospital />} />
        <Route path="/edit-shelter/:id" element={<EditShelter />} />
      </Routes>
    </>
  );
}

export default App;
