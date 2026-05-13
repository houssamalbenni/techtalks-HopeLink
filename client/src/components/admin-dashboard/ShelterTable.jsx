export default function ShelterTable({ loading, shelterData, onViewShelter, onEditShelter }) {
  return (
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
                      <button className="ad-action-btn" title="View Details" onClick={() => onViewShelter(shelter)}>👁️</button>
                      <button className="ad-action-btn" title="Edit Service" onClick={() => onEditShelter(shelter)}>✎</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="ad-table-footer">
        <a href="#" className="ad-view-all">View All Shelters -&gt;</a>
      </div>
    </div>
  );
}
