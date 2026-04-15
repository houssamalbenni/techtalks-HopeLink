function FieldInput({ label, htmlFor, children }) {
  return (
    <div className="ps-field">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );
}

export default FieldInput;
