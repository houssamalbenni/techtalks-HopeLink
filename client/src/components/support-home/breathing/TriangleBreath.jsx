import { Link } from "react-router-dom";
import "./BreathingArticle.css";
import heroImage from "./breathing-4.svg";

export default function TriangleBreath() {
  return (
    <section className="breathing-page breathing-triangle">
      <div className="breathing-shell">
        <header className="breathing-hero">
          <div className="breathing-crumbs">
            <Link to="/support-home">Support Home</Link>
            <span>/</span>
            <span>Breathing Exercises</span>
          </div>
          <h1>Triangle Breath</h1>
          <p>
            Three equal counts help you focus quickly. This is a strong option
            when you feel scattered or rushed.
          </p>
          <div className="breathing-meta">
            <span>4 min</span>
            <span className="breathing-dot" />
            <span className="breathing-pill">Even counts</span>
            <span className="breathing-pill">Quick focus</span>
          </div>
        </header>

        <div className="breathing-body">
          <img className="breathing-hero-image" src={heroImage} alt="Triangle breathing guide" />
          <div className="breathing-steps">
            <div className="breathing-step">
              <div>
                <strong>Inhale for 4.</strong>
                <p>Feel the chest and ribs expand.</p>
              </div>
            </div>
            <div className="breathing-step">
              <div>
                <strong>Hold for 4.</strong>
                <p>Notice the pause without tension.</p>
              </div>
            </div>
            <div className="breathing-step">
              <div>
                <strong>Exhale for 4.</strong>
                <p>Let the breath leave smoothly and fully.</p>
              </div>
            </div>
          </div>

          <div className="breathing-callout">
            Repeat five cycles. Reduce the count if you feel strained.
          </div>
        </div>

        <div className="breathing-footer">
          <Link className="breathing-link" to="/support-home/breathing/box-breathing">
            Back: Box Breathing
          </Link>
          <Link className="breathing-link" to="/support-home">
            Back to Support Home
          </Link>
        </div>
      </div>
    </section>
  );
}
