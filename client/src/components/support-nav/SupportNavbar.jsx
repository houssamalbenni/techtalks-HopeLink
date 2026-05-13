import { NavLink } from "react-router-dom";
import "./SupportNavbar.css";

const navItems = [
  { label: "Support Home", path: "/support-home" },
  { label: "Interactive Exercises", path: "/interactive-exercises" },
];

export default function SupportNavbar() {
  return (
    <header className="support-nav">
      <div className="support-nav__brand">
        <div className="support-nav__logo" aria-hidden="true" />
        <div>
          <p className="support-nav__title">HopeLink</p>
          <p className="support-nav__tag">Care & Calm Hub</p>
        </div>
      </div>
      <nav className="support-nav__links">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `support-nav__link${isActive ? " is-active" : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
