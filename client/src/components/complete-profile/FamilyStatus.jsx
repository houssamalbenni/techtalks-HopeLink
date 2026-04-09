const FamilyStatus = ({ familyStatus, onChange }) => {
  const handleInput = (key, value) => {
    onChange((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="family-status">
      <p className="family-status__label">Family Status</p>
      <div className="family-status__grid">
        <div className="family-status__card">
          <svg className="family-status__icon" viewBox="0 0 24 24">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
          </svg>
          <div className="family-status__field">
            <label className="family-status__field-label" htmlFor="familyMembers">
              Family Members
            </label>
            <input
              id="familyMembers"
              className="family-status__input"
              type="number"
              min="0"
              value={familyStatus.familyMembers}
              onChange={(e) => handleInput('familyMembers', e.target.value)}
              placeholder="0"
            />
          </div>
        </div>
        <div className="family-status__card">
          <svg className="family-status__icon" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <div className="family-status__field">
            <label className="family-status__field-label" htmlFor="children">
              Children (Under 18)
            </label>
            <input
              id="children"
              className="family-status__input"
              type="number"
              min="0"
              value={familyStatus.children}
              onChange={(e) => handleInput('children', e.target.value)}
              placeholder="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyStatus;
