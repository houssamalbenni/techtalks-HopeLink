import styles from "./CreateAccountForm.module.css";

export default function ConsentCheckbox({ checked, onChange }) {
  return (
    <label className={styles.consentLabel}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={styles.consentText}>
        I consent to secure data sharing for humanitarian aid purposes. I
        understand my location and identity are protected under end-to-end
        encryption.
      </span>
    </label>
  );
}
