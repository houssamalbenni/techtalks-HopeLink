import { Link } from "react-router-dom";
import "./quick-library.css";
import abstractImage from "./article-4.svg";

export default function RebuildingLives() {
  return (
    <main className="page article-4">
      <div className="shell">
        <header className="hero">
          <div className="breadcrumb">
            <Link to="/support-home">Support Home</Link>
            <span>/</span>
            <span>Quick Support Library</span>
          </div>
          <h1>Rebuilding Lives: Support Homes for Displaced Families</h1>
          <p>
            Support homes help displaced families regain stability. They provide
            a steady base for education, health services, and long term recovery
            planning.
          </p>
          <div className="meta">
            <span>7 min read</span>
            <span className="dot" />
            <span className="pill">Recovery</span>
            <span className="pill">Long term care</span>
          </div>
        </header>

        <div className="content">
          <article className="article">
            <img src={abstractImage} alt="Abstract support home landscape" />
            <section>
              <h2>The path from crisis to recovery</h2>
              <p>
                Recovery happens in small stages. Support homes create the
                conditions for families to rebuild documents, connect to
                services, and plan the months ahead.
              </p>
            </section>

            <section>
              <h2>Three pillars of recovery</h2>
              <div className="steps">
                <div className="step">
                  <div>
                    <strong>Learning and routine.</strong>
                    <p>Child friendly learning spaces restore confidence.</p>
                  </div>
                </div>
                <div className="step">
                  <div>
                    <strong>Health access.</strong>
                    <p>Regular checkups support physical and mental stability.</p>
                  </div>
                </div>
                <div className="step">
                  <div>
                    <strong>Community planning.</strong>
                    <p>Families receive guidance for housing and work options.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2>Why patience matters</h2>
              <div className="callout">
                Recovery is not linear. Support homes help people move forward
                without pressure, and restore choice in daily life.
              </div>
            </section>

            <section>
              <h2>How to support recovery</h2>
              <ul className="checklist">
                <li>Offer classes or language support for families.</li>
                <li>Provide transport for school and medical visits.</li>
                <li>Help locate safe housing options beyond emergency stays.</li>
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
              <h3>Next read</h3>
              <p>See how housing keeps civilians safe day to day.</p>
              <Link to="/support-home/articles/roof-of-hope">A Roof of Hope</Link>
            </div>
          </aside>
        </div>

        <div className="footer-nav">
          <Link className="footer-link" to="/support-home/articles/hope-under-fire">
            Previous: Hope Under Fire
          </Link>
          <Link className="footer-link" to="/support-home/articles/roof-of-hope">
            Next: A Roof of Hope
          </Link>
        </div>
      </div>
    </main>
  );
}
