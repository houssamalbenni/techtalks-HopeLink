import { Link } from "react-router-dom";
import "./BreathingArticle.css";
import heroImage from "./breathing-5.svg";

export default function ExtendedExhale() {
  return (
    <section className="breathing-page breathing-exhale">
      <div className="breathing-shell">
        <header className="breathing-hero">
          <div className="breathing-crumbs">
            <Link to="/support-home">Support Home</Link>
            <span>/</span>
            <span>Breathing Exercises</span>
          </div>
          <h1>Extended Exhale</h1>
          <p>
            Lengthening the exhale tells your nervous system it is okay to
            soften. Use this when you need calm fast.
          </p>
          <div className="breathing-meta">
            <span>3 min</span>
            <span className="breathing-dot" />
            <span className="breathing-pill">Fast calm</span>
            <span className="breathing-pill">Release tension</span>
          </div>
        </header>

        <div className="breathing-body">
          <img className="breathing-hero-image" src={heroImage} alt="Extended exhale breathing guide" />
          <div className="breathing-steps">
            <div className="breathing-step">
              <div>
                <strong>Inhale for 4.</strong>
                <p>Keep the breath light and steady.</p>
              </div>
            </div>
            <div className="breathing-step">
              <div>
                <strong>Exhale for 6.</strong>
                <p>Let the exhale be longer and softer.</p>
              </div>
            </div>
            <div className="breathing-step">
              <div>
                <strong>Pause for 2.</strong>
                <p>Notice the stillness before the next breath.</p>
              </div>
            </div>
          </div>

          <div className="breathing-callout">
            Repeat for six cycles. If needed, move to 3-5-2.
          </div>
        </div>

        <div className="breathing-footer">
          <Link className="breathing-link" to="/support-home/breathing/4-7-8-breath">
            Back: 4-7-8 Breath
          </Link>
          <Link className="breathing-link" to="/support-home">
            Back to Support Home
          </Link>
        </div>
      </div>
    </section>
  );
}
