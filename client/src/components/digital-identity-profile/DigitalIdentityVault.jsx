import { useState } from "react";
import Sidebar from "./Sidebar";
import VaultStatus from "./VaultStatus";
import MyDocuments from "./MyDocuments";
import SecureAccessSharing from "./SecureAccessSharing";
import LostPhoneRecovery from "./LostPhoneRecovery";
import AccessAuditLog from "./AccessAuditLog";
import { useDigitalIdentityVault } from "./useDigitalIdentityVault";
import "./digital-identity-vault.css";

export default function DigitalIdentityVault() {
  const {
    documents,
    vaultStatus,
    loading,
    error,
    success,
    handleToggleVault,
    handleDeleteDocument,
  } = useDigitalIdentityVault();

  return (
    <div className="digital-vault-layout">
      <Sidebar />

      {/* Main content */}
      <div className="digital-vault-main">
        {/* Top bar */}
        <div className="digital-vault-topbar">
          <div className="digital-vault-topbar__left">
            <h1 className="digital-vault-topbar__title">
              Digital Identity Vault
            </h1>
            <div className="digital-vault-topbar__badge">
              <span className="digital-vault-topbar__dot" />
              AES-256 Encrypted Storage
            </div>
          </div>
          <div className="digital-vault-topbar__right">
            <button className="digital-vault-topbar__upload-btn">
              ☁ Upload Document
            </button>
            <button className="digital-vault-topbar__icon-btn">🔔</button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              padding: "12px",
              marginBottom: "16px",
              backgroundColor: "#fee",
              border: "1px solid #fcc",
              borderRadius: "8px",
              color: "#c33",
              margin: "16px",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div
            style={{
              padding: "12px",
              marginBottom: "16px",
              backgroundColor: "#efe",
              border: "1px solid #cfc",
              borderRadius: "8px",
              color: "#3c3",
              margin: "16px",
            }}
          >
            ✅ Vault operation completed successfully!
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div
            style={{
              padding: "12px",
              marginBottom: "16px",
              backgroundColor: "#eef",
              border: "1px solid #ccf",
              borderRadius: "8px",
              color: "#33c",
              margin: "16px",
            }}
          >
            ⏳ Processing vault operation...
          </div>
        )}

        {/* Scrollable content */}
        <div className="digital-vault-content">
          <VaultStatus locked={vaultStatus.locked} onToggle={handleToggleVault} disabled={loading} />
          <MyDocuments documents={documents} onDelete={handleDeleteDocument} disabled={loading} />

          {/* Two-column lower section */}
          <div className="digital-vault-two-col">
            <SecureAccessSharing />
            <LostPhoneRecovery />
          </div>

          <AccessAuditLog />
        </div>
      </div>
    </div>
  );
}
