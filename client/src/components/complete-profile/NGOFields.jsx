const NGOFields = ({ ngoData, onChange }) => {
  const handleChange = (key, value) => {
    onChange((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="ngo-fields">
      <div className="ngo-fields__field">
        <label className="ngo-fields__label">Organization Name</label>
        <div className="ngo-fields__input-wrapper">
          <svg className="ngo-fields__input-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
          </svg>
          <input
            type="text"
            className="ngo-fields__input"
            placeholder="Enter your organization name"
            value={ngoData.organizationName || ''}
            onChange={(e) => handleChange('organizationName', e.target.value)}
          />
        </div>
      </div>

      <div className="ngo-fields__field">
        <label className="ngo-fields__label">Registration/Verification ID</label>
        <div className="ngo-fields__input-wrapper">
          <svg className="ngo-fields__input-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-2.16-2.66c-.44-.53-1.24-.53-1.67 0-.43.54-.43 1.42 0 1.96l2.91 3.57c.43.53 1.24.53 1.67 0 .26-.32 2.91-3.66 2.91-3.66.42-.53.39-1.43-.08-1.96-.48-.54-1.28-.58-1.76-.23z" />
          </svg>
          <input
            type="text"
            className="ngo-fields__input"
            placeholder="Enter your registration or verification ID"
            value={ngoData.registrationId || ''}
            onChange={(e) => handleChange('registrationId', e.target.value)}
          />
        </div>
      </div>

      <div className="ngo-fields__field">
        <label className="ngo-fields__label">Primary Service Areas</label>
        <div className="ngo-fields__select-wrapper">
          <svg className="ngo-fields__select-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          <select
            className="ngo-fields__select"
            value={ngoData.serviceArea || ''}
            onChange={(e) => handleChange('serviceArea', e.target.value)}
          >
            <option value="">Select Region...</option>
            <option value="north">North Region</option>
            <option value="south">South Region</option>
            <option value="east">East Region</option>
            <option value="west">West Region</option>
            <option value="central">Central Region</option>
          </select>
          <svg className="ngo-fields__select-arrow" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NGOFields;
