import { Link } from "react-router-dom";
import "./quick-library.css";
import abstractImage from "./article-1.svg";

export default function StandingTogetherInCrisis() {
  return (
    <main className="page article-1">
      <div className="shell">
        <header className="hero">
          <div className="breadcrumb">
            <Link to="/support-home">Support Home</Link>
            <span>/</span>
            <span>Quick Support Library</span>
          </div>
          <h1>
            Standing Together in Crisis: How Support Homes Shelter Families
            During War
          </h1>
          <p>
            In the middle of conflict, a support home offers more than shelter.
            It creates safety, routine, and the chance for families to stay
            together during the most uncertain days.
          </p>
          <div className="meta">
            <span>7 min read</span>
            <span className="dot" />
            <span className="pill">Family safety</span>
            <span className="pill">Immediate care</span>
          </div>
        </header>

        <div className="content">
          <article className="article">
            <img src={abstractImage} alt="Abstract support home landscape" />
            <section>
              <h2>What a support home provides first</h2>
              <p>
                Safe shelter is the beginning. A support home also offers clean
                water, warm meals, hygiene supplies, and a place for families to
                rest together. These basics calm the body and reduce panic.
              </p>
            </section>

            <section>
              <h2>How stability is rebuilt</h2>
              <div className="steps">
                <div className="step">
                  <div>
                    <strong>Check in immediately.</strong>
                    <p>
                      Families are welcomed, oriented to the space, and shown
                      where to find support.
                    </p>
                  </div>
                </div>
                <div className="step">
                  <div>
                    <strong>Create small routines.</strong>
                    <p>
                      Meal times, quiet hours, and shared tasks restore a sense
                      of predictability.
                    </p>
                  </div>
                </div>
                <div className="step">
                  <div>
                    <strong>Keep people together.</strong>
                    <p>
                      Support homes prioritize family unity to reduce fear and
                      separation stress.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2>Why it matters</h2>
              <div className="callout">
                When people feel safe enough to sleep, eat, and breathe more
                steadily, they can make clearer decisions and care for one
                another.
              </div>
            </section>

            <section>
              <h2>Ways communities can help</h2>
              <ul className="checklist">
                <li>Provide blankets, food staples, and hygiene kits.</li>
                <li>Offer transportation for families to reach safe sites.</li>
                <li>Share local information in clear, simple language.</li>
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
              <p>See how support homes adapt inside conflict zones.</p>
              <Link to="/support-home/articles/safe-haven-conflict-zones">
                Safe Haven in Hard Times
              </Link>
            </div>
          </aside>
        </div>

        <div className="footer-nav">
          <Link
            className="footer-link"
            to="/support-home/articles/safe-haven-conflict-zones"
          >
            Next: Safe Haven in Hard Times
          </Link>
          <Link className="footer-link" to="/support-home">
            Back to Support Home
          </Link>
        </div>
      </div>
    </main>
  );
}
