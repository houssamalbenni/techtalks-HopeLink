const needsList = [
  { key: 'shelter', label: 'Shelter' },
  { key: 'food', label: 'Food/Water' },
  { key: 'medical', label: 'Medical Care' },
  { key: 'legal', label: 'Legal Aid' },
];

const PrimaryNeeds = ({ needs, onToggle }) => {
  return (
    <div className="primary-needs">
      <p className="primary-needs__label">Primary Needs (Select all that apply)</p>
      <div className="primary-needs__grid">
        {needsList.map(({ key, label }) => (
          <div
            key={key}
            onClick={() => onToggle(key)}
            className={`primary-needs__item ${needs[key] ? 'active' : ''}`}
          >
            <div className={`primary-needs__checkbox ${needs[key] ? 'active' : ''}`}>
              {needs[key] && (
                <svg className="primary-needs__check" viewBox="0 0 10 10">
                  <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" fill="none" />
                </svg>
              )}
            </div>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrimaryNeeds;
