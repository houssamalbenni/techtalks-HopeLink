import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing/LandingPage";
import CompleteProfile from "./components/complete-profile/CompleteProfile";
import CreateAccountForm from "./components/create-account/CreateAccountForm";
import Dashboard from "./components/ngo-dashboard/Dashboard";
import ShelterOverview from "./components/shelter-overview/ShelterOverview";
import ProfileSettings from "./components/profile-settings/ProfileSettings";
import AddShelter from "./components/add-shelter/AddShelter";
import DigitalIdentityVault from "./components/digital-identity-profile/DigitalIdentityVault";
import EditShelter from "./components/edit-shelter/EditShelter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/create-account" element={<CreateAccountForm />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route
          path="/digital-identity-vault"
          element={<DigitalIdentityVault />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/shelter-overview" element={<ShelterOverview />} />
        <Route path="/add-shelter" element={<AddShelter />} />
        <Route path="/" element={<EditShelter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
