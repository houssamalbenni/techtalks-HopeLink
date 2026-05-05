import styles from "./MetalHeath.module.css";

export default function BreathTag({ tag }) {
  return (
    <div className={styles.breathTag}>
      <span className={`${styles.badge} ${tag.tone === "mint" ? styles.badgeMint : styles.badgePurple}`}>
        {tag.value}
      </span>
      {tag.label}
    </div>
  );
}
