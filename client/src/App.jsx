import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing/LandingPage";
import CompleteProfile from "./components/complete-profile/CompleteProfile";
import CreateAccountForm from "./components/create-account/CreateAccountForm";
import Dashboard from './components/ngo-dashboard/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={<CreateAccountForm />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
