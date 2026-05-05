import { useEffect, useMemo, useRef, useState } from "react";
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
  { id: "forest", name: "Forest", type: "Nature", thumb: "forest", tone: { freq: 220, wave: "sine" } },
  { id: "ocean", name: "Ocean Waves", type: "Nature", thumb: "ocean", tone: { freq: 164, wave: "triangle" } },
  { id: "rain", name: "Rain", type: "Nature", thumb: "rain", tone: { freq: 196, wave: "sine" } },
  { id: "white", name: "White Noise", type: "White Noise", thumb: "white", tone: { noise: true } },
  { id: "focus", name: "Deep Focus", type: "Ambient", thumb: "focus", tone: { freq: 110, wave: "sine" } },
];

const defaultPlayer = {
  name: "Forest",
  kind: "Nature",
  time: "0:00",
  duration: "0:00",
};

const WAVE_DURATION = 6;
const SAMPLE_RATE = 22050;
const BREATH_SECONDS = 4;

function createWavDataUrl({ freq = 220, wave = "sine", noise = false }) {
  const length = Math.floor(WAVE_DURATION * SAMPLE_RATE);
  const buffer = new ArrayBuffer(44 + length * 2);
  const view = new DataView(buffer);

  const writeString = (offset, value) => {
    for (let i = 0; i < value.length; i += 1) {
      view.setUint8(offset + i, value.charCodeAt(i));
    }
  };

  writeString(0, "RIFF");
  view.setUint32(4, 36 + length * 2, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, SAMPLE_RATE, true);
  view.setUint32(28, SAMPLE_RATE * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, "data");
  view.setUint32(40, length * 2, true);

  for (let i = 0; i < length; i += 1) {
    let sample;
    if (noise) {
      sample = Math.random() * 2 - 1;
    } else {
      const phase = (2 * Math.PI * freq * i) / SAMPLE_RATE;
      if (wave === "triangle") {
        sample = 2 * Math.asin(Math.sin(phase)) / Math.PI;
      } else if (wave === "square") {
        sample = Math.sign(Math.sin(phase));
      } else {
        sample = Math.sin(phase);
      }
    }
    const scaled = Math.max(-1, Math.min(1, sample)) * 0.28;
    view.setInt16(44 + i * 2, scaled * 0x7fff, true);
  }

  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }

  return `data:audio/wav;base64,${btoa(binary)}`;
}

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
  const audioRef = useRef(null);
  const breathIndexRef = useRef(0);
  const [currentNav, setCurrentNav] = useState(activeNav);
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [selectedSoundId, setSelectedSoundId] = useState(sounds[0]?.id ?? "");
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [breathSteps] = useState(
    breathTags.map((tag) => ({
      ...tag,
      seconds: BREATH_SECONDS,
      value: `${BREATH_SECONDS}s`,
    }))
  );
  const [breathIndex, setBreathIndex] = useState(0);
  const [breathRemaining, setBreathRemaining] = useState(breathSteps[0]?.seconds ?? BREATH_SECONDS);
  const [breathPaused, setBreathPaused] = useState(false);

  const soundSources = useMemo(() => {
    return sounds.reduce((acc, sound) => {
      acc[sound.id] = createWavDataUrl(sound.tone || {});
      return acc;
    }, {});
  }, [sounds]);

  const selectedSound = sounds.find((sound) => sound.id === selectedSoundId) || sounds[0];
  const audioSrc = selectedSound ? soundSources[selectedSound.id] : "";

  const visibleSounds = useMemo(() => {
    const updated = sounds.map((sound) => ({
      ...sound,
      active: sound.id === selectedSound?.id,
      playing: sound.id === selectedSound?.id && isPlaying,
    }));

    if (currentTab === "All Sounds") {
      return updated;
    }

    return updated.filter((sound) => sound.type === currentTab);
  }, [sounds, currentTab, selectedSound, isPlaying]);

  const handleNavSelect = (id) => {
    setCurrentNav(id);
    onNavSelect?.(id);
  };

  const handleTabSelect = (tab) => {
    setCurrentTab(tab);
    onTabSelect?.(tab);
  };

  const handleSoundSelect = (id) => {
    setSelectedSoundId(id);
    setIsPlaying(true);
    onSoundSelect?.(id);
  };

  const handlePrevious = () => {
    const list = visibleSounds.length ? visibleSounds : sounds;
    if (!list.length) return;
    const currentIndex = list.findIndex((sound) => sound.id === selectedSound?.id);
    const nextIndex = currentIndex <= 0 ? list.length - 1 : currentIndex - 1;
    setSelectedSoundId(list[nextIndex].id);
    setIsPlaying(true);
    onPrevious?.(list[nextIndex].id);
  };

  const handleNext = () => {
    const list = visibleSounds.length ? visibleSounds : sounds;
    if (!list.length) return;
    const currentIndex = list.findIndex((sound) => sound.id === selectedSound?.id);
    const nextIndex = currentIndex === -1 || currentIndex === list.length - 1 ? 0 : currentIndex + 1;
    setSelectedSoundId(list[nextIndex].id);
    setIsPlaying(true);
    onNext?.(list[nextIndex].id);
  };

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleVolumeChange = (event) => {
    const nextVolume = Number(event.target.value);
    setVolume(nextVolume);
  };

  const handleSeek = (event) => {
    const nextTime = Number(event.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = nextTime;
    }
    setCurrentTime(nextTime);
  };

  const handleBreathAdjust = () => {};

  const toggleBreathPause = () => {
    setBreathPaused((prev) => {
      const next = !prev;
      onPause?.(next);
      return next;
    });
  };

  useEffect(() => {
    breathIndexRef.current = breathIndex;
  }, [breathIndex]);

  useEffect(() => {
    if (!audioRef.current || !audioSrc) return;
    audioRef.current.src = audioSrc;
    audioRef.current.load();
    setCurrentTime(0);
    setDuration(0);
    if (isPlaying) {
      audioRef.current.play().catch(() => undefined);
    } else {
      audioRef.current.pause();
    }
  }, [audioSrc, isPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (breathPaused || breathSteps.length === 0) return;
    const timer = setInterval(() => {
      setBreathRemaining((prev) => {
        if (prev > 1) return prev - 1;
        const nextIndex = (breathIndexRef.current + 1) % breathSteps.length;
        breathIndexRef.current = nextIndex;
        setBreathIndex(nextIndex);
        return breathSteps[nextIndex]?.seconds ?? BREATH_SECONDS;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [breathPaused, breathSteps]);

  useEffect(() => {
    const next = breathSteps[breathIndex]?.seconds ?? BREATH_SECONDS;
    setBreathRemaining(next);
  }, [breathSteps, breathIndex]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const displayLabel = breathSteps[breathIndex]?.label ?? circleLabel;
  const displayTimer = breathSteps.length ? `${breathRemaining}s` : circleTimer;
  const playerInfo = selectedSound
    ? {
        name: selectedSound.name,
        kind: selectedSound.type,
        time: formatTime(currentTime),
        duration: formatTime(duration || WAVE_DURATION),
      }
    : player;

  return (
    <div className={styles.page}>
      <audio
        ref={audioRef}
        className={styles.visuallyHidden}
        loop
        onTimeUpdate={(event) => setCurrentTime(event.target.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.target.duration)}
      />
      <div className={styles.appShell}>
        <Sidebar
          logoText={logoText}
          navItems={navItems}
          activeNav={currentNav}
          onNavSelect={handleNavSelect}
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
            {breathSteps.map((tag) => (
              <BreathTag key={tag.id} tag={tag} />
            ))}
          </div>

          <div className={styles.circleArea}>
            <div className={styles.sideCol}>
              <button type="button" className={styles.sideBtn} onClick={() => handleBreathAdjust(-1)}>
                &#8249;
              </button>
              <div className={styles.sideLabel}>Reduce</div>
            </div>

            <div className={styles.breathCircleWrap}>
              <div className={styles.breathCircle}>
                <span className={styles.circleLabel}>{displayLabel}</span>
                <span className={styles.circleTimer}>{displayTimer}</span>
              </div>
            </div>

            <div className={styles.sideCol}>
              <button type="button" className={styles.sideBtn} onClick={() => handleBreathAdjust(1)}>
                &#8250;
              </button>
              <div className={styles.sideLabel}>Extend</div>
            </div>
          </div>

          <div className={styles.pauseRow}>
            <button type="button" className={styles.pauseBtn} onClick={toggleBreathPause}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3c3575" strokeWidth="2.5">
                {breathPaused ? (
                  <polygon points="6,4 20,12 6,20" fill="#3c3575" stroke="none" />
                ) : (
                  <>
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </>
                )}
              </svg>
              {breathPaused ? "Resume" : "Pause"}
            </button>
          </div>

          <section className={styles.soundsSection}>
            <div className={styles.soundsTabs}>
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`${styles.soundsTab} ${tab === currentTab ? styles.soundsTabActive : ""}`}
                  onClick={() => handleTabSelect(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className={styles.soundsGrid}>
              {visibleSounds.map((sound) => (
                <SoundCard key={sound.id} sound={sound} onSelect={handleSoundSelect} />
              ))}
            </div>
          </section>
          <PlayerBar
            player={playerInfo}
            thumb={selectedSound?.thumb}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onPrevious={handlePrevious}
            onNext={handleNext}
            volume={volume}
            onVolumeChange={handleVolumeChange}
            progress={currentTime}
            duration={duration || WAVE_DURATION}
            onSeek={handleSeek}
          />

          <div className={styles.footerNote}>
            <span className={styles.heartSm}>♥</span>
            {footerText}
          </div>
        </main>
      </div>
    </div>
  );
}
