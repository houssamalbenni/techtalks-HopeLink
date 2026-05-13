export default function OptionGrid({ options, selected, onToggle }) {
  return (
    <div className="eh-option-grid">
      {options.map((item) => {
        const checked = selected.includes(item);

        return (
          <label key={item} className="eh-option-item">
            <input type="checkbox" checked={checked} onChange={() => onToggle(item)} />
            <span>{item}</span>
          </label>
        );
      })}
    </div>
  );
}
