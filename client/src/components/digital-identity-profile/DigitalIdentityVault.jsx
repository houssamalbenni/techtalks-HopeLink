import { useState } from "react";
import Sidebar from "./Sidebar";
import VaultStatus from "./VaultStatus";
import MyDocuments from "./MyDocuments";
import SecureAccessSharing from "./SecureAccessSharing";
import LostPhoneRecovery from "./LostPhoneRecovery";
import AccessAuditLog from "./AccessAuditLog";
import "./digital-identity-vault.css";

export default function DigitalIdentityVault() {
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

        {/* Scrollable content */}
        <div className="digital-vault-content">
          <VaultStatus />
          <MyDocuments />

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
