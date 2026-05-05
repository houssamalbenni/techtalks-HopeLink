import styles from "./MetalHeath.module.css";

function getThumbClass(thumb) {
  const formatted = thumb.charAt(0).toUpperCase() + thumb.slice(1);
  return styles[`thumb${formatted}`];
}

export default function SoundCard({ sound, onSelect }) {
  return (
    <button
      type="button"
      className={`${styles.soundCard} ${sound.active ? styles.soundCardActive : ""}`}
      onClick={() => onSelect?.(sound.id)}
    >
      <div className={styles.soundThumb}>
        <div className={`${styles.soundThumbImg} ${getThumbClass(sound.thumb)}`} />
        <div className={styles.playOverlay}>
          <div className={styles.playBtnSm}>
            {sound.playing ? (
              <svg viewBox="0 0 24 24" fill="#4a4080" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="#4a4080" xmlns="http://www.w3.org/2000/svg">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            )}
          </div>
        </div>
      </div>
      <div className={styles.soundName}>{sound.name}</div>
      <div className={styles.soundType}>{sound.type}</div>
    </button>
  );
}
