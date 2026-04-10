import styles from "./CreateAccountForm.module.css";

export default function ContactInput({ value, onChange }) {
  return (
    <div className={styles.inputGroup}>
      <span className={styles.inputIcon}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <rect
            x="2"
            y="4"
            width="20"
            height="16"
            rx="2"
            stroke="#6b7a99"
            strokeWidth="1.8"
          />
          <path
            d="M2 8l10 6 10-6"
            stroke="#6b7a99"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <input
        className={styles.input}
        type="text"
        placeholder="Email or Phone Number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
