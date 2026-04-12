import styles from "./CreateAccountForm.module.css";

export default function FormButtons() {
  return (
    <div className={styles.buttonRow}>
      <button className={styles.backBtn} type="button">
        Back
      </button>
      <button className={styles.continueBtn} type="button">
        Continue to Step 2 →
      </button>
    </div>
  );
}
