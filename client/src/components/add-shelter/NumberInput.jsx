// components/NumberInput.jsx
import { useState } from "react";

export default function NumberInput({
  value,
  onChange,
  placeholder = "0",
  min = 0,
  max = null,
}) {
  const [inputValue, setInputValue] = useState(value || "");

  const handleChange = (e) => {
    const newVal = e.target.value;
    setInputValue(newVal);
    if (onChange) onChange(newVal);
  };

  const handleIncrement = () => {
    const current = parseInt(inputValue) || 0;
    const next = max ? Math.min(current + 1, max) : current + 1;
    setInputValue(String(next));
    if (onChange) onChange(String(next));
  };

  const handleDecrement = () => {
    const current = parseInt(inputValue) || 0;
    const next = Math.max(current - 1, min);
    setInputValue(String(next));
    if (onChange) onChange(String(next));
  };

  return (
    <div className="number-input-wrap">
      <input
        type="text"
        inputMode="numeric"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
      />
      <div className="spinner-buttons">
        <button
          className="spinner-btn spinner-btn-up"
          onClick={handleIncrement}
          type="button"
          title="Increase"
        >
          ▲
        </button>
        <button
          className="spinner-btn spinner-btn-down"
          onClick={handleDecrement}
          type="button"
          title="Decrease"
        >
          ▼
        </button>
      </div>
    </div>
  );
}
