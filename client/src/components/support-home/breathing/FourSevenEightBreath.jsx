import { Link } from "react-router-dom";
import "./BreathingArticle.css";
import heroImage from "./breathing-2.svg";

export default function FourSevenEightBreath() {
  return (
    <section className="breathing-page breathing-478">
      <div className="breathing-shell">
        <header className="breathing-hero">
          <div className="breathing-crumbs">
            <Link to="/support-home">Support Home</Link>
            <span>/</span>
            <span>Breathing Exercises</span>
          </div>
          <h1>4-7-8 Breath</h1>
          <p>
            A longer exhale to signal safety. Helpful before sleep or when
            anxiety spikes.
          </p>
          <div className="breathing-meta">
            <span>3 min</span>
            <span className="breathing-dot" />
            <span className="breathing-pill">Long exhale</span>
            <span className="breathing-pill">Deep calm</span>
          </div>
        </header>

        <div className="breathing-body">
          <img className="breathing-hero-image" src={heroImage} alt="4-7-8 breathing guide" />
          <div className="breathing-steps">
            <div className="breathing-step">
              <div>
                <strong>Inhale for 4.</strong>
                <p>Let the breath fill your lower ribs.</p>
              </div>
            </div>
            <div className="breathing-step">
              <div>
                <strong>Hold for 7.</strong>
                <p>Keep the jaw loose and shoulders low.</p>
              </div>
            </div>
            <div className="breathing-step">
              <div>
                <strong>Exhale for 8.</strong>
                <p>Release slowly, like fog leaving a mirror.</p>
              </div>
            </div>
          </div>

          <div className="breathing-callout">
            Repeat four cycles. If the count is too long, reduce to 3-5-6.
          </div>
        </div>

        <div className="breathing-footer">
          <Link className="breathing-link" to="/support-home/breathing/extended-exhale">
            Next: Extended Exhale
          </Link>
          <Link className="breathing-link" to="/support-home">
            Back to Support Home
          </Link>
        </div>
      </div>
    </section>
  );
}
