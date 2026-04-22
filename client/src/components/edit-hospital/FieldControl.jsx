export default function FieldControl({ label, required = false, htmlFor, children, className = "" }) {
  return (
    <label className={`eh-field ${className}`.trim()} htmlFor={htmlFor}>
      <span>
        {label}
        {required ? <em>*</em> : null}
      </span>
      {children}
    </label>
  );
}
