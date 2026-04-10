import styles from "./CreateAccountForm.module.css";

function getPasswordStrength(password) {
  if (!password) return { label: "", level: 0 };
  if (password.length < 6) return { label: "Weak", level: 1 };
  if (password.length < 10) return { label: "Medium", level: 2 };
  if (/[A-Z]/.test(password) && /[0-9]/.test(password) && password.length >= 10)
    return { label: "Strong", level: 3 };
  return { label: "Medium", level: 2 };
}

export default function PasswordInput({
  value,
  onChange,
  showPassword,
  onToggle,
}) {
  const strength = getPasswordStrength(value);

  return (
    <>
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
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          className={styles.eyeBtn}
          type="button"
          onClick={onToggle}
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
              <circle
                cx="12"
                cy="12"
                r="3"
                stroke="#6b7a99"
                strokeWidth="1.8"
              />
            </svg>
          )}
        </button>
      </div>

      {value && (
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
    </>
  );
}
