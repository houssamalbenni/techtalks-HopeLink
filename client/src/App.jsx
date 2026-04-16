import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing/LandingPage";
import CompleteProfile from "./components/complete-profile/CompleteProfile";
import CreateAccountForm from "./components/create-account/CreateAccountForm";
import Dashboard from "./components/ngo-dashboard/Dashboard";
import ProfileSettings from "./components/profile-settings/ProfileSettings";
import DigitalIdentityVault from "./components/digital-identity-profile/DigitalIdentityVault";

import RefugeeDashboard from './components/refugee-dashboard/RefugeeDashboard';

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
        <Route path="/refugee-dashboard" element={<RefugeeDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
