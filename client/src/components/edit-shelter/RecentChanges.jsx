// components/RecentChanges.jsx

// Static mock audit trail – in a real app this comes from an API
const MOCK_CHANGES = [
  {
    id: 1,
    icon: "🛏",
    title: "Capacity Updated",
    detail: "Changed total capacity from 150 to 160.",
    time: "Today at 10:23 AM",
    author: "Dr. Admin",
  },
  {
    id: 2,
    icon: "📞",
    title: "Contact Updated",
    detail: "Changed phone number to (415) 555-0200.",
    time: "Yesterday at 2:15 PM",
    author: "Jane Smith",
  },
  {
    id: 3,
    icon: "📋",
    title: "Description Revised",
    detail: "Mission statement updated to reflect new programs.",
    time: "Oct 20, 2026 at 9:00 AM",
    author: "Dr. Admin",
  },
];

export default function RecentChanges({ extraChanges = [] }) {
  const changes = [...MOCK_CHANGES, ...extraChanges];

  return (
    <div className="form-card">
      <div className="section-header">
        <div className="section-title">
          <span className="section-icon">🕓</span>
          Recent Changes
        </div>
      </div>

      <div className="recent-changes-list">
        {changes.map((c) => (
          <div key={c.id} className="change-item">
            <div className="change-icon-wrap">{c.icon}</div>
            <div className="change-body">
              <div className="change-title">{c.title}</div>
              <div className="change-detail">{c.detail}</div>
              <div className="change-meta">
                {c.time} by <span>{c.author}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
