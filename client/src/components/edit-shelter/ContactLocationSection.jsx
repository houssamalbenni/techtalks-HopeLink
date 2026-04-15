// components/ContactLocationSection.jsx

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
];

export default function ContactLocationSection({ data, onChange }) {
  return (
    <div className="form-card">
      <div className="section-header">
        <div className="section-title">
          <span className="section-icon">📍</span>
          Contact &amp; Location
        </div>
      </div>

      {/* Email + Phone */}
      <div className="field-row">
        <div>
          <label className="field-label">Primary Email</label>
          <div className="field-input-wrap">
            <span className="input-prefix-icon">✉️</span>
            <input
              className="field-input has-prefix"
              type="email"
              value={data.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="contact@shelter.org"
            />
          </div>
        </div>

        <div>
          <label className="field-label">
            Phone Number <span className="required-star">*</span>
          </label>
          <div className="field-input-wrap">
            <span className="input-prefix-icon">📞</span>
            <input
              className="field-input has-prefix required-highlight"
              type="tel"
              value={data.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder="(415) 555-0200"
            />
          </div>
        </div>
      </div>

      <div className="section-divider" />

      {/* Street */}
      <div className="field-full">
        <label className="field-label">Street Address</label>
        <input
          className="field-input"
          type="text"
          value={data.street}
          onChange={(e) => onChange("street", e.target.value)}
          placeholder="123 Main St, Suite 100"
        />
      </div>

      {/* City / State / ZIP */}
      <div className="field-row-3 field-last">
        <div>
          <label className="field-label">City</label>
          <input
            className="field-input"
            type="text"
            value={data.city}
            onChange={(e) => onChange("city", e.target.value)}
            placeholder="San Francisco"
          />
        </div>

        <div>
          <label className="field-label">State</label>
          <div className="select-wrap">
            <select
              className="field-select"
              value={data.state}
              onChange={(e) => onChange("state", e.target.value)}
            >
              <option value="">—</option>
              {US_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="field-label">ZIP Code</label>
          <input
            className="field-input"
            type="text"
            value={data.zip}
            onChange={(e) => onChange("zip", e.target.value)}
            placeholder="94105"
          />
        </div>
      </div>
    </div>
  );
}
