export default function ToggleCard({ title, description, checked, onToggle }) {
  return (
    <button type="button" className="ah-toggle-card" onClick={onToggle}>
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <span className={`ah-toggle ${checked ? "on" : ""}`} />
    </button>
  );
}
