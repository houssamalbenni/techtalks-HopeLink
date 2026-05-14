import React from "react";
import SupportNavbar from "../support-nav/SupportNavbar";
import "./MentalHealth.css";
import { useNavigate } from "react-router-dom";

const mentalHealthNavItems = [
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

export default function MentalHealth() {
  const navigate = useNavigate();

  return (
    <div className="mental-page">
      <SupportNavbar navItems={mentalHealthNavItems} />
      <div className="mental-container">
        <main className="mental-main">
          <div className="mental-topbar">
            <div className="mental-title">
              <h1>Mental Health Hub</h1>
              <p>Resources and exercises to support emotional wellbeing.</p>
            </div>
            <div className="mental-actions">
              <button className="mh-btn" onClick={() => navigate('/interactive-exercises')}>Interactive Exercises</button>
              <button className="mh-btn mh-primary" onClick={() => navigate('/support-home')}>Support Library</button>
            </div>
          </div>

          <section className="mh-grid">
            <article className="mh-card">
              <h3>Quick breathing</h3>
              <p>Short guided breathing exercises to regain calm.</p>
              <div className="mh-card-actions">
                <button onClick={() => navigate('/support-home/breathing/box-breathing')}>Try</button>
              </div>
            </article>

            <article className="mh-card">
              <h3>Ambient sounds</h3>
              <p>Background soundscapes for focus and relaxation.</p>
              <div className="mh-card-actions">
                <button onClick={() => navigate('/interactive-exercises')}>Open</button>
              </div>
            </article>

            <article className="mh-card">
              <h3>Talk to a counselor</h3>
              <p>Request live support from a trained counselor.</p>
              <div className="mh-card-actions">
                <button onClick={() => navigate('/support-home')}>Request</button>
              </div>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
}
