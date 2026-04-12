function ToggleCard({ id, title, hint, checked, onChange }) {
  return (
    <div className="ps-toggle-card">
      <div>
        <p>{title}</p>
        <small>{hint}</small>
      </div>
      <div className="ps-switch">
        <input id={id} type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
        <label htmlFor={id}>Toggle</label>
      </div>
    </div>
  );
}

export default ToggleCard;
