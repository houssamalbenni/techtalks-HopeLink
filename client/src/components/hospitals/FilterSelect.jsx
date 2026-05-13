export default function FilterSelect({ placeholder, options, value, onChange }) {
  return (
    <select value={value} onChange={onChange}>
      <option value="">
        {placeholder}
      </option>
      {options.map((option,index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
