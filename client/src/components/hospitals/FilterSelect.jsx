export default function FilterSelect({ placeholder, options, value, onChange }) {
  return (
    <select value={value} onChange={onChange}>
      <option value="">
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
