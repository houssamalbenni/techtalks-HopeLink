function SettingsTabs({ tabs }) {
  return (
    <aside className="ps-inner-nav">
      {tabs.map((tab) => (
        <button key={tab.id} type="button" className={tab.active ? 'active' : ''}>
          <i className={`fa-solid ${tab.icon}`} aria-hidden="true" />
          <span>{tab.label}</span>
        </button>
      ))}
    </aside>
  );
}

export default SettingsTabs;
