import { useState } from "react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import "../styles/DonorDashboard.css";

const donationHistoryData = [
  { month: "Jan", amount: 0 },
  { month: "Feb", amount: 200 },
  { month: "Mar", amount: 600 },
  { month: "Apr", amount: 400 },
  { month: "May", amount: 700 },
  { month: "Jun", amount: 1100 },
  { month: "Jul", amount: 500 },
  { month: "Aug", amount: 300 },
  { month: "Sep", amount: 750 },
  { month: "Oct", amount: 850 },
];

const transactions = [
  {
    id: 1,
    date: "Oct 24, 2023",
    time: "14:30 PM",
    amount: "$500.00",
    batch: "Batch #AD8842",
    category: "Medical Supplies",
    categoryColor: "#4ade80",
    icon: "$",
    iconBg: "#3b5bdb",
  },
  {
    id: 2,
    date: "Sep 15, 2023",
    time: "09:15 AM",
    amount: "$150.00",
    batch: "Batch #BC9921",
    category: "Food Rations",
    categoryColor: "#60a5fa",
    icon: "↻",
    iconBg: "#6d28d9",
  },
  {
    id: 3,
    date: "Aug 15, 2023",
    time: "08:12 AM",
    amount: "$150.00",
    batch: "Batch #EF4412",
    category: "Winter Gear",
    categoryColor: "#fb923c",
    icon: "↻",
    iconBg: "#6d28d9",
  },
];

const navItems = [
  {
    label: "NGO Operations Dashboard",
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor" opacity="0.7" />
        <rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor" opacity="0.7" />
        <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" opacity="0.7" />
        <rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor" opacity="0.7" />
      </svg>
    ),
  },
  {
    label: "Aid Distribution Monitoring",
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
        <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Donor Dashboard",
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" fill="currentColor" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    active: true,
  },
  {
    label: "Interactive Map",
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor" opacity="0.7" />
        <circle cx="12" cy="9" r="2.5" fill="white" />
      </svg>
    ),
  },
  {
    label: "Profile & Settings",
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
];

export default function DonorDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dd-root">
      {/* Sidebar */}
      <aside className={`dd-sidebar ${sidebarOpen ? "dd-sidebar--open" : ""}`}>
        <div className="dd-logo">
          <div className="dd-logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#818cf8" />
              <path d="M2 17l10 5 10-5" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" />
              <path d="M2 12l10 5 10-5" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="dd-logo-text">RefugeLink</span>
        </div>

        <div className="dd-search-wrap">
          <svg className="dd-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#6b7280" strokeWidth="2" />
            <path d="M21 21l-4.35-4.35" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input className="dd-search" type="text" placeholder="Search resources..." />
        </div>

        <nav className="dd-nav">
          {navItems.map((item) => (
            <button key={item.label} className={`dd-nav-item ${item.active ? "dd-nav-item--active" : ""}`}>
              <span className="dd-nav-icon">{item.icon}</span>
              <span className="dd-nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="dd-user">
          <div className="dd-user-avatar">MC</div>
          <div className="dd-user-info">
            <span className="dd-user-name">Michael Chen</span>
            <span className="dd-user-role">Philanthropist</span>
          </div>
          <button className="dd-user-arrow">›</button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="dd-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <main className="dd-main">
        {/* Topbar */}
        <header className="dd-topbar">
          <button className="dd-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <span /><span /><span />
          </button>
          <h1 className="dd-page-title">Donor Dashboard</h1>
          <div className="dd-topbar-actions">
            <button className="dd-donate-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="white" />
              </svg>
              Donate Now
            </button>
            <button className="dd-notif-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#9ca3af" strokeWidth="2" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#9ca3af" strokeWidth="2" />
              </svg>
              <span className="dd-notif-dot" />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="dd-content">
          {/* Top Cards Row */}
          <div className="dd-top-row">
            {/* Total Donated Card */}
            <div className="dd-card dd-total-card">
              <div className="dd-total-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M12 6v12M9 9h4.5a1.5 1.5 0 0 1 0 3H9m0 0h5a1.5 1.5 0 0 1 0 3H9" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="dd-total-label">Total Donated</div>
              <div className="dd-total-amount">$24,500</div>
              <div className="dd-total-sub">Lifetime contribution</div>
            </div>

            {/* Donation History Chart */}
            <div className="dd-card dd-chart-card">
              <div className="dd-chart-header">
                <h2 className="dd-chart-title">Donation History</h2>
                <button className="dd-chart-menu">···</button>
              </div>
              <div className="dd-chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={donationHistoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#818cf8" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e2a4a" vertical={false} />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: "#6b7280", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "#6b7280", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => v}
                    />
                    <Tooltip
                      contentStyle={{ background: "#1e2a4a", border: "none", borderRadius: 8, color: "#e5e7eb" }}
                      labelStyle={{ color: "#818cf8" }}
                      formatter={(v) => [`$${v}`, "Donated"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="#818cf8"
                      strokeWidth={2.5}
                      fill="url(#colorAmount)"
                      dot={false}
                      activeDot={{ r: 5, fill: "#818cf8" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Transparency Feed */}
          <div className="dd-card dd-feed-card">
            <div className="dd-feed-header">
              <div>
                <h2 className="dd-feed-title">Transparency & Distribution Feed</h2>
                <p className="dd-feed-sub">Track exactly where your contributions are deployed</p>
              </div>
              <div className="dd-feed-search-wrap">
                <svg className="dd-feed-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="#6b7280" strokeWidth="2" />
                  <path d="M21 21l-4.35-4.35" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <input
                  className="dd-feed-search"
                  type="text"
                  placeholder="Search by batch or date..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="dd-table">
              <div className="dd-table-head">
                <span>DATE</span>
                <span>YOUR DONATION</span>
                <span>ALLOCATED TO</span>
              </div>

              {transactions
                .filter(
                  (t) =>
                    t.batch.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    t.date.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((t) => (
                  <div className="dd-table-row" key={t.id}>
                    <div className="dd-table-date">
                      <span className="dd-date">{t.date}</span>
                      <span className="dd-time">{t.time}</span>
                    </div>
                    <div className="dd-table-amount">
                      <div className="dd-amount-icon" style={{ background: t.iconBg }}>
                        {t.icon}
                      </div>
                      <span className="dd-amount">{t.amount}</span>
                    </div>
                    <div className="dd-table-batch">
                      <span className="dd-batch-id">{t.batch}</span>
                      <span className="dd-batch-cat" style={{ color: t.categoryColor }}>
                        {t.category}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}