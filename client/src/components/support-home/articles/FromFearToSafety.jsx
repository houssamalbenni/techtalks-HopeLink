import { Link } from "react-router-dom";
import "./quick-library.css";
import abstractImage from "./article-6.svg";

export default function FromFearToSafety() {
  return (
    <main className="page article-6">
      <div className="shell">
        <header className="hero">
          <div className="breadcrumb">
            <Link to="/support-home">Support Home</Link>
            <span>/</span>
            <span>Quick Support Library</span>
          </div>
          <h1>From Fear to Safety: How Support Homes Change Lives During War</h1>
          <p>
            Moving from fear to safety is a process. Support homes provide the
            practical resources and emotional steadiness that make that shift
            possible.
          </p>
          <div className="meta">
            <span>6 min read</span>
            <span className="dot" />
            <span className="pill">Stability</span>
            <span className="pill">Resilience</span>
          </div>
        </header>

        <div className="content">
          <article className="article">
            <img src={abstractImage} alt="Abstract support home landscape" />
            <section>
              <h2>Safety starts with people</h2>
              <p>
                Teams who listen, explain, and stay calm help families feel safe
                even when circumstances are uncertain. Human connection is a
                vital part of recovery.
              </p>
            </section>

            <section>
              <h2>Key changes support homes bring</h2>
              <div className="steps">
                <div className="step">
                  <div>
                    <strong>Predictable routines.</strong>
                    <p>Consistent schedules reduce the sense of chaos.</p>
                  </div>
                </div>
                <div className="step">
                  <div>
                    <strong>Access to information.</strong>
                    <p>Clear guidance helps families make informed choices.</p>
                  </div>
                </div>
                <div className="step">
                  <div>
                    <strong>Emotional support.</strong>
                    <p>Spaces for counseling and peer support build resilience.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2>What healing can look like</h2>
              <div className="callout">
                Healing is often quiet. It can look like sleep returning, small
                laughter, or families planning their next week without panic.
              </div>
            </section>

            <section>
              <h2>How you can help</h2>
              <ul className="checklist">
                <li>Support long term housing transitions.</li>
                <li>Offer trauma informed care training for volunteers.</li>
                <li>Maintain a calm, respectful environment for families.</li>
              </ul>
            </section>
          </article>

          <aside className="aside">
            <div className="card">
              <h3>Library</h3>
              <ul>
                <li>
                  <Link to="/support-home/articles/standing-together-in-crisis">
                    Standing Together in Crisis
                  </Link>
                </li>
                <li>
                  <Link to="/support-home/articles/safe-haven-conflict-zones">
                    Safe Haven in Hard Times
                  </Link>
                </li>
                <li>
                  <Link to="/support-home/articles/hope-under-fire">
                    Hope Under Fire
                  </Link>
                </li>
                <li>
                  <Link to="/support-home/articles/rebuilding-lives">
                    Rebuilding Lives
                  </Link>
                </li>
                <li>
                  <Link to="/support-home/articles/roof-of-hope">
                    A Roof of Hope
                  </Link>
                </li>
                <li>
                  <Link to="/support-home/articles/from-fear-to-safety">
                    From Fear to Safety
                  </Link>
                </li>
              </ul>
            </div>
            <div className="card">
              <h3>Start again</h3>
              <p>Return to the beginning of the library.</p>
              <Link to="/support-home/articles/standing-together-in-crisis">
                Standing Together in Crisis
              </Link>
            </div>
          </aside>
        </div>

        <div className="footer-nav">
          <Link className="footer-link" to="/support-home/articles/roof-of-hope">
            Previous: A Roof of Hope
          </Link>
          <Link className="footer-link" to="/support-home/articles/standing-together-in-crisis">
            Start Over: Standing Together in Crisis
          </Link>
        </div>
      </div>
    </main>
  );
}
