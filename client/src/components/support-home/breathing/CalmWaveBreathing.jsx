import { Link } from "react-router-dom";
import "./BreathingArticle.css";
import heroImage from "./breathing-3.svg";

export default function CalmWaveBreathing() {
  return (
    <section className="breathing-page breathing-wave">
      <div className="breathing-shell">
        <header className="breathing-hero">
          <div className="breathing-crumbs">
            <Link to="/support-home">Support Home</Link>
            <span>/</span>
            <span>Breathing Exercises</span>
          </div>
          <h1>Calm Wave Breathing</h1>
          <p>
            Picture a wave rising and falling. This gentle rhythm steadies your
            heartbeat and smooths stress spikes.
          </p>
          <div className="breathing-meta">
            <span>5 min</span>
            <span className="breathing-dot" />
            <span className="breathing-pill">Smooth flow</span>
            <span className="breathing-pill">Body reset</span>
          </div>
        </header>

        <div className="breathing-body">
          <img className="breathing-hero-image" src={heroImage} alt="Calm wave breathing guide" />
          <div className="breathing-steps">
            <div className="breathing-step">
              <div>
                <strong>Inhale for 5.</strong>
                <p>Let the breath rise like a wave.</p>
              </div>
            </div>
            <div className="breathing-step">
              <div>
                <strong>Exhale for 7.</strong>
                <p>Imagine the wave rolling back to shore.</p>
              </div>
            </div>
            <div className="breathing-step">
              <div>
                <strong>Pause for 2.</strong>
                <p>Rest in the stillness before the next inhale.</p>
              </div>
            </div>
          </div>

          <div className="breathing-callout">
            Continue for six cycles. Keep the breath slow and soft.
          </div>
        </div>

        <div className="breathing-footer">
          <Link className="breathing-link" to="/support-home/breathing/morning-reset">
            Next: Morning Reset Breath
          </Link>
          <Link className="breathing-link" to="/support-home">
            Back to Support Home
          </Link>
        </div>
      </div>
    </section>
  );
}
