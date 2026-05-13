import { Link } from "react-router-dom";
import "./quick-library.css";
import abstractImage from "./article-3.svg";

export default function HopeUnderFire() {
  return (
    <main className="page article-3">
      <div className="shell">
        <header className="hero">
          <div className="breadcrumb">
            <Link to="/support-home">Support Home</Link>
            <span>/</span>
            <span>Quick Support Library</span>
          </div>
          <h1>Hope Under Fire: Why Emergency Housing Matters in War</h1>
          <p>
            Emergency housing creates breathing space. It gives families time to
            recover, organize, and protect the most vulnerable members of the
            community.
          </p>
          <div className="meta">
            <span>6 min read</span>
            <span className="dot" />
            <span className="pill">Emergency relief</span>
            <span className="pill">Protection</span>
          </div>
        </header>

        <div className="content">
          <article className="article">
            <img src={abstractImage} alt="Abstract support home landscape" />
            <section>
              <h2>Why housing is the first response</h2>
              <p>
                Without stable shelter, every other service becomes harder to
                access. Housing gives families a base where care teams can reach
                them reliably.
              </p>
            </section>

            <section>
              <h2>What emergency housing unlocks</h2>
              <div className="steps">
                <div className="step">
                  <div>
                    <strong>Health continuity.</strong>
                    <p>Medical teams can track needs and provide follow up.</p>
                  </div>
                </div>
                <div className="step">
                  <div>
                    <strong>Family protection.</strong>
                    <p>Safe spaces reduce the risk of separation.</p>
                  </div>
                </div>
                <div className="step">
                  <div>
                    <strong>Information access.</strong>
                    <p>Accurate updates reach people in one place.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2>What makes it dignified</h2>
              <div className="callout">
                Dignity means privacy corners, respectful support, and clear
                choices. Emergency housing works best when people are treated as
                partners.
              </div>
            </section>

            <section>
              <h2>Support you can offer</h2>
              <ul className="checklist">
                <li>Donate bedding, blankets, and warm clothing.</li>
                <li>Provide transport for families with limited mobility.</li>
                <li>Share verified updates to reduce rumors.</li>
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
              <p>How support homes help families rebuild.</p>
              <Link to="/support-home/articles/rebuilding-lives">
                Rebuilding Lives
              </Link>
            </div>
          </aside>
        </div>

        <div className="footer-nav">
          <Link
            className="footer-link"
            to="/support-home/articles/safe-haven-conflict-zones"
          >
            Previous: Safe Haven in Hard Times
          </Link>
          <Link className="footer-link" to="/support-home/articles/rebuilding-lives">
            Next: Rebuilding Lives
          </Link>
        </div>
      </div>
    </main>
  );
}
