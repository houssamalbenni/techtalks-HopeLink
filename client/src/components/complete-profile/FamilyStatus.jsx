import { useEffect, useRef, useState } from 'react';

const FamilyStatus = ({ familyStatus, onChange }) => {
  const [activeField, setActiveField] = useState('');
  const activeFieldTimer = useRef(null);

  useEffect(() => {
    return () => {
      if (activeFieldTimer.current) {
        clearTimeout(activeFieldTimer.current);
      }
    };
  }, []);

  const normalizeValue = (value) => {
    const parsed = Number.parseInt(value, 10);
    if (Number.isNaN(parsed) || parsed < 0) {
      return 0;
    }
    return parsed;
  };

  const triggerFieldBump = (key) => {
    setActiveField(key);
    if (activeFieldTimer.current) {
      clearTimeout(activeFieldTimer.current);
    }
    activeFieldTimer.current = setTimeout(() => setActiveField(''), 260);
  };

  const handleInput = (key, value) => {
    onChange((prev) => ({ ...prev, [key]: normalizeValue(value) }));
    triggerFieldBump(key);
  };

  const handleStep = (key, delta) => {
    const current = Number.parseInt(familyStatus[key], 10) || 0;
    const next = Math.max(0, current + delta);
    onChange((prev) => ({ ...prev, [key]: next }));
    triggerFieldBump(key);
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
            <div
              className={`family-status__counter ${
                activeField === 'familyMembers' ? 'family-status__counter--bump' : ''
              }`}
            >
              <button
                type="button"
                className="family-status__step-btn"
                onClick={() => handleStep('familyMembers', -1)}
                disabled={(Number.parseInt(familyStatus.familyMembers, 10) || 0) <= 0}
                aria-label="Decrease family members"
              >
                -
              </button>
              <input
                id="familyMembers"
                className="family-status__input family-status__input--counter"
                type="number"
                min="0"
                value={familyStatus.familyMembers}
                onChange={(e) => handleInput('familyMembers', e.target.value)}
                placeholder="0"
              />
              <button
                type="button"
                className="family-status__step-btn"
                onClick={() => handleStep('familyMembers', 1)}
                aria-label="Increase family members"
              >
                +
              </button>
            </div>
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
            <div
              className={`family-status__counter ${activeField === 'children' ? 'family-status__counter--bump' : ''}`}
            >
              <button
                type="button"
                className="family-status__step-btn"
                onClick={() => handleStep('children', -1)}
                disabled={(Number.parseInt(familyStatus.children, 10) || 0) <= 0}
                aria-label="Decrease children count"
              >
                -
              </button>
              <input
                id="children"
                className="family-status__input family-status__input--counter"
                type="number"
                min="0"
                value={familyStatus.children}
                onChange={(e) => handleInput('children', e.target.value)}
                placeholder="0"
              />
              <button
                type="button"
                className="family-status__step-btn"
                onClick={() => handleStep('children', 1)}
                aria-label="Increase children count"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyStatus;
