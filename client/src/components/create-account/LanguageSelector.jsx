import styles from "./CreateAccountForm.module.css";

const languages = [
  { code: "en", flag: "🇺🇸", label: "English" },
  { code: "ar", flag: "🇸🇦", label: "Arabic" },
  { code: "fr", flag: "🇫🇷", label: "French" },
  { code: "es", flag: "🇪🇸", label: "Spanish" },
  { code: "de", flag: "🇩🇪", label: "German" },
  { code: "tr", flag: "🇹🇷", label: "Turkish" },
];

export default function LanguageSelector({ value, onChange }) {
  const selectedLang = languages.find((l) => l.code === value);

  return (
    <>
      <div className={styles.sectionLabel}>Preferred Language</div>
      <div className={styles.selectWrapper}>
        <span className={styles.flagIcon}>{selectedLang?.flag}</span>
        <select
          className={styles.select}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
        <span className={styles.selectChevron}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="#6b7a99"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>
    </>
  );
}
