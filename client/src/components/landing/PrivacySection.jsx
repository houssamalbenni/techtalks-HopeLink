function PrivacySection() {
  return (
    <section id="privacy_transparency_commitment" className="privacy-section">
      <div className="privacy-card">
        <div className="privacy-icon">
          <i className="fa-solid fa-shield-halved" aria-hidden="true" />
        </div>

        <div className="privacy-text">
          <h4>Our Commitment to Privacy &amp; Security</h4>
          <p>
            Your data is encrypted end-to-end. We utilize decentralized identity protocols to ensure
            that refugees maintain complete control over their personal information. Location data is
            never shared publicly.
          </p>
        </div>

        <div className="privacy-link-wrap">
          <a href="#">
            Read Policy <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default PrivacySection;
