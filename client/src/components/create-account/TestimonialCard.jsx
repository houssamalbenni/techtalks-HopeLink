import styles from "./CreateAccountForm.module.css";

export default function TestimonialCard() {
  return (
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
              <path
                d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                stroke="#4f8ef7"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <div className={styles.testimonialBrand}>RefugeLink Network</div>
            <div className={styles.testimonialTagline}>
              Secure. Fast. Reliable.
            </div>
          </div>
        </div>
        <p className={styles.testimonialQuote}>
          "This platform enabled us to reconnect with our family within 48 hours
          of arriving at the transit camp. The digital ID system kept our
          documents safe."
        </p>
        <div className={styles.testimonialFooter}>
          <div className={styles.avatarStack}>
            {["#4f8ef7", "#7c5cbf", "#e05c8a"].map((color, i) => (
              <div
                key={i}
                className={styles.avatar}
                style={{ backgroundColor: color, zIndex: 3 - i }}
              />
            ))}
          </div>
          <span className={styles.userCount}>Join 50,000+ verified users</span>
        </div>
      </div>
    </div>
  );
}
