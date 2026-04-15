// components/LocationSection.jsx
import { useState } from "react";
import MapComponent from "./MapComponent";

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

export default function LocationSection({ data, onChange }) {
  const [coords, setCoords] = useState(data.coordinates || null);
  const latitude = coords ? Number(coords.latitude) : null;
  const longitude = coords ? Number(coords.longitude) : null;
  const hasValidLatitude = Number.isFinite(latitude);
  const hasValidLongitude = Number.isFinite(longitude);
  const latDirection = hasValidLatitude ? (latitude >= 0 ? "N" : "S") : "";
  const lngDirection = hasValidLongitude ? (longitude >= 0 ? "E" : "W") : "";

  const handleCoordsChange = (newCoords) => {
    setCoords(newCoords);
    onChange("coordinates", newCoords);
  };

  return (
    <div className="form-card">
      <div className="section-header">
        <div className="section-title">
          <span className="section-icon">📍</span>
          Location Details
        </div>
        <p className="section-desc">Physical address and map coordinates.</p>
      </div>

      {/* Street Address */}
      <div className="field-full">
        <label className="field-label">
          Street Address <span className="required-star">*</span>
        </label>
        <input
          className="field-input"
          type="text"
          placeholder="123 Main St, Suite 100"
          value={data.street}
          onChange={(e) => onChange("street", e.target.value)}
        />
      </div>

      {/* City / State / ZIP */}
      <div className="field-row-3">
        <div>
          <label className="field-label">
            City <span className="required-star">*</span>
          </label>
          <input
            className="field-input"
            type="text"
            placeholder="City name"
            value={data.city}
            onChange={(e) => onChange("city", e.target.value)}
          />
        </div>

        <div>
          <label className="field-label">
            State / Province <span className="required-star">*</span>
          </label>
          <div className="select-wrap">
            <select
              className="field-select"
              value={data.state}
              onChange={(e) => onChange("state", e.target.value)}
            >
              <option value="">Select State</option>
              {US_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="field-label">
            Postal Code <span className="required-star">*</span>
          </label>
          <input
            className="field-input"
            type="text"
            placeholder="ZIP code"
            value={data.zip}
            onChange={(e) => onChange("zip", e.target.value)}
          />
        </div>
      </div>

      {/* Map */}
      <div>
        <label className="field-label">Map Location Pin</label>
        <MapComponent coords={coords} onCoordsChange={handleCoordsChange} />
        {coords && (
          <div
            style={{
              marginTop: "8px",
              fontSize: "12px",
              color: "var(--text-secondary)",
            }}
          >
            📍 Coordinates:{" "}
            {hasValidLatitude ? `${Math.abs(latitude)}° ${latDirection}` : "—"},{" "}
            {hasValidLongitude
              ? `${Math.abs(longitude)}° ${lngDirection}`
              : "—"}
          </div>
        )}
      </div>
    </div>
  );
}
