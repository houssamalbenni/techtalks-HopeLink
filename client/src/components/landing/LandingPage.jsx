
import TopBar from './TopBar';
import HeroSection from './HeroSection';
import RolesSection from './RolesSection';
import PrivacySection from './PrivacySection';
import FooterSection from './FooterSection';
import './Landing.css'
import { useNavigate } from 'react-router-dom';
function LandingPage() {
  const navigate = useNavigate();
  if(localStorage.getItem("token")){
    const role = localStorage.getItem("role");
    if(role === "refugee"){
      navigate("/refugee-dashboard");
    } else if(role === "ngo"){
      navigate("dashboard");
    } else if(role === "admin"){
      navigate("/admin/dashboard");
    }
  }
  return (
    <div className="landing-page">
      <TopBar />

      <main className="main-content container">
        <HeroSection />
        <RolesSection />
        <PrivacySection />
        <FooterSection />
      </main>
    </div>
  );
}

export default LandingPage;