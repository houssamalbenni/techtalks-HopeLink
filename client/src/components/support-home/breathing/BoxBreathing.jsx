import { Link } from "react-router-dom";
import "./BreathingArticle.css";
import heroImage from "./breathing-1.svg";

export default function BoxBreathing() {
  return (
    <section className="breathing-page breathing-box">
      <div className="breathing-shell">
        <header className="breathing-hero">
          <div className="breathing-crumbs">
            <Link to="/support-home">Support Home</Link>
            <span>/</span>
            <span>Breathing Exercises</span>
          </div>
          <h1>Box Breathing</h1>
          <p>
            A steady four-count cycle that helps your body feel safe and your
            mind feel clear. Great for quick resets.
          </p>
          <div className="breathing-meta">
            <span>4 min</span>
            <span className="breathing-dot" />
            <span className="breathing-pill">Steady rhythm</span>
            <span className="breathing-pill">Calm focus</span>
          </div>
        </header>

        <div className="breathing-body">
          <img className="breathing-hero-image" src={heroImage} alt="Box breathing guide" />
          <div className="breathing-steps">
            <div className="breathing-step">
              <div>
                <strong>Inhale for 4.</strong>
                <p>Let your shoulders soften as you breathe in.</p>
              </div>
            </div>
            <div className="breathing-step">
              <div>
                <strong>Hold for 4.</strong>
                <p>Notice the calm pause at the top.</p>
              </div>
            </div>
            <div className="breathing-step">
              <div>
                <strong>Exhale for 4.</strong>
                <p>Release tension slowly through the mouth.</p>
              </div>
            </div>
            <div className="breathing-step">
              <div>
                <strong>Hold for 4.</strong>
                <p>Let the stillness settle before the next inhale.</p>
              </div>
            </div>
          </div>

          <div className="breathing-callout">
            Repeat this cycle four times. If you feel lightheaded, shorten the
            counts or pause.
          </div>
        </div>

        <div className="breathing-footer">
          <Link className="breathing-link" to="/support-home/breathing/triangle-breath">
            Next: Triangle Breath
          </Link>
          <Link className="breathing-link" to="/support-home">
            Back to Support Home
          </Link>
        </div>
      </div>
    </section>
  );
}
