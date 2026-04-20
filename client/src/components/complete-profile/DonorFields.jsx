const DonorFields = ({ donorData, onChange }) => {
  const handleChange = (key, value) => {
    onChange((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="donor-fields">
      <div className="donor-fields__field">
        <label className="donor-fields__label">Donation Preference</label>
        <div className="donor-fields__button-group">
          <button
            type="button"
            className={`donor-fields__preference-btn ${
              donorData.donationPreference === 'one-time' ? 'active' : ''
            }`}
            onClick={() => handleChange('donationPreference', 'one-time')}
          >
            One-time
          </button>
          <button
            type="button"
            className={`donor-fields__preference-btn ${
              donorData.donationPreference === 'monthly' ? 'active' : ''
            }`}
            onClick={() => handleChange('donationPreference', 'monthly')}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="donor-fields__field">
        <label className="donor-fields__label">Focus Areas for Support</label>
        <div className="donor-fields__select-wrapper">
          <svg className="donor-fields__select-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          <select
            className="donor-fields__select"
            value={donorData.focusArea || ''}
            onChange={(e) => handleChange('focusArea', e.target.value)}
          >
            <option value="">General Fund (Greatest Need)</option>
            <option value="education">Education & Training</option>
            <option value="healthcare">Healthcare & Medical</option>
            <option value="shelter">Shelter & Housing</option>
            <option value="food">Food & Nutrition</option>
            <option value="legal">Legal Aid & Support</option>
            <option value="mental-health">Mental Health & Counseling</option>
          </select>
          <svg className="donor-fields__select-arrow" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DonorFields;
