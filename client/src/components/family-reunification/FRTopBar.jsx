import { useState } from 'react';

const FRTopBar = () => {
  const [notificationCount] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, message: 'Case #FR-2023-892: Match found in Berlin Hub', time: '5 min ago' },
    { id: 2, message: 'Case #FR-2023-741: Document verification completed', time: '1 hour ago' },
    { id: 3, message: 'Case #FR-2023-605: Manual review requested', time: '3 hours ago' },
  ];

  return (
    <div className="fr-topbar">
      <div className="fr-topbar-left">
        <h1 className="fr-topbar-title">Family Reunification Tracker</h1>
        <span className="fr-topbar-divider">|</span>
        <div className="fr-encrypted-badge">
          <svg viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
          </svg>
          End-to-End Encrypted
        </div>
      </div>
      <div className="fr-topbar-right">
        <div className="fr-notifications-wrapper">
          <button 
            className="fr-notifications-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <svg viewBox="0 0 24 24">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.46 5.36 5.82 7.93 5.82 11v5l-2 2v1h16v-1l-2-2z" />
            </svg>
            {notificationCount > 0 && (
              <span className="fr-notification-badge">{notificationCount}</span>
            )}
          </button>

          {showNotifications && (
            <div className="fr-notifications-panel">
              <div className="fr-notifications-header">
                <h3>Notifications</h3>
                <button onClick={() => setShowNotifications(false)}>✕</button>
              </div>
              <div className="fr-notifications-list">
                {notifications.map((notif) => (
                  <div key={notif.id} className="fr-notification-item">
                    <p>{notif.message}</p>
                    <span>{notif.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button className="fr-new-case-btn">
          + New Case
        </button>
        <div className="fr-expand-btn">
          <svg viewBox="0 0 24 24">
            <path d="M21 11V3h-8l3.29 3.29-10 10L3 13v8h8l-3.29-3.29 10-10z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FRTopBar;
