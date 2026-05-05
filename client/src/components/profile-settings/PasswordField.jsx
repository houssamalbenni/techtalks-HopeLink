import FieldInput from './FieldInput';

function PasswordField({ id, label, visible, onToggle }) {
  return (
    <FieldInput label={label} htmlFor={id}>
      <div className="ps-password-wrap">
        <input id={id} type={visible ? 'text' : 'password'} placeholder="............" autoComplete="new-password" />
        <button type="button" onClick={onToggle} aria-label={visible ? 'Hide password' : 'Show password'}>
          <i className={`fa-regular ${visible ? 'fa-eye' : 'fa-eye-slash'}`} aria-hidden="true" />
        </button>
      </div>
    </FieldInput>
  );
}

export default PasswordField;
