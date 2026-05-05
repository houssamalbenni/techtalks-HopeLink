import styles from "./MetalHeath.module.css";
import BreathTag from "./BreathTag";
import PlayerBar from "./PlayerBar";
import Sidebar from "./Sidebar";
import SoundCard from "./SoundCard";

const defaultNavItems = [
  {
    id: "breathing",
    label: "Breathing",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    id: "meditations",
    label: "Meditations",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2c0 0-4 3-4 8a4 4 0 008 0c0-5-4-8-4-8z" />
        <path d="M8 18h8" />
        <path d="M10 21h4" />
      </svg>
    ),
  },
  {
    id: "sleep",
    label: "Sleep",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>
    ),
  },
  {
    id: "sounds",
    label: "Sounds",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    id: "progress",
    label: "Progress",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="12" width="4" height="9" rx="1" />
        <rect x="10" y="7" width="4" height="14" rx="1" />
        <rect x="17" y="3" width="4" height="18" rx="1" />
      </svg>
    ),
  },
  {
    id: "favorites",
    label: "Favorites",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
];

const defaultTabs = ["All Sounds", "White Noise", "Nature", "Ambient", "Music", "Guided"];

const defaultSounds = [
  { id: "forest", name: "Forest", type: "Nature", thumb: "forest", active: true, playing: true },
  { id: "ocean", name: "Ocean Waves", type: "Nature", thumb: "ocean" },
  { id: "rain", name: "Rain", type: "Nature", thumb: "rain" },
  { id: "white", name: "White Noise", type: "Ambient", thumb: "white" },
  { id: "focus", name: "Deep Focus", type: "Ambient", thumb: "focus" },
];

const defaultPlayer = {
  name: "Forest",
  kind: "Nature",
  time: "2:18",
  duration: "4:00",
};

export default function InteractiveExercises({
  logoText = "Mindful",
  userName = "Emily",
  greeting = "Good morning,",
  title = "Breathing",
  subtitle = "Take a deep breath. You've got this.",
  streak = 7,
  activeNav = "breathing",
  navItems = defaultNavItems,
  breathTags = [
    { id: "inhale", label: "Inhale", value: "4s", tone: "purple" },
    { id: "exhale", label: "Exhale", value: "4s", tone: "mint" },
  ],
  circleLabel = "Inhale",
  circleTimer = "4s",
  tabs = defaultTabs,
  activeTab = "All Sounds",
  sounds = defaultSounds,
  player = defaultPlayer,
  footerText = "Made with care for calm moments",
  onNavSelect,
  onTabSelect,
  onSoundSelect,
  onPrevious,
  onNext,
  onPause,
}) {
  return (
    <div className={styles.page}>
      <div className={styles.appShell}>
        <Sidebar
          logoText={logoText}
          navItems={navItems}
          activeNav={activeNav}
          onNavSelect={onNavSelect}
          greeting={greeting}
          userName={userName}
        />

        <main className={styles.main}>
          <div className={styles.topbar}>
            <div className={styles.pageTitle}>
              <h1>{title}</h1>
              <p>{subtitle}</p>
            </div>
            <div className={styles.streak}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#9b7ee8" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              <span className={styles.streakLabel}>Daily Streak</span>
              <span className={styles.streakNum}>{streak}</span>
            </div>
          </div>

          <div className={styles.breathControls}>
            {breathTags.map((tag) => (
              <BreathTag key={tag.id} tag={tag} />
            ))}
          </div>

          <div className={styles.circleArea}>
            <div className={styles.sideCol}>
              <button type="button" className={styles.sideBtn} onClick={onPrevious}>
                &#8249;
              </button>
              <div className={styles.sideLabel}>Reduce</div>
            </div>

            <div className={styles.breathCircleWrap}>
              <div className={styles.breathCircle}>
                <span className={styles.circleLabel}>{circleLabel}</span>
                <span className={styles.circleTimer}>{circleTimer}</span>
              </div>
            </div>

            <div className={styles.sideCol}>
              <button type="button" className={styles.sideBtn} onClick={onNext}>
                &#8250;
              </button>
              <div className={styles.sideLabel}>Extend</div>
            </div>
          </div>

          <div className={styles.pauseRow}>
            <button type="button" className={styles.pauseBtn} onClick={onPause}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3c3575" strokeWidth="2.5">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
              Pause
            </button>
          </div>

          <section className={styles.soundsSection}>
            <div className={styles.soundsTabs}>
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`${styles.soundsTab} ${tab === activeTab ? styles.soundsTabActive : ""}`}
                  onClick={() => onTabSelect?.(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className={styles.soundsGrid}>
              {sounds.map((sound) => (
                <SoundCard key={sound.id} sound={sound} onSelect={onSoundSelect} />
              ))}
            </div>
          </section>
          <PlayerBar player={player} />

          <div className={styles.footerNote}>
            <span className={styles.heartSm}>♥</span>
            {footerText}
          </div>
        </main>
      </div>
    </div>
  );
}
