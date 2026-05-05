import styles from "./MetalHeath.module.css";
import NavItem from "./NavItem";

export default function Sidebar({
  logoText,
  navItems,
  activeNav,
  onNavSelect,
  greeting,
  userName,
}) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <svg className={styles.logoIcon} viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="26" cy="36" rx="5" ry="8" fill="#c4b0f0" opacity="0.6" />
          <ellipse cx="26" cy="36" rx="5" ry="8" fill="#a28ee0" opacity="0.5" transform="rotate(-30 26 36)" />
          <ellipse cx="26" cy="36" rx="5" ry="8" fill="#a28ee0" opacity="0.5" transform="rotate(30 26 36)" />
          <ellipse cx="26" cy="36" rx="5" ry="8" fill="#c4b0f0" opacity="0.6" transform="rotate(-60 26 36)" />
          <ellipse cx="26" cy="36" rx="5" ry="8" fill="#c4b0f0" opacity="0.6" transform="rotate(60 26 36)" />
          <ellipse cx="26" cy="30" rx="4" ry="7" fill="#8b6ed8" />
          <ellipse cx="26" cy="30" rx="4" ry="7" fill="#9b7ee8" transform="rotate(-25 26 30)" />
          <ellipse cx="26" cy="30" rx="4" ry="7" fill="#9b7ee8" transform="rotate(25 26 30)" />
        </svg>
        <span className={styles.logoText}>{logoText}</span>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            isActive={item.id === activeNav}
            onSelect={onNavSelect}
          />
        ))}
      </nav>

      <div className={styles.sidebarCard}>
        <div className={styles.sidebarCardText}>
          <div className={styles.sidebarHeadline}>Take care<br />of your mind</div>
          <div className={styles.sidebarSub}>You matter. Always.</div>
        </div>
        <svg className={styles.sidebarMountains} viewBox="0 0 160 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 70 L30 30 L55 55 L80 15 L110 50 L135 28 L160 50 L160 70Z" fill="#c4b8e8" opacity="0.35" />
          <path d="M0 70 L40 42 L65 58 L90 25 L120 55 L145 35 L160 55 L160 70Z" fill="#a898d8" opacity="0.4" />
          <ellipse cx="120" cy="20" rx="12" ry="6" fill="#e0d8f0" opacity="0.55" />
          <ellipse cx="130" cy="18" rx="9" ry="5" fill="#e0d8f0" opacity="0.55" />
          <ellipse cx="140" cy="22" rx="10" ry="5" fill="#e0d8f0" opacity="0.55" />
        </svg>
      </div>

      <div className={styles.userRow}>
        <div className={styles.avatar}>
          <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </div>
        <div className={styles.userInfo}>
          <div className={styles.userGreeting}>{greeting}</div>
          <div className={styles.userName}>{userName}</div>
        </div>
        <span className={styles.chevronDown}>&#8964;</span>
      </div>
    </aside>
  );
}
