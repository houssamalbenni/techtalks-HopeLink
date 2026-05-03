import { useState, useEffect } from 'react';
import { getNgoRequests } from '../../services/ngoService';

const AidRequestQueue = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await getNgoRequests();
        const payload = res?.data || res;
        const items = Array.isArray(payload) ? payload : payload?.requests || payload?.request || [];
        // normalize to a simple shape
        const normalized = items.map((it) => ({
          id: it._id || it.id,
          title: it.service?.title || 'Request',
          desc: it.description || '',
          location: it.service?.address?.display || it.service?.address?.city || 'Unknown',
          time: it.createdAt ? new Date(it.createdAt).toLocaleString() : '',
          raw: it,
        }));
        setRequests(normalized);
      } catch (err) {
        console.error('Failed to load NGO requests', err);
        setError(err.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

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
        {!loading && requests.length === 0 && <p>No requests found.</p>}
        {requests.map((req) => (
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
