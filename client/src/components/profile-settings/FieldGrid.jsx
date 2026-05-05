function FieldGrid({ fields, renderField }) {
  return <div className="ps-field-grid">{fields.map((field) => renderField(field))}</div>;
}

export default FieldGrid;
