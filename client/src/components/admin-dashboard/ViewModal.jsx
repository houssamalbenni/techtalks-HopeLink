const ms = {
  overlay: { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { backgroundColor: "#1f2937", borderRadius: 12, width: "100%", maxWidth: 520, border: "1px solid #374151", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid #374151" },
  iconBox: { width: 44, height: 44, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 },
  title: { color: "#f3f4f6", fontSize: 18, fontWeight: 600, margin: 0 },
  sub: { color: "#9ca3af", fontSize: 13, margin: "2px 0 0" },
  closeBtn: { background: "none", border: "none", color: "#9ca3af", fontSize: 18, cursor: "pointer" },
  body: { padding: "20px 24px 24px" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  label: { color: "#9ca3af", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.05em" },
  value: { color: "#f3f4f6", fontSize: 15, marginTop: 4 },
  tag: { backgroundColor: "#374151", color: "#d1d5db", padding: "4px 10px", borderRadius: 20, fontSize: 12 },
  bar: { height: 10, backgroundColor: "#374151", borderRadius: 6, overflow: "hidden", marginTop: 8 },
};

export default function ViewModal({ shelter, onClose }) {
  return (
    <div style={ms.overlay} onClick={onClose}>
      <div style={ms.modal} onClick={e => e.stopPropagation()}>
        <div style={ms.header}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ ...ms.iconBox, backgroundColor: shelter.iconBg }}>{shelter.icon}</div>
            <div><h2 style={ms.title}>{shelter.name}</h2><p style={ms.sub}>{shelter.location}</p></div>
          </div>
          <button style={ms.closeBtn} onClick={onClose}>✕</button>
        </div>
        <div style={ms.body}>
          <div style={ms.grid}>
            {[
              ["Status", <span style={{ color: shelter.statusColor, fontWeight: 600 }}>{shelter.status}</span>],
              ["Contact", shelter.contact],
              ["Total Capacity", shelter.rawCapacity],
              ["Available Spots", shelter.rawAvailability],
              ["Occupied", shelter.capacity],
              ["Occupancy Rate", `${shelter.capacityPercent}%`],
            ].map(([label, val]) => (
              <div key={label}><div style={ms.label}>{label}</div><div style={ms.value}>{val}</div></div>
            ))}
          </div>
          {shelter.requirements && <div style={{ marginTop: 16 }}><div style={ms.label}>Requirements</div><div style={ms.value}>{shelter.requirements}</div></div>}
          {shelter.facilities?.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <div style={ms.label}>Facilities</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                {shelter.facilities.map(f => <span key={f} style={ms.tag}>{f}</span>)}
              </div>
            </div>
          )}
          <div style={{ marginTop: 20 }}>
            <div style={ms.label}>Capacity</div>
            <div style={ms.bar}>
              <div style={{ height: "100%", width: `${shelter.capacityPercent}%`, backgroundColor: shelter.capacityPercent > 80 ? "#f59e0b" : "#10b981", borderRadius: 6 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
