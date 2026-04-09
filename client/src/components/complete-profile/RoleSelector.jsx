const roles = [
  {
    id: 'refugee',
    label: 'Refugee / Asylum Seeker',
    icon: (
      <svg className="role-selector__icon" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#4f7dff' }}>
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
      </svg>
    ),
  },
  {
    id: 'ngo',
    label: 'NGO / Aid Worker',
    icon: (
      <svg className="role-selector__icon" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#a855f7' }}>
        <path d="M4 9l8-5 8 5v10c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1V9zm8-3.2L6 9.1V18h12V9.1l-6-3.3z" />
      </svg>
    ),
  },
  {
    id: 'donor',
    label: 'Donor / Sponsor',
    icon: (
      <svg className="role-selector__icon" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#f87171' }}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
  },
];

const RoleSelector = ({ selectedRole, onSelect }) => {
  return (
    <div className="role-selector">
      <p className="role-selector__label">I am joining as a:</p>
      <div className="role-selector__grid">
        {roles.map((role) => (
          <div
            key={role.id}
            onClick={() => onSelect(role.id)}
            className={`role-selector__option ${selectedRole === role.id ? 'selected' : ''}`}
          >
            <div className="role-selector__icon-box">{role.icon}</div>
            <span className="role-selector__text">{role.label}</span>
            <div className={`role-selector__indicator ${selectedRole === role.id ? 'selected' : ''}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;
