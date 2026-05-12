import { useState } from "react";

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
  input: { backgroundColor: "#111827", border: "1px solid #374151", borderRadius: 8, color: "#f3f4f6", padding: "8px 12px", fontSize: 14, width: "100%", boxSizing: "border-box", outline: "none" },
  errorBox: { backgroundColor: "#fee2e2", color: "#dc2626", padding: "10px 14px", borderRadius: 8, marginBottom: 16, fontSize: 14 },
  cancelBtn: { backgroundColor: "#374151", color: "#d1d5db", border: "none", borderRadius: 8, padding: "9px 20px", cursor: "pointer", fontSize: 14 },
  saveBtn: { backgroundColor: "#6366f1", color: "white", border: "none", borderRadius: 8, padding: "9px 20px", cursor: "pointer", fontSize: 14, fontWeight: 600 },
};

export default function EditModal({ shelter, onClose, onSave, onUpdate }) {
  const [form, setForm] = useState({
    capacity: shelter.rawCapacity,
    availability: shelter.rawAvailability,
    phone_number: shelter.contact === "N/A" ? "" : shelter.contact,
    requirements: shelter.requirements || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      await onUpdate(shelter.rawId, {
        capacity: Number(form.capacity),
        availability: Number(form.availability),
        phone_number: form.phone_number,
        requirements: form.requirements,
      });
      onSave();
      onClose();
    } catch {
      setError("Failed to update. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={ms.overlay} onClick={onClose}>
      <div style={ms.modal} onClick={e => e.stopPropagation()}>
        <div style={ms.header}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ ...ms.iconBox, backgroundColor: shelter.iconBg }}>{shelter.icon}</div>
            <div><h2 style={ms.title}>Edit - {shelter.name}</h2><p style={ms.sub}>{shelter.location}</p></div>
          </div>
          <button style={ms.closeBtn} onClick={onClose}>✕</button>
        </div>
        <div style={ms.body}>
          {error && <div style={ms.errorBox}>{error}</div>}
          <div style={ms.grid}>
            {[["capacity", "Total Capacity", "number"], ["availability", "Available Spots", "number"], ["phone_number", "Phone Number", "text"]].map(([name, label, type]) => (
              <div key={name}>
                <div style={ms.label}>{label}</div>
                <input style={{ ...ms.input, marginTop: 6 }} name={name} type={type} value={form[name]} onChange={handleChange} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={ms.label}>Requirements</div>
            <textarea style={{ ...ms.input, height: 80, resize: "vertical", marginTop: 6 }} name="requirements" value={form.requirements} onChange={handleChange} />
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "flex-end" }}>
            <button style={ms.cancelBtn} onClick={onClose}>Cancel</button>
            <button style={ms.saveBtn} onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save Changes"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
