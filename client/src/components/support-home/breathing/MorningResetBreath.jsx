import { Link } from "react-router-dom";
import "./BreathingArticle.css";
import heroImage from "./breathing-6.svg";

export default function MorningResetBreath() {
  return (
    <section className="breathing-page breathing-morning">
      <div className="breathing-shell">
        <header className="breathing-hero">
          <div className="breathing-crumbs">
            <Link to="/support-home">Support Home</Link>
            <span>/</span>
            <span>Breathing Exercises</span>
          </div>
          <h1>Morning Reset Breath</h1>
          <p>
            A gentle start to your day. This pattern brings energy without
            rushing your body.
          </p>
          <div className="breathing-meta">
            <span>5 min</span>
            <span className="breathing-dot" />
            <span className="breathing-pill">Soft energy</span>
            <span className="breathing-pill">Clear start</span>
          </div>
        </header>

        <div className="breathing-body">
          <img className="breathing-hero-image" src={heroImage} alt="Morning reset breathing guide" />
          <div className="breathing-steps">
            <div className="breathing-step">
              <div>
                <strong>Inhale for 5.</strong>
                <p>Lift the chest and lengthen the spine.</p>
              </div>
            </div>
            <div className="breathing-step">
              <div>
                <strong>Hold for 2.</strong>
                <p>Let the breath gather at the top.</p>
              </div>
            </div>
            <div className="breathing-step">
              <div>
                <strong>Exhale for 6.</strong>
                <p>Release slowly and relax the jaw.</p>
              </div>
            </div>
          </div>

          <div className="breathing-callout">
            Repeat for five cycles and then take one deep, easy breath.
          </div>
        </div>

        <div className="breathing-footer">
          <Link className="breathing-link" to="/support-home/breathing/calm-wave">
            Back: Calm Wave Breathing
          </Link>
          <Link className="breathing-link" to="/support-home">
            Back to Support Home
          </Link>
        </div>
      </div>
    </section>
  );
}
