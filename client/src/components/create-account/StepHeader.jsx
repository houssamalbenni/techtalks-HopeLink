import styles from "./CreateAccountForm.module.css";

export default function StepHeader() {
  return (
    <>
      <div className={styles.stepBar}>
        <span className={styles.stepLabel}>Step 1 of 2</span>
        <span className={styles.stepTitle}>Account Details</span>
      </div>
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: "50%" }} />
      </div>

      <div className={styles.iconWrapper}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" stroke="#4f8ef7" strokeWidth="2" />
          <path
            d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
            stroke="#4f8ef7"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <h1 className={styles.heading}>Create Account</h1>
      <p className={styles.subheading}>
        Join the secure humanitarian network to access vital resources and
        support.
      </p>
    </>
  );
}
