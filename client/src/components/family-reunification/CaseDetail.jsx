import { useRef } from 'react';

const CaseDetail = () => {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files) {
      console.log('Files selected:', files);
      // Handle file upload here
    }
  };

  return (
    <div className="fr-right-panel">

      {/* Case Header */}
      <div className="fr-case-header">
        <div className="fr-case-header-left">
          <div className="fr-case-icon">
            <svg viewBox="0 0 24 24" className="fr-case-icon-svg">
              <defs>
                <linearGradient id="caseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1e40af" />
                </linearGradient>
              </defs>
              <circle cx="12" cy="12" r="11" fill="url(#caseGradient)" opacity="0.2" />
              <circle cx="12" cy="12" r="10" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.4" />
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="#3b82f6" />
            </svg>
          </div>
          <div>
            <h2 className="fr-case-title">Case #FR-2023-892</h2>
            <div className="fr-case-meta">
              <span>Initiated on Oct 12, 2023</span>
              <div className="fr-case-meta-dot" />
              <span className="fr-active-search">● Active Search</span>
            </div>
          </div>
        </div>
        <button className="fr-mark-done-btn">Mark as done</button>
      </div>

      {/* Info Cards */}
      <div className="fr-info-row">
        <div className="fr-info-card">
          <p className="fr-info-card-label">Target Individual</p>
          <div className="fr-info-card-value-row">
            <div>
              <p className="fr-info-card-value">Tariq K. <span style={{ color: '#6b7db3', fontSize: '11px', fontWeight: 400 }}>(Alias/Masked)</span></p>
              <p className="fr-info-card-sub">Relation: Brother</p>
            </div>
            <div className="fr-info-card-icon">
              <svg viewBox="0 0 24 24" style={{ fill: '#4a5580' }}>
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="fr-info-card">
          <p className="fr-info-card-label">Last Known Location</p>
          <div className="fr-info-card-value-row">
            <div>
              <p className="fr-info-card-value">Aleppo Region <span style={{ color: '#6b7db3', fontSize: '11px', fontWeight: 400 }}>(Approx)</span></p>
              <p className="fr-info-card-sub">Date: Sep 2023</p>
            </div>
            <div className="fr-info-card-icon">
              <svg viewBox="0 0 24 24" style={{ fill: '#3b82f6' }}>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="fr-info-card">
          <p className="fr-info-card-label">Data Clearance</p>
          <div className="fr-info-card-value-row">
            <div>
              <p className="fr-info-card-value" style={{ color: '#10b981' }}>Level 2 Verified</p>
              <p className="fr-info-card-sub">Via Digital Identity Vault</p>
            </div>
            <div className="fr-info-card-icon">
              <svg viewBox="0 0 24 24" style={{ fill: '#6b7db3' }}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Associated Documents */}
      <div>
        <div className="fr-section-header">
          <div className="fr-section-title">
            <svg viewBox="0 0 24 24">
              <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
            </svg>
            Associated Documents
          </div>
          <span className="fr-open-vault-link">Open ID Vault ↗</span>
        </div>

        <div className="fr-docs-grid">
          <div className="fr-doc-card fr-doc-interactive">
            <span className="fr-doc-verified">Verified</span>
            <div className="fr-doc-icon" style={{ background: '#1e3a6e' }}>
              <svg viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
              </svg>
            </div>
            <p className="fr-doc-name">Family Photo.enc</p>
            <p className="fr-doc-meta">2.4 MB • Uploaded Oct 12</p>
          </div>

          <div className="fr-doc-card fr-doc-interactive">
            <span className="fr-doc-verified">Verified</span>
            <div className="fr-doc-icon" style={{ background: '#3b1e6e' }}>
              <svg viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
              </svg>
            </div>
            <p className="fr-doc-name">Marriage_Cert.enc</p>
            <p className="fr-doc-meta">1.1 MB • Linked from Vault</p>
          </div>
        </div>

        <div className="fr-upload-area" onClick={handleUploadClick}>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          <svg viewBox="0 0 24 24">
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
          </svg>
          <span className="fr-upload-text">Upload new secure document</span>
        </div>
      </div>

      {/* Chat */}
      <div className="fr-chat-section">
        <div className="fr-chat-header">
          <svg viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
          </svg>
          <span className="fr-chat-title">Secure Case Notes & Comms</span>
        </div>

        <div className="fr-chat-encrypted-note">
          <svg viewBox="0 0 24 24">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
          </svg>
          End-to-end encryption enabled
        </div>

        <div className="fr-chat-messages">
          <div className="fr-msg-row">
            <div className="fr-msg-avatar">CW</div>
            <div className="fr-msg-content">
              <div className="fr-msg-meta">
                <span className="fr-msg-name">Case Worker Sarah</span>
                <span>Yesterday, 14:30</span>
              </div>
              <div className="fr-msg-bubble">
                I've forwarded the physical description to the Berlin Transit Hub. They have someone matching the profile who arrived last week. We are waiting for their local admin to confirm the visual match with the uploaded photo.
              </div>
            </div>
          </div>

          <div className="fr-msg-row right">
            <div className="fr-msg-avatar">AK</div>
            <div className="fr-msg-content">
              <div className="fr-msg-meta right">
                <span>Yesterday, 16:45</span>
                <span className="fr-msg-name">You</span>
              </div>
              <div className="fr-msg-bubble">
                Thank you Sarah. Please let me know as soon as you hear back. He also has a small scar on his left cheek which might help them identify him.
              </div>
            </div>
          </div>
        </div>

        <div className="fr-chat-input-row">
          <button className="fr-attach-btn">
            <svg viewBox="0 0 24 24">
              <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z" />
            </svg>
          </button>
          <input className="fr-chat-input" type="text" placeholder="Type a secure message or note..." />
          <button className="fr-send-btn">
            <svg viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
};

export default CaseDetail;
