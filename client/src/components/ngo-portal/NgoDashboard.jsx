import "./NgoDashboard.css";

const highlights = [
  {
    title: "Aid Requests",
    body: "Review incoming requests, confirm urgency, and keep status updated for refugees and donors.",
  },
  {
    title: "Verification",
    body: "Validate user profiles and documents to keep aid distribution accurate and trusted.",
  },
  {
    title: "Shelter Capacity",
    body: "Update shelter and hospital availability so people can find real-time support.",
  },
  {
    title: "Distribution",
    body: "Track aid delivery, avoid duplicates, and keep a clear history for each case.",
  },
  {
    title: "Case Monitoring",
    body: "Follow ongoing cases, prioritize critical situations, and coordinate follow-ups.",
  },
];

const quickActions = [
  "Review urgent requests",
  "Verify pending profiles",
  "Update shelter capacity",
  "Log a distribution",
];

export default function NgoDashboard() {
  return (
    <div className="ngo-dashboard">
      <header className="ngo-hero">
        <div>
          <p className="ngo-kicker">NGO Operations</p>
          <h1>NGO Command Center</h1>
          <p className="ngo-sub">
            Coordinate requests, verify cases, and keep aid moving where it is needed most.
          </p>
        </div>
        <div className="ngo-stats">
          <div>
            <span className="ngo-stat-label">Active Cases</span>
            <span className="ngo-stat-value">48</span>
          </div>
          <div>
            <span className="ngo-stat-label">Pending Verification</span>
            <span className="ngo-stat-value">12</span>
          </div>
          <div>
            <span className="ngo-stat-label">Critical Alerts</span>
            <span className="ngo-stat-value">5</span>
          </div>
        </div>
      </header>

      <section className="ngo-grid">
        {highlights.map((item) => (
          <article key={item.title} className="ngo-card">
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </section>

      <section className="ngo-actions">
        <h2>Quick Actions</h2>
        <div className="ngo-action-list">
          {quickActions.map((action) => (
            <button key={action} type="button" className="ngo-action-btn">
              {action}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
