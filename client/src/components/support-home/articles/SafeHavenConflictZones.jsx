import { Link } from "react-router-dom";
import "./quick-library.css";
import abstractImage from "./article-2.svg";

export default function SafeHavenConflictZones() {
  return (
    <main className="page article-2">
      <div className="shell">
        <header className="hero">
          <div className="breadcrumb">
            <Link to="/support-home">Support Home</Link>
            <span>/</span>
            <span>Quick Support Library</span>
          </div>
          <h1>
            Safe Haven in Hard Times: The Role of Support Homes in Conflict
            Zones
          </h1>
          <p>
            Support homes in conflict zones serve as protected islands. They
            coordinate safety, food, and information so families can recover
            from shock and plan their next steps.
          </p>
          <div className="meta">
            <span>6 min read</span>
            <span className="dot" />
            <span className="pill">Protection</span>
            <span className="pill">Community care</span>
          </div>
        </header>

        <div className="content">
          <article className="article">
            <img src={abstractImage} alt="Abstract support home landscape" />
            <section>
              <h2>What makes a space feel safe</h2>
              <p>
                Safety is more than locked doors. It includes clear signage,
                predictable routines, and a calm team that helps people find
                answers quickly.
              </p>
            </section>

            <section>
              <h2>Core support systems</h2>
              <div className="steps">
                <div className="step">
                  <div>
                    <strong>Reliable communication.</strong>
                    <p>
                      Families receive updates on services, transport, and next
                      steps.
                    </p>
                  </div>
                </div>
                <div className="step">
                  <div>
                    <strong>Health and hygiene support.</strong>
                    <p>
                      Clinics, first aid, and hygiene stations prevent illness
                      and reduce stress.
                    </p>
                  </div>
                </div>
                <div className="step">
                  <div>
                    <strong>Protection for children.</strong>
                    <p>
                      Safe play areas and supervised spaces help children relax
                      and feel secure.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2>How communities strengthen these spaces</h2>
              <div className="callout">
                Volunteer teams, local partnerships, and cultural awareness turn
                a shelter into a place of belonging rather than a temporary
                stop.
              </div>
            </section>

            <section>
              <h2>What you can do</h2>
              <ul className="checklist">
                <li>Coordinate transport for families arriving late.</li>
                <li>Share accurate local updates in multiple languages.</li>
                <li>Offer childcare or safe play support.</li>
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
              <p>See why emergency housing stabilizes communities.</p>
              <Link to="/support-home/articles/hope-under-fire">
                Hope Under Fire
              </Link>
            </div>
          </aside>
        </div>

        <div className="footer-nav">
          <Link
            className="footer-link"
            to="/support-home/articles/standing-together-in-crisis"
          >
            Previous: Standing Together in Crisis
          </Link>
          <Link className="footer-link" to="/support-home/articles/hope-under-fire">
            Next: Hope Under Fire
          </Link>
        </div>
      </div>
    </main>
  );
}
