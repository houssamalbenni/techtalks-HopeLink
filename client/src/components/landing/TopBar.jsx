function TopBar() {
  return (
    <header id="language_emergency_utility" className="top-bar container">
      <div className="logo-group">
        <div className="logo-box">
          <i className="fa-solid fa-hands-holding-circle" aria-hidden="true" />
        </div>
        <span className="logo-text">RefugeLink</span>
      </div>

      <div className="top-actions">
        <button type="button" className="lang-btn" aria-label="Change language">
          <i className="fa-solid fa-globe" aria-hidden="true" />
          <span>English</span>
          <i className="fa-solid fa-chevron-down chevron" aria-hidden="true" />
        </button>

        <button type="button" className="emergency-btn" aria-label="Find shelter now">
          <i className="fa-solid fa-location-dot" aria-hidden="true" />
          <span className="desktop-only">Find Shelter Now</span>
          <span className="mobile-only">SOS</span>
        </button>
      </div>
    </header>
  );
}

export default TopBar;
