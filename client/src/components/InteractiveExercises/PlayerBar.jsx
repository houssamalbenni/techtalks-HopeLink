import styles from "./MetalHeath.module.css";

function getThumbClass(thumb) {
  if (!thumb) return styles.thumbForest;
  const formatted = thumb.charAt(0).toUpperCase() + thumb.slice(1);
  return styles[`thumb${formatted}`] || styles.thumbForest;
}

export default function PlayerBar({
  player,
  thumb,
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
  volume,
  onVolumeChange,
  progress,
  duration,
  onSeek,
}) {
  return (
    <div className={styles.playerBar}>
      <div className={styles.playerThumb}>
        <div className={getThumbClass(thumb)} />
      </div>
      <div className={styles.playerInfo}>
        <div className={styles.playerTrack}>{player.name}</div>
        <div className={styles.playerKind}>{player.kind}</div>
      </div>
      <div className={styles.playerControls}>
        <button type="button" className={styles.ctrlBtn} onClick={onPrevious}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="19,4 9,12 19,20" />
            <polygon points="9,4 1,12 9,20" />
          </svg>
        </button>
        <button type="button" className={styles.playMain} onClick={onPlayPause}>
          {isPlaying ? (
            <svg viewBox="0 0 24 24" fill="white">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="white">
              <polygon points="6,4 20,12 6,20" />
            </svg>
          )}
        </button>
        <button type="button" className={styles.ctrlBtn} onClick={onNext}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="5,4 15,12 5,20" />
            <polygon points="15,4 23,12 15,20" />
          </svg>
        </button>
      </div>
      <div className={styles.progressArea}>
        <input
          type="range"
          min="0"
          max={Math.max(duration, 0.1)}
          step="0.1"
          value={progress}
          onChange={onSeek}
          className={styles.progressSlider}
          style={{ "--progress": `${duration ? (progress / duration) * 100 : 0}%` }}
          aria-label="Seek audio"
        />
      </div>
      <div className={styles.volumeArea}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 5l-6 5H2v4h3l6 5V5z" />
          <path d="M19 5a6 6 0 010 14" />
        </svg>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={onVolumeChange}
          className={styles.volumeSlider}
          style={{ "--volume": `${volume * 100}%` }}
          aria-label="Volume"
        />
        <span className={styles.timeLabel}>{player.time}</span>
        <span className={styles.timeLabel}>/ {player.duration}</span>
      </div>
    </div>
  );
}
