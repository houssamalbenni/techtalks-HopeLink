export default function TabBar({ tabs, activeTab, onTabChange }) {
  return (
    <div className="tab-bar">
      {tabs.map((t, i) => (
        <div
          key={t}
          className={`tab${activeTab === i ? " active" : ""}`}
          onClick={() => onTabChange(i)}
        >
          {t}
        </div>
      ))}
    </div>
  );
}
