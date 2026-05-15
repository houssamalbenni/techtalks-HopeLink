
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import HeroSection from './HeroSection';
import RolesSection from './RolesSection';
import PrivacySection from './PrivacySection';
import FooterSection from './FooterSection';
import './Landings.css';
function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      return;
    }

    const role = localStorage.getItem('role');

    if (role === 'refugee') {
      navigate('/refugee-dashboard', { replace: true });
    } else if (role === 'ngo') {
      navigate('/ngo/dashboard', { replace: true });
    } else if (role === 'admin') {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

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