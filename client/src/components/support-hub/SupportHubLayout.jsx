import { NavLink } from "react-router-dom";
import "./SupportHubLayout.css";

const hubLinks = [
  { label: "Support Home", path: "/support-home" },
  { label: "Interactive Exercises", path: "/interactive-exercises" },
  { label: "Counselor Portal", path: "/counselor-portal" },
];

export default function SupportHubLayout({ title, subtitle, children }) {
  return (
    <div className="support-hub">
      <aside className="support-hub__sidebar">
        <div className="support-hub__brand">
          <div className="support-hub__logo" aria-hidden="true" />
          <div>
            <p className="support-hub__name">HopeLink</p>
            <p className="support-hub__tag">Care & Calm Hub</p>
          </div>
        </div>
        <nav className="support-hub__nav">
          {hubLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `support-hub__nav-link${isActive ? " is-active" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="support-hub__note">
          Your space for focused support, quick resets, and live counseling.
        </div>
      </aside>

      <div className="support-hub__main">
        <header className="support-hub__topbar">
          <div className="support-hub__title">
            <h1>{title}</h1>
            {subtitle ? <p>{subtitle}</p> : null}
          </div>
          <div className="support-hub__switch">
            {hubLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `support-hub__pill${isActive ? " is-active" : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </header>

        <div className="support-hub__content">{children}</div>
      </div>
    </div>
  );
}
