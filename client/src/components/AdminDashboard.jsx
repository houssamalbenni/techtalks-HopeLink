import { useState } from "react";
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

const shelterData = [
  {
    id: 1,
    name: "Hope Center Alpha",
    location: "Warsaw, Poland",
    capacity: "850/1000",
    capacityPercent: 85,
    status: "Active",
    statusColor: "#10b981",
    contact: "+48 123 456",
    icon: "🏥",
    iconBg: "#dbeafe",
  },
  {
    id: 2,
    name: "Safe Haven Beta",
    location: "Krakow, Romania",
    capacity: "450/500",
    capacityPercent: 90,
    status: "Alert",
    statusColor: "#f59e0b",
    contact: "+40 987 654",
    icon: "⚠️",
    iconBg: "#fef3c7",
  },
];

const recentActivityData = [
  {
    id: 1,
    title: "New registration",
    description: "Family of 4 registered at Hope Center",
    time: "2 hours ago",
    icon: "👥",
  },
  {
    id: 2,
    title: "Medical support",
    description: "12 individuals received medical aid",
    time: "4 hours ago",
    icon: "⚕️",
  },
  {
    id: 3,
    title: "Capacity alert",
    description: "Safe Haven Beta reaching 90% capacity",
    time: "6 hours ago",
    icon: "🚨",
  },
];

const navItems = [
  {
    label: "Dashboard",
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor" opacity="0.7" />
        <rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor" opacity="0.7" />
        <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" opacity="0.7" />
        <rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor" opacity="0.7" />
      </svg>
    ),
    active: true,
  },
  {
    label: "Shelters Management",
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
        <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Hospitals Management",
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M9 12h6M12 9v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Refugees Overview",
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" fill="currentColor" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Requests & Matching",
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor" opacity="0.7" />
        <circle cx="12" cy="9" r="2.5" fill="white" />
      </svg>
    ),
  },
  {
    label: "Reports & Analytics",
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
        <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 18v-4M12 18v-6M18 18v-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Settings",
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
];

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="ad-root">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="ad-content">
        {/* Header */}
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Add Shelter
            </button>
            <button className="ad-btn ad-btn--primary ad-header-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
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

        {/* Stats Grid */}
        <div className="ad-stats-grid">
          <div className="ad-stat-card">
            <div className="ad-stat-icon" style={{ backgroundColor: "#dbeafe" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 12l2 3 4-5 4 5 4-5 4 5" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="ad-stat-content">
              <div className="ad-stat-value">142</div>
              <div className="ad-stat-label">Total Shelters</div>
            </div>
          </div>

          <div className="ad-stat-card">
            <div className="ad-stat-icon" style={{ backgroundColor: "#dcfce7" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 12l2 3 4-5 4 5 4-5 4 5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="ad-stat-content">
              <div className="ad-stat-value">38</div>
              <div className="ad-stat-label">Medical Centers</div>
            </div>
          </div>

          <div className="ad-stat-card">
            <div className="ad-stat-icon" style={{ backgroundColor: "#fecaca" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 12l2 3 4-5 4 5 4-5 4 5" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="ad-stat-content">
              <div className="ad-stat-value">45.2k</div>
              <div className="ad-stat-label">Registered Refugees</div>
            </div>
          </div>

          <div className="ad-stat-card">
            <div className="ad-stat-icon" style={{ backgroundColor: "#ddd6fe" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 12l2 3 4-5 4 5 4-5 4 5" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="ad-stat-content">
              <div className="ad-stat-value">8,420</div>
              <div className="ad-stat-label">Available Capacity</div>
            </div>
          </div>

          <div className="ad-stat-card">
            <div className="ad-stat-icon" style={{ backgroundColor: "#fed7aa" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 12l2 3 4-5 4 5 4-5 4 5" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="ad-stat-content">
              <div className="ad-stat-value">342</div>
              <div className="ad-stat-label">Active Aid Requests</div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="ad-charts-grid">
          {/* Refugee Population Trend */}
          <div className="ad-card">
            <div className="ad-card-header">
              <h2>Refugee Population Trend</h2>
              <p>Monthly registration vs relocations</p>
              <div className="ad-legend">
                <button className="ad-legend-item">
                  <span className="ad-legend-color" style={{ backgroundColor: "#3b82f6" }}></span>
                  Registrations
                </button>
                <button className="ad-legend-item">
                  <span className="ad-legend-color" style={{ backgroundColor: "#10b981" }}></span>
                  Relocations
                </button>
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
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#f3f4f6",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="registrations"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorRegistrations)"
                />
                <Area
                  type="monotone"
                  dataKey="relocations"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorRelocations)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Demographics Chart */}
          <div className="ad-card">
            <div className="ad-card-header">
              <h2>Demographics</h2>
              <p>Age distribution overview</p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={demographicsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {demographicsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#f3f4f6",
                  }}
                />
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

        {/* Bottom Section */}
        <div className="ad-bottom-grid">
          {/* Recent Activity */}
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

          {/* Shelter Management */}
          <div className="ad-card ad-card--full">
            <div className="ad-card-header">
              <h2>Shelter Management</h2>
              <p>Active facilities and current occupancy</p>
              <button className="ad-filter-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M4 6h16M6 12h12M8 18h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
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
                  {shelterData.map((shelter) => (
                    <tr key={shelter.id}>
                      <td>
                        <div className="ad-shelter-cell">
                          <div className="ad-shelter-icon" style={{ backgroundColor: shelter.iconBg }}>
                            {shelter.icon}
                          </div>
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
                            <div
                              className="ad-capacity-fill"
                              style={{
                                width: `${shelter.capacityPercent}%`,
                                backgroundColor: shelter.capacityPercent > 80 ? "#f59e0b" : "#10b981",
                              }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="ad-status" style={{ backgroundColor: `${shelter.statusColor}20`, color: shelter.statusColor }}>
                          {shelter.status}
                        </span>
                      </td>
                      <td>
                        <div className="ad-contact-cell">{shelter.contact}</div>
                      </td>
                      <td>
                        <div className="ad-actions">
                          <button className="ad-action-btn">👁️</button>
                          <button className="ad-action-btn">✎</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="ad-table-footer">
              <a href="#" className="ad-view-all">
                View All Shelters →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
