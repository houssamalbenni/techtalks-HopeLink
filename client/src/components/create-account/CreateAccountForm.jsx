import styles from "./CreateAccountForm.module.css";
import StepHeader from "./StepHeader";
import ContactInput from "./ContactInput";
import PasswordInput from "./PasswordInput";
import LanguageSelector from "./LanguageSelector";
import ConsentCheckbox from "./ConsentCheckbox";
import FormButtons from "./FormButtons";
import TestimonialCard from "./TestimonialCard";
import toast from "react-hot-toast";

export default function CreateAccountForm({ onNext, formData, onFieldChange }) {
  const {
    full_name,
    dob,
    phone,
    email,
    password,
    showPassword,
    selected_language,
    consent,
  } = formData;

  const moveNext = ()=>{
    if(!full_name || !dob || !phone || !password || !consent) {
      toast.error("Please fill all required fields and accept the consent.");
      return;
    }
    if(password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    onNext();
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <div className={styles.leftPanel}>
          <StepHeader />
          <ContactInput
            full_name={full_name}
            dob={dob}
            phone={phone}
            email={email}
            onFieldChange={onFieldChange}
          />
          <PasswordInput
            value={password}
            onChange={(value) => onFieldChange("password", value)}
            showPassword={showPassword}
            onToggle={() => onFieldChange("showPassword", !showPassword)}
          />
          <LanguageSelector
            value={selected_language}
            onChange={(value) => onFieldChange("selected_language", value)}
          />
          <ConsentCheckbox
            checked={consent}
            onChange={(value) => onFieldChange("consent", value)}
          />
          <FormButtons onNext={moveNext} />
        </div>
        <TestimonialCard />
      </div>
    </div>
  );
}
