function SelectField({ id, label, value, options, hint, onChange, disabled = false }) {
  return (
    <div className="ps-select-field">
      <label htmlFor={id}>{label}</label>
      <div className="ps-select-wrap">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <i className="fa-solid fa-chevron-down" aria-hidden="true" />
      </div>
      {hint ? <small>{hint}</small> : null}
    </div>
  );
}

export default SelectField;
