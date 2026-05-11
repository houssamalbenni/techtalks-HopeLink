import { Link } from "react-router-dom";
import "./quick-library.css";
import abstractImage from "./article-5.svg";

export default function RoofOfHope() {
  return (
    <main className="page article-5">
      <div className="shell">
        <header className="hero">
          <div className="breadcrumb">
            <Link to="/support-home">Support Home</Link>
            <span>/</span>
            <span>Quick Support Library</span>
          </div>
          <h1>A Roof of Hope: Helping Civilians Through Support Housing</h1>
          <p>
            Support housing shields civilians from immediate danger and provides
            the stability needed to access aid, rebuild trust, and plan for the
            future.
          </p>
          <div className="meta">
            <span>6 min read</span>
            <span className="dot" />
            <span className="pill">Civilian care</span>
            <span className="pill">Stability</span>
          </div>
        </header>

        <div className="content">
          <article className="article">
            <img src={abstractImage} alt="Abstract support home landscape" />
            <section>
              <h2>The meaning of a safe roof</h2>
              <p>
                A safe roof is a signal that people are not alone. It provides
                rest, warmth, and space to regain a sense of control.
              </p>
            </section>

            <section>
              <h2>How support housing helps daily life</h2>
              <div className="steps">
                <div className="step">
                  <div>
                    <strong>Rest and recovery.</strong>
                    <p>Secure sleep improves decision making and health.</p>
                  </div>
                </div>
                <div className="step">
                  <div>
                    <strong>Access to services.</strong>
                    <p>Families can receive aid without constant relocation.</p>
                  </div>
                </div>
                <div className="step">
                  <div>
                    <strong>Community ties.</strong>
                    <p>Shared spaces reduce isolation and fear.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2>Protecting dignity</h2>
              <div className="callout">
                Clear rules, privacy areas, and respectful care help civilians
                feel seen and supported instead of processed.
              </div>
            </section>

            <section>
              <h2>Where help is needed most</h2>
              <ul className="checklist">
                <li>Family friendly bedding and privacy partitions.</li>
                <li>Supplies for infants, elders, and people with disabilities.</li>
                <li>Trusted staff to guide people through services.</li>
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
              <p>See how support homes move families from fear to safety.</p>
              <Link to="/support-home/articles/from-fear-to-safety">
                From Fear to Safety
              </Link>
            </div>
          </aside>
        </div>

        <div className="footer-nav">
          <Link className="footer-link" to="/support-home/articles/rebuilding-lives">
            Previous: Rebuilding Lives
          </Link>
          <Link className="footer-link" to="/support-home/articles/from-fear-to-safety">
            Next: From Fear to Safety
          </Link>
        </div>
      </div>
    </main>
  );
}
