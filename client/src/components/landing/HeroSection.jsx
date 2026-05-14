function HeroSection() {
  return (
    <section id="entry_hero_mission" className="hero-section">
      <div className="hero-copy">
        <div className="hero-badge">
          <span className="pulse-dot" />
          Secure Humanitarian Network
        </div>

        <h1>
          Connecting Hope with <br />
          <span className="gradient-text">Actionable Support</span>
        </h1>

        <p>
          A unified platform integrating shelter mapping, aid distribution, and secure digital
          identity to empower refugees, NGOs, and donors worldwide.
        </p>

        <div className="hero-pills" aria-label="Platform highlights">
          <span>Verified shelters</span>
          <span>Secure family tracing</span>
          <span>Real-time aid tracking</span>
        </div>
      </div>

      <div className="hero-visual" aria-label="HopeLink visual preview">
        <div className="hero-frame">
          <img
            className="hero-photo"
            src="/assets/logo.jpeg"
            alt="HopeLink humanitarian support illustration"
          />
          <div className="hero-floating-card">
            <strong>24/7 support</strong>
            <span>Fast response for urgent needs</span>
          </div>
        </div>

        <div className="hero-metrics">
          <div className="hero-metric">
            <span className="metric-value">01</span>
            <span className="metric-label">Trust-first design</span>
          </div>
          <div className="hero-metric">
            <span className="metric-value">02</span>
            <span className="metric-label">Simple role entry</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
