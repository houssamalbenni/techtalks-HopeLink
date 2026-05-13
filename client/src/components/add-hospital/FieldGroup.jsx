export default function FieldGroup({ label, required = false, children, className = "" }) {
  return (
    <label className={`ah-field ${className}`.trim()}>
      <span>
        {label}
        {required && <em>*</em>}
      </span>
      {children}
    </label>
  );
}
