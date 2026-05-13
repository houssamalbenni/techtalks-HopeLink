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
  YAxis,
  Legend
} from "recharts";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#6b7280"];

export default function ChartsSection({ weeklyData, demographicsData }) {
  return (
    <div className="ad-charts-grid">
      <div className="ad-card">
        <div className="ad-card-header">
          <h2>Refugee Population Trend</h2>
          <p>Weekly registrations from database</p>
          <div className="ad-legend">
            <button className="ad-legend-item"><span className="ad-legend-color" style={{ backgroundColor: "#3b82f6" }}></span>Registrations</button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={250}>
         <AreaChart
    data={weeklyData}
>
  <defs>
    <linearGradient
      id="colorPending"
      x1="0"
      y1="0"
      x2="0"
      y2="1"
    >
      <stop
        offset="5%"
        stopColor="#f59e0b"
        stopOpacity={0.3}
      />
      <stop
        offset="95%"
        stopColor="#f59e0b"
        stopOpacity={0}
      />
    </linearGradient>

    <linearGradient
      id="colorAccepted"
      x1="0"
      y1="0"
      x2="0"
      y2="1"
    >
      <stop
        offset="5%"
        stopColor="#10b981"
        stopOpacity={0.3}
      />
      <stop
        offset="95%"
        stopColor="#10b981"
        stopOpacity={0}
      />
    </linearGradient>
  </defs>

  <CartesianGrid
    strokeDasharray="3 3"
    stroke="#374151"
    vertical={false}
  />

  <XAxis dataKey="date" stroke="#9ca3af" />

  <YAxis
    stroke="#9ca3af"
    allowDecimals={false}
  />

  <Tooltip
    contentStyle={{
      backgroundColor: "#1f2937",
      border: "1px solid #374151",
      borderRadius: "8px",
      color: "#f3f4f6",
    }}
  />

  <Legend />

  <Area
    type="monotone"
    dataKey="pending"
    stroke="#f59e0b"
    fillOpacity={1}
    fill="url(#colorPending)"
  />

  <Area
    type="monotone"
    dataKey="approved"
    stroke="#10b981"
    fillOpacity={1}
    fill="url(#colorAccepted)"
  />
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
  );
}
