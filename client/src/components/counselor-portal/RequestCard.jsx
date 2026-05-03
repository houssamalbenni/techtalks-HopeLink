export default function RequestCard({ request }) {
  return (
    <div className={`portal-request ${request.tone}`}>
      <div className="portal-request-icon">!</div>
      <div className="portal-request-body">
        <div className="portal-request-title">{request.type}</div>
        <div className="portal-request-note">{request.note}</div>
        <div className={`portal-request-tag ${request.tone}`}>{request.priority}</div>
      </div>
      <div className="portal-request-meta">
        <div className="portal-request-time">{request.time}</div>
        <button className="portal-request-action" type="button">Accept</button>
      </div>
    </div>
  );
}
