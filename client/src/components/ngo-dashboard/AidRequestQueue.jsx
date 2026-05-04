const AidRequestQueue = ({ requests = [], loading = false, error = null }) => {
  const normalizedRequests = requests.map((request) => ({
    id: request._id || request.id,
    title: request.service?.title || request.title || 'Request',
    desc: request.description || request.notes || '',
    location:
      request.service?.address?.display ||
      request.service?.address?.city ||
      request.location ||
      'Unknown',
    time: request.createdAt ? new Date(request.createdAt).toLocaleString() : '',
    raw: request,
  }));

  return (
    <div className="section-card">
      <div className="section-header">
        <h2 className="section-title">Live Aid Request Queue</h2>
        <button className="filter-btn">
          Filter
          <svg style={{ width: 12, height: 12, fill: '#a0aec0' }} viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </button>
      </div>
      <div className="request-list">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && normalizedRequests.length === 0 && <p>No requests found.</p>}
        {normalizedRequests.map((req) => (
          <div key={req.id} className="request-item">
            <div className="request-item-header">
              <div className="request-item-title">
                <div className="request-dot" />
                {req.title}
              </div>
              <span className="request-time">{req.time}</span>
            </div>
            <p className="request-desc">{req.desc}</p>
            <div className="request-footer">
              <div className="request-location">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                {req.location}
              </div>
              <div className="request-actions">
                <button className="btn-approve">Approve</button>
                <button className="btn-review">Review</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AidRequestQueue;
