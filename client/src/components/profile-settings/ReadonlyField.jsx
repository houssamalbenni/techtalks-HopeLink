import FieldInput from './FieldInput';

function ReadonlyField({ id, label, value, type }) {
  return (
    <FieldInput label={label} htmlFor={id}>
      <input id={id} type={type} value={value} readOnly />
    </FieldInput>
  );
}

export default ReadonlyField;
