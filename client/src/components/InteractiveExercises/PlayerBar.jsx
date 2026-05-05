import styles from "./MetalHeath.module.css";

export default function PlayerBar({ player }) {
  return (
    <div className={styles.playerBar}>
      <div className={styles.playerThumb}>
        <div className={styles.thumbForest} />
      </div>
      <div className={styles.playerInfo}>
        <div className={styles.playerTrack}>{player.name}</div>
        <div className={styles.playerKind}>{player.kind}</div>
      </div>
      <div className={styles.playerControls}>
        <button type="button" className={styles.ctrlBtn}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="19,4 9,12 19,20" />
            <polygon points="9,4 1,12 9,20" />
          </svg>
        </button>
        <button type="button" className={styles.playMain}>
          <svg viewBox="0 0 24 24" fill="white">
            <polygon points="6,4 20,12 6,20" />
          </svg>
        </button>
        <button type="button" className={styles.ctrlBtn}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="5,4 15,12 5,20" />
            <polygon points="15,4 23,12 15,20" />
          </svg>
        </button>
      </div>
      <div className={styles.volumeArea}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 5l-6 5H2v4h3l6 5V5z" />
          <path d="M19 5a6 6 0 010 14" />
        </svg>
        <div className={styles.volTrack}>
          <div className={styles.volThumb} />
        </div>
        <span className={styles.timeLabel}>{player.time}</span>
        <span className={styles.timeLabel}>/ {player.duration}</span>
      </div>
    </div>
  );
}
