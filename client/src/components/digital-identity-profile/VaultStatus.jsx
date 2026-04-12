import { useState } from "react";

export default function VaultStatus() {
  const [locked, setLocked] = useState(true);

  return (
    <div className="digital-vault-status-row">
      {/* Vault locked card */}
      <div className="digital-vault-status-card">
        <div className="digital-vault-status-left">
          <div className="digital-vault-status-lock-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              {/* Vault box main body */}
              <rect
                x="3"
                y="10"
                width="18"
                height="11"
                rx="2"
                stroke="#4f8ef7"
                strokeWidth="2"
                fill="none"
              />
              {/* Vault door */}
              <rect
                x="5"
                y="12"
                width="14"
                height="7"
                rx="1"
                stroke="#4f8ef7"
                strokeWidth="1.5"
                fill="none"
              />
              {/* Vault handle/lock mechanism */}
              <path
                d="M8 8v2"
                stroke="#4f8ef7"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M16 8v2"
                stroke="#4f8ef7"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M8 6a4 4 0 0 1 8 0"
                stroke="#4f8ef7"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Center lock dial */}
              <circle cx="12" cy="15.5" r="1.5" fill="#4f8ef7" />
              <circle
                cx="12"
                cy="15.5"
                r="2.5"
                fill="none"
                stroke="#4f8ef7"
                strokeWidth="1"
                opacity="0.6"
              />
            </svg>
          </div>
          <div>
            <div className="digital-vault-status-title">
              Vault is Locked &amp; Secure
            </div>
            <div className="digital-vault-status-sub">
              All documents are encrypted. Only you hold the decryption keys.
            </div>
            <div className="digital-vault-status-badges">
              <span
                className="digital-vault-status-badge"
                style={{
                  color: "#4ade80",
                  background: "rgba(74,222,128,0.1)",
                  border: "1px solid rgba(74,222,128,0.2)",
                }}
              >
                Zero-Knowledge
              </span>
              <span
                className="digital-vault-status-badge"
                style={{
                  color: "#4f8ef7",
                  background: "rgba(79,142,247,0.1)",
                  border: "1px solid rgba(79,142,247,0.2)",
                }}
              >
                ⊕ Biometric Auth Ready
              </span>
            </div>
          </div>
        </div>
        <div className="digital-vault-status-right">
          <div className="digital-vault-status-label">Vault Status</div>
          <div
            className="digital-vault-status-toggle"
            style={{ background: locked ? "#4f8ef7" : "#2a3352" }}
            onClick={() => setLocked(!locked)}
          >
            <div
              className="digital-vault-status-toggle-thumb"
              style={{
                transform: locked ? "translateX(18px)" : "translateX(2px)",
              }}
            />
          </div>
          <div
            className="digital-vault-status-badge-locked"
            style={{ color: locked ? "#4f8ef7" : "#4ade80" }}
          >
            {locked ? "Locked" : "Unlocked"}
          </div>
        </div>
      </div>

      {/* Storage capacity */}
      <div className="digital-vault-storage-card">
        <div className="digital-vault-storage-header">
          <span className="digital-vault-storage-title">Storage Capacity</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <rect
              x="3"
              y="3"
              width="7"
              height="7"
              rx="1"
              stroke="#4a5578"
              strokeWidth="1.5"
            />
            <rect
              x="14"
              y="3"
              width="7"
              height="7"
              rx="1"
              stroke="#4a5578"
              strokeWidth="1.5"
            />
            <rect
              x="3"
              y="14"
              width="7"
              height="7"
              rx="1"
              stroke="#4a5578"
              strokeWidth="1.5"
            />
            <rect
              x="14"
              y="14"
              width="7"
              height="7"
              rx="1"
              stroke="#4a5578"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <div className="digital-vault-storage-amount">
          <span className="digital-vault-storage-num">45</span>
          <span className="digital-vault-storage-mb"> MB / 500 MB</span>
        </div>
        <div className="digital-vault-storage-bar">
          <div
            className="digital-vault-storage-fill"
            style={{ width: "9%", background: "#4f8ef7" }}
          />
          <div
            className="digital-vault-storage-fill"
            style={{ width: "2%", background: "#4ade80", marginLeft: 2 }}
          />
          <div
            className="digital-vault-storage-fill"
            style={{ width: "1%", background: "#e05c8a", marginLeft: 2 }}
          />
        </div>
        <div className="digital-vault-storage-legend">
          <span style={{ color: "#4f8ef7" }}>● IDs (32MB)</span>
          <span style={{ color: "#4ade80" }}>● Medical (10MB)</span>
          <span style={{ color: "#e05c8a" }}>● Family (3MB)</span>
        </div>
        <button className="digital-vault-storage-manage-btn">
          Manage Storage
        </button>
      </div>
    </div>
  );
}
