import styles from "./CreateAccountForm.module.css";
import { useState } from "react";
import StepHeader from "./StepHeader";
import ContactInput from "./ContactInput";
import PasswordInput from "./PasswordInput";
import LanguageSelector from "./LanguageSelector";
import ConsentCheckbox from "./ConsentCheckbox";
import FormButtons from "./FormButtons";
import TestimonialCard from "./TestimonialCard";

export default function CreateAccountForm() {
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState("en");
  const [consent, setConsent] = useState(false);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <div className={styles.leftPanel}>
          <StepHeader />
          <ContactInput value={contact} onChange={setContact} />
          <PasswordInput
            value={password}
            onChange={setPassword}
            showPassword={showPassword}
            onToggle={() => setShowPassword(!showPassword)}
          />
          <LanguageSelector value={language} onChange={setLanguage} />
          <ConsentCheckbox checked={consent} onChange={setConsent} />
          <FormButtons />
        </div>
        <TestimonialCard />
      </div>
    </div>
  );
}
