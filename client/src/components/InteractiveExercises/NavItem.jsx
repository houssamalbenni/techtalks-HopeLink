import styles from "./MetalHeath.module.css";

export default function NavItem({ item, isActive, onSelect }) {
  return (
    <button
      type="button"
      className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
      onClick={() => onSelect?.(item.id)}
    >
      {item.icon}
      {item.label}
    </button>
  );
}
