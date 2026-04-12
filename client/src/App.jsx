import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing/LandingPage";
import CompleteProfile from "./components/complete-profile/CompleteProfile";
import CreateAccountForm from "./components/create-account/CreateAccountForm";
import DigitalIdentityVault from "./components/digital-identity-profile/DigitalIdentityVault";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/create-account" element={<CreateAccountForm />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/" element={<DigitalIdentityVault />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
