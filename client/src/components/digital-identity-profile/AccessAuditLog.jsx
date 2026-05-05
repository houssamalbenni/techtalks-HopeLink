const logs = [
  {
    timestamp: "Oct 24, 2023",
    time: "11:42:05 UTC",
    action: "View",
    actionColor: "#4f8ef7",
    actionBg: "rgba(79,142,247,0.12)",
    document: "National_ID_Passport.pdf",
    accessor: "UNHCR Clinic #4",
    accessorSub: "Auth: QR Link RS1",
    location: "Berlin Transit Hub",
    ip: "32.57.4.112",
    status: "ok",
  },
  {
    timestamp: "Oct 23, 2023",
    time: "09:11:34 UTC",
    action: "Download",
    actionColor: "#4ade80",
    actionBg: "rgba(74,222,128,0.1)",
    document: "Vaccination_Record_AK.enc",
    accessor: "Self (Owner)",
    accessorSub: "Auth: Biometric",
    location: "Mobile App",
    ip: "",
    status: "ok",
  },
  {
    timestamp: "Oct 20, 2023",
    time: "19:44:12 UTC",
    action: "Denied",
    actionColor: "#e05c5c",
    actionBg: "rgba(224,92,92,0.1)",
    document: "Marriage_Certificate.pdf",
    accessor: "Unknown Requester",
    accessorSub: "Add to blocklist",
    location: "Unknown Location",
    ip: "IP Masked",
    status: "err",
  },
];

export default function AccessAuditLog() {
  return (
    <div className="digital-vault-audit-card">
      <div className="digital-vault-audit-header">
        <div className="digital-vault-audit-title-row">
          <span className="digital-vault-audit-title-icon">📋</span>
          <div>
            <div className="digital-vault-audit-title">Access Audit Log</div>
            <div className="digital-vault-audit-sub">
              Track who accessed your documents and when.
            </div>
          </div>
        </div>
        <button className="digital-vault-audit-export-btn">↓ Export Log</button>
      </div>

      <div className="digital-vault-audit-table-wrap">
        <table className="digital-vault-audit-table">
          <thead>
            <tr>
              {[
                "TIMESTAMP",
                "ACTION",
                "DOCUMENT",
                "ACCESSOR IDENTITY",
                "LOCATION / IP",
                "STATUS",
              ].map((col) => (
                <th key={col} className="digital-vault-audit-th">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr
                key={i}
                className={
                  i < logs.length - 1 ? "digital-vault-audit-td-border" : ""
                }
              >
                <td className="digital-vault-audit-td">
                  <div className="digital-vault-audit-timestamp-main">
                    {log.timestamp}
                  </div>
                  <div className="digital-vault-audit-timestamp-sub">
                    {log.time}
                  </div>
                </td>
                <td className="digital-vault-audit-td">
                  <span
                    className="digital-vault-audit-action-badge"
                    style={{ color: log.actionColor, background: log.actionBg }}
                  >
                    {log.action === "Download"
                      ? "↓"
                      : log.action === "Denied"
                        ? "⊘"
                        : "👁"}{" "}
                    {log.action}
                  </span>
                </td>
                <td className="digital-vault-audit-td">
                  <span className="digital-vault-audit-doc-name">
                    {log.document}
                  </span>
                </td>
                <td className="digital-vault-audit-td">
                  <div className="digital-vault-audit-accessor-main">
                    {log.accessor}
                  </div>
                  <div
                    className="digital-vault-audit-accessor-sub"
                    style={{
                      color: log.action === "Denied" ? "#e05c5c" : "#3d4a66",
                    }}
                  >
                    {log.accessorSub}
                  </div>
                </td>
                <td className="digital-vault-audit-td">
                  <div className="digital-vault-audit-location-main">
                    {log.location}
                  </div>
                  {log.ip && (
                    <div className="digital-vault-audit-location-sub">
                      {log.ip}
                    </div>
                  )}
                </td>
                <td className="digital-vault-audit-td">
                  <div
                    className="digital-vault-audit-status-dot"
                    style={{
                      background: log.status === "ok" ? "#4ade80" : "#e05c5c",
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="digital-vault-audit-view-all">
        View All Access Records
      </div>
    </div>
  );
}
