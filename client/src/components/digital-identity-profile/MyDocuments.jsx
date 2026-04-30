import { useState } from "react";

const tabs = [
  "All Files (12)",
  "Personal IDs (3)",
  "Medical Records (4)",
  "Family Docs (5)",
];

const docs = [
  {
    name: "National_ID_Passport.pdf",
    date: "Oct 13, 2023 • 2.4 MB",
    tag: "Personal ID",
    tagColor: "#4f8ef7",
    icon: "📄",
    iconBg: "#1a2a4a",
  },
  {
    name: "Vaccination_Record_AK.enc",
    date: "Oct 15, 2023 • 1.1 MB",
    tag: "Medical",
    tagColor: "#4ade80",
    icon: "🔒",
    iconBg: "#1a2a1a",
  },
  {
    name: "Marriage_Certificate.pdf",
    date: "Sep 28, 2023 • 1.2 MB",
    tag: "Family Docs",
    tagColor: "#e0a850",
    icon: "📋",
    iconBg: "#2a1a0a",
  },
];

export default function MyDocuments({ documents = docs, onDelete = () => {}, disabled = false }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="digital-vault-docs-card">
      <div className="digital-vault-docs-header">
        <div className="digital-vault-docs-title-row">
          <span className="digital-vault-docs-title-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              {/* Back file */}
              <path
                d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
                fill="#4f8ef7"
                opacity="0.6"
              />
              {/* Front file */}
              <path
                d="M15 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
                fill="#4f8ef7"
                opacity="0.8"
              />
              {/* Top file */}
              <path
                d="M17 2h-7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
                fill="#4f8ef7"
              />
              {/* File fold corner */}
              <polyline
                points="17 2 17 9 24 9"
                fill="none"
                stroke="#4f8ef7"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="digital-vault-docs-title">My Documents</span>
        </div>
        <div className="digital-vault-docs-header-right">
          <div className="digital-vault-docs-search">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              style={{ marginRight: 5 }}
            >
              <circle cx="11" cy="11" r="8" stroke="#4a5578" strokeWidth="2" />
              <path
                d="M21 21l-4.35-4.35"
                stroke="#4a5578"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              className="digital-vault-docs-search-input"
              placeholder="Search files..."
            />
          </div>
          <button className="digital-vault-docs-grid-btn">⊞</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="digital-vault-docs-tabs">
        {tabs.map((tab, i) => (
          <button
            key={i}
            className={`digital-vault-docs-tab ${activeTab === i ? "digital-vault-docs-tab--active" : ""}`}
            onClick={() => setActiveTab(i)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Doc grid */}
      <div className="digital-vault-docs-grid">
        {/* Add new */}
        <div className="digital-vault-docs-add-card">
          <div className="digital-vault-docs-add-icon-wrapper">
            <div className="digital-vault-docs-add-icon">+</div>
          </div>
          <div className="digital-vault-docs-add-title">Add New Document</div>
          <div className="digital-vault-docs-add-sub">
            Scan or upload securely
          </div>
        </div>

        {documents.map((doc, i) => (
          <div
            key={i}
            className="digital-vault-docs-doc-card"
            style={{ 
              animation: `slideUp 0.6s ease-out ${i * 0.1}s both`,
              opacity: disabled ? 0.6 : 1,
              pointerEvents: disabled ? "none" : "auto",
            }}
          >
            <div className="digital-vault-docs-doc-top">
              <div
                className="digital-vault-docs-doc-icon"
                style={{ background: doc.iconBg }}
              >
                {doc.icon}
              </div>
              <button 
                className="digital-vault-docs-doc-more-btn"
                onClick={() => onDelete(doc.id)}
                disabled={disabled}
              >
                ⋮
              </button>
            </div>
            <div className="digital-vault-docs-doc-name">{doc.name}</div>
            <div className="digital-vault-docs-doc-date">{doc.date}</div>
            <div className="digital-vault-docs-doc-footer">
              <span
                className="digital-vault-docs-doc-tag"
                style={{
                  color: doc.tagColor,
                  background: doc.tagColor + "18",
                  border: `1px solid ${doc.tagColor}30`,
                }}
              >
                {doc.tag}
              </span>
              <div className="digital-vault-docs-doc-actions">
                <button className="digital-vault-docs-doc-action-btn">↓</button>
                <button className="digital-vault-docs-doc-action-btn">⇄</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
