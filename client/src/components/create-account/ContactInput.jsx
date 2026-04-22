import styles from "./CreateAccountForm.module.css";

function InputIcon({ type }) {
  if (type === "user") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke="#6b7a99" strokeWidth="1.8" />
        <path
          d="M4 20c0-3.5 3.6-6 8-6s8 2.5 8 6"
          stroke="#6b7a99"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "calendar") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="5"
          width="18"
          height="16"
          rx="2"
          stroke="#6b7a99"
          strokeWidth="1.8"
        />
        <path d="M3 10h18" stroke="#6b7a99" strokeWidth="1.8" />
        <path
          d="M8 3v4M16 3v4"
          stroke="#6b7a99"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "phone") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
          d="M7 2h4l2 5-2.5 1.8a14 14 0 006.7 6.7L19 13l5 2v4a2 2 0 01-2.2 2C11.5 20.5 3.5 12.5 3 2.2A2 2 0 015 0h2z"
          transform="translate(-2 1)"
          stroke="#6b7a99"
          strokeWidth="1.6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
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
  );
}

function Field({ type, inputType = "text", placeholder, value, onChange }) {
  return (
    <div className={styles.inputGroup}>
      <span className={styles.inputIcon}>
        <InputIcon type={type} />
      </span>
      <input
        className={styles.input}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default function ContactInput({
  full_name,
  dob,
  phone,
  email,
  onFieldChange,
}) {
  return (
    <div className={styles.contactFields}>
      <div className={styles.twoColRow}>
        <Field
          type="user"
          placeholder="Full Name"
          value={full_name}
          onChange={(value) => onFieldChange("full_name", value)}
        />
        <Field
          type="calendar"
          inputType="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(value) => onFieldChange("dob", value)}
        />
      </div>

      <Field
        type="phone"
        placeholder="Phone Number"
        value={phone}
        onChange={(value) => onFieldChange("phone", value)}
      />

      <Field
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(value) => onFieldChange("email", value)}
      />
    </div>
  );
}
