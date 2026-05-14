import { NavLink } from "react-router-dom";
import "./SupportNavbar.css";

const defaultNavItems = [
  {
    label: "Support Home",
    path: "/support-home",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 11.5V21h6V14h6v7h6V11.5L12 3z" />
      </svg>
    ),
  },
  {
    label: "Interactive Exercises",
    path: "/interactive-exercises",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Mental Health",
    path: "/mental-health",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C8 2 4 5 4 9c0 5 8 11 8 11s8-6 8-11c0-4-4-7-8-7z" />
        <circle cx="12" cy="9" r="2" />
      </svg>
    ),
  },
];

export default function SupportNavbar({ navItems = defaultNavItems }) {
  return (
    <header className="support-nav">
      <div className="support-nav__brand">
        <div className="support-nav__logo" aria-hidden="true" />
        <div>
          <p className="support-nav__title">HopeLink</p>
          <p className="support-nav__tag">Care & Calm Hub</p>
        </div>
      </div>
      <nav className="support-nav__links" role="navigation" aria-label="Support navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `support-nav__link${isActive ? " is-active" : ""}`
            }
          >
            <span className="support-nav__icon" aria-hidden="true">{item.icon}</span>
            <span className="support-nav__label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
