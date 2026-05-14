import TopBar from './TopBar';
import HeroSection from './HeroSection';
import RolesSection from './RolesSection';
import PrivacySection from './PrivacySection';
import FooterSection from './FooterSection';
import './landing.css'
function LandingPage() {
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
