import { useState } from "react";

// Enhanced Realistic QR Code Component
function QRCode() {
  // Generate a realistic QR code pattern (21x21 grid simulating QR-M encoding)
  const generateQRPattern = () => {
    const size = 21;
    const pattern = Array(size)
      .fill(null)
      .map(() => Array(size).fill(0));

    // Corner patterns (3x3 with border)
    const drawCorner = (startX, startY) => {
      const corner = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
      ];
      for (let y = 0; y < 7; y++) {
        for (let x = 0; x < 7; x++) {
          if (startY + y < size && startX + x < size) {
            pattern[startY + y][startX + x] = corner[y][x];
          }
        }
      }
    };

    // Draw all three corner patterns
    drawCorner(0, 0); // Top-left
    drawCorner(size - 7, 0); // Top-right
    drawCorner(0, size - 7); // Bottom-left

    // Separation patterns (white space around corners)
    for (let i = 0; i < size; i++) {
      if (pattern[7][i] === 0) pattern[7][i] = 0;
      if (pattern[i][7] === 0) pattern[i][7] = 0;
    }

    // Timing patterns (alternating black/white lines)
    for (let i = 8; i < size - 8; i++) {
      pattern[6][i] = i % 2;
      pattern[i][6] = i % 2;
    }

    // Format information areas (blank for simplicity)
    for (let i = 0; i < 9; i++) {
      pattern[8][i] = 0;
      pattern[i][8] = 0;
    }

    // Random data pattern for middle areas (realistic look)
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (
          pattern[y][x] === 0 &&
          !(y <= 7 && x <= 7) &&
          !(y <= 7 && x >= size - 8) &&
          !(y >= size - 8 && x <= 7) &&
          y !== 6 &&
          x !== 6
        ) {
          pattern[y][x] = Math.random() > 0.5 ? 1 : 0;
        }
      }
    }

    return pattern;
  };

  const qrPattern = generateQRPattern();
  const moduleSize = 7; // Size of each QR module in SVG
  const svgSize = 21 * moduleSize + 14; // 21 modules + padding

  return (
    <div className="digital-vault-qr-wrapper">
      <div className="digital-vault-qr-container">
        <svg
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          style={{ borderRadius: 8 }}
        >
          <defs>
            <filter id="qrShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="1" floodOpacity="0.3" />
            </filter>
          </defs>
          {/* Background */}
          <rect
            width={svgSize}
            height={svgSize}
            fill="#ffffff"
            rx="8"
            filter="url(#qrShadow)"
          />

          {/* QR Pattern */}
          {qrPattern.map((row, y) =>
            row.map((cell, x) =>
              cell === 1 ? (
                <rect
                  key={`${x}-${y}`}
                  x={x * moduleSize + 7}
                  y={y * moduleSize + 7}
                  width={moduleSize}
                  height={moduleSize}
                  fill="#000000"
                  rx="0.5"
                />
              ) : null,
            ),
          )}

          {/* Optional: Decorative center logo area */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r="12"
            fill="#ffffff"
            opacity="0.95"
          />
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r="10"
            fill="none"
            stroke="#4f8ef7"
            strokeWidth="1.5"
            opacity="0.6"
          />
        </svg>
      </div>
      <div className="digital-vault-qr-label">Scan to Access</div>
    </div>
  );
}

export default function SecureAccessSharing() {
  const [doc, setDoc] = useState("National_ID_Passport.pdf");
  const [duration, setDuration] = useState("1 Hour");
  const [role, setRole] = useState("NGO Worker");

  return (
    <div className="digital-vault-sharing-card">
      <div className="digital-vault-sharing-header">
        <span className="digital-vault-sharing-title-icon">📡</span>
        <div>
          <div className="digital-vault-sharing-title">
            Secure Access Sharing
          </div>
          <div className="digital-vault-sharing-sub">
            Generate time-bound access for NGOs or authorities.
          </div>
        </div>
      </div>

      <div className="digital-vault-sharing-body">
        <QRCode />
        <div className="digital-vault-sharing-form-col">
          <label className="digital-vault-sharing-label">
            Select Documents to Share
          </label>
          <div className="digital-vault-sharing-select-wrap">
            <select
              className="digital-vault-sharing-select"
              value={doc}
              onChange={(e) => setDoc(e.target.value)}
            >
              <option>National_ID_Passport.pdf</option>
              <option>Vaccination_Record_AK.enc</option>
              <option>Marriage_Certificate.pdf</option>
            </select>
            <span className="digital-vault-sharing-chevron">▾</span>
          </div>

          <div className="digital-vault-sharing-two-col">
            <div>
              <label className="digital-vault-sharing-label">
                Access Duration
              </label>
              <div className="digital-vault-sharing-select-wrap">
                <select
                  className="digital-vault-sharing-select"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                >
                  <option>1 Hour</option>
                  <option>6 Hours</option>
                  <option>24 Hours</option>
                  <option>7 Days</option>
                </select>
                <span className="digital-vault-sharing-chevron">▾</span>
              </div>
            </div>
            <div>
              <label className="digital-vault-sharing-label">
                Recipient Role
              </label>
              <div className="digital-vault-sharing-select-wrap">
                <select
                  className="digital-vault-sharing-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option>NGO Worker</option>
                  <option>UNHCR Official</option>
                  <option>Medical Staff</option>
                  <option>Border Authority</option>
                </select>
                <span className="digital-vault-sharing-chevron">▾</span>
              </div>
            </div>
          </div>

          <div className="digital-vault-sharing-generate-row">
            <button className="digital-vault-sharing-generate-btn">
              Generate New Link
            </button>
            <button className="digital-vault-sharing-refresh-btn">↻</button>
          </div>
        </div>
      </div>
    </div>
  );
}
