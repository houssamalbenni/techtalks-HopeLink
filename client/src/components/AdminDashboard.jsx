import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import adminService from "../services/Adminservice";
import "../styles/AdminDashboard.css";

const refugeePopulationData = [
  { month: "Week 1", registrations: 1200, relocations: 800 },
  { month: "Week 2", registrations: 1500, relocations: 1200 },
  { month: "Week 3", registrations: 1800, relocations: 1400 },
  { month: "Week 4", registrations: 2100, relocations: 1800 },
  { month: "Week 5", registrations: 2400, relocations: 2000 },
  { month: "Week 6", registrations: 2700, relocations: 2300 },
];

const demographicsData = [
  { name: "Adults (18-65)", value: 45 },
  { name: "Children (0-17)", value: 28 },
  { name: "Elderly (65+)", value: 18 },
  { name: "Unspecified", value: 9 },
];

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#6b7280"];

const recentActivityData = [
  { id: 1, title: "New registration", description: "Family of 4 registered at Hope Center", time: "2 hours ago", icon: "👥" },
  { id: 2, title: "Medical support", description: "12 individuals received medical aid", time: "4 hours ago", icon: "⚕️" },
  { id: 3, title: "Capacity alert", description: "Safe Haven Beta reaching 90% capacity", time: "6 hours ago", icon: "🚨" },
];

const navItems = [
  { label: "Dashboard", active: true, icon: (<svg width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor" opacity="0.7" /><rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor" opacity="0.7" /><rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" opacity="0.7" /><rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor" opacity="0.7" /></svg>) },
  { label: "Shelters Management", icon: (<svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>) },
  { label: "Hospitals Management", icon: (<svg width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M9 12h6M12 9v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>) },
  { label: "Refugees Overview", icon: (<svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="currentColor" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>) },
  { label: "Requests & Matching", icon: (<svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor" opacity="0.7" /><circle cx="12" cy="9" r="2.5" fill="white" /></svg>) },
  { label: "Reports & Analytics", icon: (<svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="M6 18v-4M12 18v-6M18 18v-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>) },
  { label: "Settings", icon: (<svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2" /></svg>) },
];

function transformService(service, index) {
  const occupied = service.capacity - service.availability;
  const capacityPercent = service.capacity ? Math.round((occupied / service.capacity) * 100) : 0;
  const statusColor = service.availability === 0 ? "#ef4444" : capacityPercent >= 50 ? "#f59e0b" : "#10b981";
  const statusLabel = service.availability === 0 ? "Closed" : capacityPercent >= 50 ? "Limited" : "Open";
  return {
    id: service._id || index + 1,
    rawId: service._id,
    name: service.title || "Unknown Service",
    location: service.address
      ? `${service.address.city || ""}, ${service.address.country || ""}`.trim().replace(/^,|,$/, "")
      : "Unknown Location",
    capacity: `${occupied}/${service.capacity}`,
    capacityPercent,
    status: statusLabel,
    statusColor,
    contact: service.phone_number || "N/A",
    icon: service.title?.toLowerCase().includes("hospital") ? "🏥" : "🏠",
    iconBg: service.title?.toLowerCase().includes("hospital") ? "#dbeafe" : "#dcfce7",
    rawCapacity: service.capacity,
    rawAvailability: service.availability,
    requirements: service.requirements || "",
    facilities: service.facilities || [],
  };
}

// ── Modal styles ──────────────────────────────────────────────────────────────
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

// ── View Modal ────────────────────────────────────────────────────────────────
function ViewModal({ shelter, onClose }) {
  return (
    <div style={ms.overlay} onClick={onClose}>
      <div style={ms.modal} onClick={e => e.stopPropagation()}>
        <div style={ms.header}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ ...ms.iconBox, backgroundColor: shelter.iconBg }}>{shelter.icon}</div>
            <div>
              <h2 style={ms.title}>{shelter.name}</h2>
              <p style={ms.sub}>{shelter.location}</p>
            </div>
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
              <div key={label}>
                <div style={ms.label}>{label}</div>
                <div style={ms.value}>{val}</div>
              </div>
            ))}
          </div>
          {shelter.requirements && (
            <div style={{ marginTop: 16 }}>
              <div style={ms.label}>Requirements</div>
              <div style={ms.value}>{shelter.requirements}</div>
            </div>
          )}
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

// ── Edit Modal ────────────────────────────────────────────────────────────────
function EditModal({ shelter, onClose, onSave }) {
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
      await adminService.updateService(shelter.rawId, {
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
            <div>
              <h2 style={ms.title}>Edit — {shelter.name}</h2>
              <p style={ms.sub}>{shelter.location}</p>
            </div>
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

// ── Main ──────────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [shelterData, setShelterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewShelter, setViewShelter] = useState(null);
  const [editShelter, setEditShelter] = useState(null);

  useEffect(() => { fetchServices(); }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const services = await adminService.getAllServices();
      if (Array.isArray(services)) setShelterData(services.map(transformService));
    } catch (err) {
      console.error("Failed to fetch services:", err);
      setError("Failed to load services. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ad-root">
      {viewShelter && <ViewModal shelter={viewShelter} onClose={() => setViewShelter(null)} />}
      {editShelter && <EditModal shelter={editShelter} onClose={() => setEditShelter(null)} onSave={fetchServices} />}

      <aside className={`ad-sidebar ${sidebarOpen ? "ad-sidebar--open" : ""}`}>
        <div className="ad-logo">
          <div className="ad-logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#818cf8" />
              <path d="M2 17l10 5 10-5" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" />
              <path d="M2 12l10 5 10-5" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="ad-logo-text">HopeLink</span>
        </div>
        <div className="ad-search-wrap">
          <svg className="ad-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#6b7280" strokeWidth="2" />
            <path d="M21 21l-4.35-4.35" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input className="ad-search" type="text" placeholder="Search everywhere..." />
        </div>
        <div className="ad-menu-label">MAIN MENU</div>
        <nav className="ad-nav">
          {navItems.map((item) => (
            <button key={item.label} className={`ad-nav-item ${item.active ? "ad-nav-item--active" : ""}`}>
              <span className="ad-nav-icon">{item.icon}</span>
              <span className="ad-nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="ad-user">
          <div className="ad-user-avatar">SJ</div>
          <div className="ad-user-info">
            <div className="ad-user-name">Sarah Jenkins</div>
            <div className="ad-user-role">System Admin</div>
          </div>
        </div>
      </aside>

      <div className="ad-content">
        <header className="ad-header">
          <button className="ad-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="#e5e7eb" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <div className="ad-header-title">
            <h1>Admin Dashboard</h1>
            <p>System overview and resource management</p>
          </div>
          <div className="ad-header-actions">
            <button className="ad-btn ad-btn--primary ad-header-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              Add Shelter
            </button>
            <button className="ad-btn ad-btn--primary ad-header-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              Add Hospital
            </button>
            <button className="ad-notification-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#e5e7eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#e5e7eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="ad-notification-dot">3</span>
            </button>
            <button className="ad-settings-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" stroke="#e5e7eb" strokeWidth="2" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="#e5e7eb" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </header>

        {error && (
          <div style={{ backgroundColor: "#fee2e2", border: "1px solid #fecaca", color: "#dc2626", padding: "12px 16px", borderRadius: "8px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>{error}</span>
            <button onClick={() => { setError(null); fetchServices(); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#dc2626" }}>↺ Retry</button>
          </div>
        )}

        <div className="ad-stats-grid">
          <div className="ad-stat-card">
            <div className="ad-stat-icon" style={{ backgroundColor: "#dbeafe" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 12l2 3 4-5 4 5 4-5 4 5" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div className="ad-stat-content">
              <div className="ad-stat-value">{loading ? "..." : shelterData.length}</div>
              <div className="ad-stat-label">Total Services</div>
            </div>
          </div>
          <div className="ad-stat-card">
            <div className="ad-stat-icon" style={{ backgroundColor: "#ddd6fe" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 12l2 3 4-5 4 5 4-5 4 5" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div className="ad-stat-content">
              <div className="ad-stat-value">
                {loading ? "..." : shelterData.reduce((sum, s) => {
                  const parts = s.capacity.split("/");
                  return sum + (parseInt(parts[1]) - parseInt(parts[0]));
                }, 0).toLocaleString()}
              </div>
              <div className="ad-stat-label">Available Capacity</div>
            </div>
          </div>
        </div>

        <div className="ad-charts-grid">
          <div className="ad-card">
            <div className="ad-card-header">
              <h2>Refugee Population Trend</h2>
              <p>Monthly registration vs relocations</p>
              <div className="ad-legend">
                <button className="ad-legend-item"><span className="ad-legend-color" style={{ backgroundColor: "#3b82f6" }}></span>Registrations</button>
                <button className="ad-legend-item"><span className="ad-legend-color" style={{ backgroundColor: "#10b981" }}></span>Relocations</button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={refugeePopulationData}>
                <defs>
                  <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorRelocations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px", color: "#f3f4f6" }} />
                <Area type="monotone" dataKey="registrations" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRegistrations)" />
                <Area type="monotone" dataKey="relocations" stroke="#10b981" fillOpacity={1} fill="url(#colorRelocations)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="ad-card">
            <div className="ad-card-header">
              <h2>Demographics</h2>
              <p>Age distribution overview</p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={demographicsData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                  {demographicsData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index]} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px", color: "#f3f4f6" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="ad-demographics-legend">
              {demographicsData.map((item, index) => (
                <div key={item.name} className="ad-demographic-item">
                  <span className="ad-demographic-color" style={{ backgroundColor: COLORS[index] }}></span>
                  <span className="ad-demographic-label">{item.name}</span>
                  <span className="ad-demographic-value">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="ad-bottom-grid">
          <div className="ad-card">
            <div className="ad-card-header">
              <h2>Recent Activity</h2>
              <button className="ad-more-btn">⋯</button>
            </div>
            <div className="ad-activity-list">
              {recentActivityData.map((activity) => (
                <div key={activity.id} className="ad-activity-item">
                  <div className="ad-activity-icon">{activity.icon}</div>
                  <div className="ad-activity-content">
                    <div className="ad-activity-title">{activity.title}</div>
                    <div className="ad-activity-desc">{activity.description}</div>
                  </div>
                  <div className="ad-activity-time">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="ad-card ad-card--full">
            <div className="ad-card-header">
              <h2>Shelter Management</h2>
              <p>Active facilities and current occupancy</p>
              <button className="ad-filter-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M6 12h12M8 18h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                Filter
              </button>
            </div>
            <div className="ad-table-wrapper">
              <table className="ad-table">
                <thead>
                  <tr>
                    <th>SHELTER NAME & LOCATION</th>
                    <th>CAPACITY (OCCUPIED/TOTAL)</th>
                    <th>STATUS</th>
                    <th>CONTACT</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="5" style={{ textAlign: "center", padding: "20px", color: "#9ca3af" }}>Loading services...</td></tr>
                  ) : shelterData.length === 0 ? (
                    <tr><td colSpan="5" style={{ textAlign: "center", padding: "20px", color: "#9ca3af" }}>No services found</td></tr>
                  ) : (
                    shelterData.map((shelter) => (
                      <tr key={shelter.id}>
                        <td>
                          <div className="ad-shelter-cell">
                            <div className="ad-shelter-icon" style={{ backgroundColor: shelter.iconBg }}>{shelter.icon}</div>
                            <div>
                              <div className="ad-shelter-name">{shelter.name}</div>
                              <div className="ad-shelter-location">{shelter.location}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="ad-capacity-cell">
                            <span>{shelter.capacity}</span>
                            <div className="ad-capacity-bar">
                              <div className="ad-capacity-fill" style={{ width: `${shelter.capacityPercent}%`, backgroundColor: shelter.capacityPercent > 80 ? "#f59e0b" : "#10b981" }}></div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="ad-status" style={{ backgroundColor: `${shelter.statusColor}20`, color: shelter.statusColor }}>{shelter.status}</span>
                        </td>
                        <td><div className="ad-contact-cell">{shelter.contact}</div></td>
                        <td>
                          <div className="ad-actions">
                            <button className="ad-action-btn" title="View Details" onClick={() => setViewShelter(shelter)}>👁️</button>
                            <button className="ad-action-btn" title="Edit Service" onClick={() => setEditShelter(shelter)}>✎</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="ad-table-footer">
              <a href="#" className="ad-view-all">View All Shelters →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}