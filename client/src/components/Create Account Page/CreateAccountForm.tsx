"use client";
import styles from "./CreateAccountForm.module.css";
import { useState } from "react";


const languages = [
  { code: "en", flag: "🇺🇸", label: "English" },
  { code: "ar", flag: "🇸🇦", label: "Arabic" },
  { code: "fr", flag: "🇫🇷", label: "French" },
  { code: "es", flag: "🇪🇸", label: "Spanish" },
  { code: "de", flag: "🇩🇪", label: "German" },
  { code: "tr", flag: "🇹🇷", label: "Turkish" },
];

function getPasswordStrength(password: string): {
  label: string;
  level: number;
} {
  if (!password) return { label: "", level: 0 };
  if (password.length < 6) return { label: "Weak", level: 1 };
  if (password.length < 10) return { label: "Medium", level: 2 };
  if (/[A-Z]/.test(password) && /[0-9]/.test(password) && password.length >= 10)
    return { label: "Strong", level: 3 };
  return { label: "Medium", level: 2 };
}

export default function CreateAccountForm() {
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState("en");
  const [consent, setConsent] = useState(false);

  const strength = getPasswordStrength(password);

  const selectedLang = languages.find((l) => l.code === language);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        {/* Left Panel */}
        <div className={styles.leftPanel}>
          {/* Step indicator */}
          <div className={styles.stepBar}>
            <span className={styles.stepLabel}>Step 1 of 2</span>
            <span className={styles.stepTitle}>Account Details</span>
          </div>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: "50%" }} />
          </div>

          {/* Icon */}
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

          {/* Email / Phone */}
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
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className={styles.inputGroup}>
            <span className={styles.inputIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect
                  x="5"
                  y="11"
                  width="14"
                  height="10"
                  rx="2"
                  stroke="#6b7a99"
                  strokeWidth="1.8"
                />
                <path
                  d="M8 11V7a4 4 0 018 0v4"
                  stroke="#6b7a99"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <input
              className={styles.input}
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className={styles.eyeBtn}
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"
                    stroke="#6b7a99"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"
                    stroke="#6b7a99"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <line
                    x1="1"
                    y1="1"
                    x2="23"
                    y2="23"
                    stroke="#6b7a99"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                    stroke="#6b7a99"
                    strokeWidth="1.8"
                  />
                  <circle cx="12" cy="12" r="3" stroke="#6b7a99" strokeWidth="1.8" />
                </svg>
              )}
            </button>
          </div>

          {/* Password strength */}
          {password && (
            <div className={styles.strengthWrapper}>
              <div className={styles.strengthBars}>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={styles.strengthBar}
                    style={{
                      backgroundColor:
                        i <= strength.level
                          ? strength.level === 1
                            ? "#e05c5c"
                            : strength.level === 2
                            ? "#e0a850"
                            : "#4ade80"
                          : "#2a3352",
                    }}
                  />
                ))}
              </div>
              <span className={styles.strengthLabel}>
                Password strength: {strength.label}
              </span>
            </div>
          )}

          {/* Preferred Language */}
          <div className={styles.sectionLabel}>Preferred Language</div>
          <div className={styles.selectWrapper}>
            <span className={styles.flagIcon}>{selectedLang?.flag}</span>
            <select
              className={styles.select}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
            <span className={styles.selectChevron}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="#6b7a99" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </div>

          {/* Consent */}
          <label className={styles.consentLabel}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <span className={styles.consentText}>
              I consent to secure data sharing for humanitarian aid purposes. I
              understand my location and identity are protected under end-to-end
              encryption.
            </span>
          </label>

          {/* Buttons */}
          <div className={styles.buttonRow}>
            <button className={styles.backBtn} type="button">
              Back
            </button>
            <button className={styles.continueBtn} type="button">
              Continue to Step 2 →
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className={styles.rightPanel}>
          <div className={styles.rightBg}>
            {/* Decorative teal chevrons */}
            <div className={styles.chevronStack}>
              <div className={`${styles.chevron} ${styles.chevron1}`} />
              <div className={`${styles.chevron} ${styles.chevron2}`} />
              <div className={`${styles.chevron} ${styles.chevron3}`} />
            </div>

            {/* Warm glow in middle */}
            <div className={styles.glowDot} />
          </div>

          {/* Testimonial card */}
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialHeader}>
              <div className={styles.testimonialLogo}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="#4f8ef7" strokeWidth="2" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#4f8ef7" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div className={styles.testimonialBrand}>RefugeLink Network</div>
                <div className={styles.testimonialTagline}>Secure. Fast. Reliable.</div>
              </div>
            </div>
            <p className={styles.testimonialQuote}>
              "This platform enabled us to reconnect with our family within 48 hours of arriving
              at the transit camp. The digital ID system kept our documents safe."
            </p>
            <div className={styles.testimonialFooter}>
              <div className={styles.avatarStack}>
                {["#4f8ef7", "#7c5cbf", "#e05c8a"].map((color, i) => (
                  <div key={i} className={styles.avatar} style={{ backgroundColor: color, zIndex: 3 - i }} />
                ))}
              </div>
              <span className={styles.userCount}>Join 50,000+ verified users</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
