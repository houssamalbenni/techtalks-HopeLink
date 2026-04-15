// components/CapacityFacilitiesSection.jsx

const AMENITIES = [
  { id: "overnight",   label: "Overnight Beds" },
  { id: "meals",       label: "Hot Meals" },
  { id: "medical",     label: "Medical Care" },
  { id: "jobs",        label: "Job Assistance" },
  { id: "family",      label: "Family Rooms" },
  { id: "pets",        label: "Pet Friendly" },
  { id: "counseling",  label: "Counseling" },
  { id: "transport",   label: "Transport" },
  { id: "laundry",     label: "Laundry" },
];

export default function CapacityFacilitiesSection({ data, onChange }) {
  const toggle = (id) => {
    const current = data.amenities || [];
    const next = current.includes(id)
      ? current.filter((a) => a !== id)
      : [...current, id];
    onChange("amenities", next);
  };

  return (
    <div className="form-card">
      <div className="section-header">
        <div className="section-title">
          <span className="section-icon">🛏</span>
          Capacity &amp; Facilities
        </div>
      </div>

      {/* Capacity numbers */}
      <div className="field-row">
        <div>
          <label className="field-label">
            Total Bed Capacity <span className="required-star">*</span>
          </label>
          <input
            className="field-input cap-input"
            type="number"
            min="0"
            value={data.totalCapacity}
            onChange={(e) => onChange("totalCapacity", e.target.value)}
            placeholder="e.g. 160"
          />
        </div>

        <div>
          <label className="field-label">Emergency Overflow Limit</label>
          <input
            className="field-input"
            type="number"
            min="0"
            value={data.overflowLimit}
            onChange={(e) => onChange("overflowLimit", e.target.value)}
            placeholder="e.g. 20"
          />
        </div>
      </div>

      {/* Amenities */}
      <div>
        <label className="field-label" style={{ marginBottom: 12 }}>
          Available Amenities &amp; Services
        </label>
        <div className="amenities-grid">
          {AMENITIES.map((a) => {
            const isChecked = (data.amenities || []).includes(a.id);
            return (
              <div
                key={a.id}
                className={`amenity-item${isChecked ? " checked" : ""}`}
                onClick={() => toggle(a.id)}
              >
                <div className="cb-box">
                  <span className="cb-check">✓</span>
                </div>
                <span className="amenity-label">{a.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
