import styles from "./CreateAccountForm.module.css";
import { useNavigate } from "react-router-dom";
export default function FormButtons({onNext}) {
  const navigate = useNavigate();
  return (
    <div className={styles.buttonRow}>
      <button className={styles.backBtn} type="button" onClick={() => navigate("/")}> 
        Back
      </button>
      <button className={styles.continueBtn} type="button" onClick={onNext}>
        Continue to Step 2 →
      </button>
    </div>
  );
}
