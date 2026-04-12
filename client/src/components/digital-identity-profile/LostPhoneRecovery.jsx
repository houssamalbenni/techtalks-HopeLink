import { useState } from "react";

export default function LostPhoneRecovery() {
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="digital-vault-recovery-card">
      <div className="digital-vault-recovery-header">
        <div className="digital-vault-recovery-warning-icon">⚠</div>
        <div>
          <div className="digital-vault-recovery-title">
            Lost Phone Recovery
          </div>
        </div>
      </div>

      <p className="digital-vault-recovery-description">
        If you lose access to your device, follow these steps to securely
        recover your identity vault from a safe location or NGO terminal.
      </p>

      <div className="digital-vault-recovery-steps">
        <div className="digital-vault-recovery-step">
          <div className="digital-vault-recovery-step-num">1</div>
          <div>
            <div className="digital-vault-recovery-step-title">
              Locate a Trusted Terminal
            </div>
            <div className="digital-vault-recovery-step-sub">
              Visit a registered NGO shelter or partner facility.
            </div>
          </div>
        </div>
        <div className="digital-vault-recovery-step">
          <div className="digital-vault-recovery-step-num">2</div>
          <div>
            <div className="digital-vault-recovery-step-title">
              Use your Master Recovery Key
            </div>
            <div className="digital-vault-recovery-step-sub">
              Enter the 24-word phrase provided during setup.
            </div>
          </div>
        </div>
      </div>

      <button
        className="digital-vault-recovery--view-key-btn"
        onClick={() => setShowKey(!showKey)}
      >
        🔑 {showKey ? "Hide My Recovery Key" : "View My Recovery Key"}
      </button>
      <div className="digital-vault-recovery-biometric-note">
        🔒 Requires biometric verification
      </div>

      {showKey && (
        <div className="digital-vault-recovery-key-box">
          <div className="digital-vault-recovery-key-grid">
            {[
              "apple",
              "maple",
              "river",
              "stone",
              "cloud",
              "light",
              "ocean",
              "flame",
              "cedar",
              "frost",
              "delta",
              "ember",
              "orbit",
              "prism",
              "haven",
              "trace",
              "bloom",
              "shore",
              "nexus",
              "vault",
              "zonal",
              "quill",
              "amber",
              "crest",
            ].map((word, i) => (
              <div key={i} className="digital-vault-recovery-key-word">
                <span className="digital-vault-recovery-key-num">{i + 1}.</span>{" "}
                {word}
              </div>
            ))}
          </div>
          <div className="digital-vault-recovery-key-warning">
            ⚠ Never share this key. Store it offline in a safe place.
          </div>
        </div>
      )}
    </div>
  );
}
