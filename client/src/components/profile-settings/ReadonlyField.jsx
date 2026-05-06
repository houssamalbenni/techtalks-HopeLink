import FieldInput from './FieldInput';

function ReadonlyField({ id, label, value, type, readOnly = true, onChange }) {
  return (
    <FieldInput label={label} htmlFor={id}>
      <input
        id={id}
        type={type}
        value={value ?? ''}
        readOnly={readOnly}
        onChange={readOnly ? undefined : onChange}
      />
    </FieldInput>
  );
}

export default ReadonlyField;
