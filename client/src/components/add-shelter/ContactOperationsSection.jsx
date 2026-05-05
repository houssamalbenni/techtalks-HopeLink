// components/ContactOperationsSection.jsx
import NumberInput from "./NumberInput";

const SERVICES = [
  { id: "overnight", label: "🛏 Overnight Beds" },
  { id: "meals", label: "🍲 Hot Meals" },
  { id: "medical", label: "💊 Medical Care" },
  { id: "clothing", label: "👕 Clothing" },
  { id: "jobs", label: "💼 Job Assistance" },
  { id: "counseling", label: "🧠 Counseling" },
  { id: "childcare", label: "👶 Childcare" },
  { id: "transport", label: "🚌 Transport" },
];

export default function ContactOperationsSection({ data, onChange }) {
  const toggleService = (id) => {
    const current = data.services || [];
    const next = current.includes(id)
      ? current.filter((s) => s !== id)
      : [...current, id];
    onChange("services", next);
  };

  return (
    <div className="form-card">
      <div className="section-header">
        <div className="section-title">
          <span className="section-icon">📞</span>
          Contact &amp; Operations
        </div>
        <p className="section-desc">
          How to reach the shelter and operational capacity.
        </p>
      </div>

      <div className="contact-ops-grid">
        {/* ── Left: Contact Info ── */}
        <div>
          <p className="field-label" style={{ marginBottom: 14 }}>
            Contact Info
          </p>

          {/* Phone */}
          <div className="field-full">
            <label className="field-label">
              Primary Phone <span className="required-star">*</span>
            </label>
            <div className="field-input-wrap">
              <span className="input-prefix-icon">📞</span>
              <input
                className="field-input has-prefix"
                type="tel"
                placeholder="(555) 123-4567"
                value={data.phone}
                onChange={(e) => onChange("phone", e.target.value)}
              />
            </div>
          </div>

          {/* Email */}
          <div className="field-full">
            <label className="field-label">
              Email Address <span className="required-star">*</span>
            </label>
            <div className="field-input-wrap">
              <span className="input-prefix-icon">✉️</span>
              <input
                className="field-input has-prefix"
                type="email"
                placeholder="contact@shelter.org"
                value={data.email}
                onChange={(e) => onChange("email", e.target.value)}
              />
            </div>
          </div>

          {/* Website */}
          <div className="field-full field-last">
            <label className="field-label">Website</label>
            <div className="field-input-wrap">
              <span className="input-prefix-icon">🌐</span>
              <input
                className="field-input has-prefix"
                type="url"
                placeholder="https://www.shelter.org"
                value={data.website}
                onChange={(e) => onChange("website", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* ── Right: Capacity & Hours ── */}
        <div>
          <p className="field-label" style={{ marginBottom: 14 }}>
            Capacity &amp; Hours
          </p>

          {/* Total / Available */}
          <div className="field-row">
            <div>
              <label className="field-label">
                Total Capacity <span className="required-star">*</span>
              </label>
              <NumberInput
                value={data.totalCapacity}
                onChange={(val) => onChange("totalCapacity", val)}
                placeholder="e.g. 100"
                min={0}
              />
            </div>
            <div>
              <label className="field-label">Current Available</label>
              <NumberInput
                value={data.availableCapacity}
                onChange={(val) => onChange("availableCapacity", val)}
                placeholder="e.g. 25"
                min={0}
              />
            </div>
          </div>

          {/* Operating Hours */}
          <div className="field-full">
            <label className="field-label">
              Operating Hours <span className="required-star">*</span>
            </label>
            <input
              className="field-input"
              type="text"
              placeholder="e.g. 24/7 or 8:00 AM – 8:00 PM"
              value={data.hours}
              onChange={(e) => onChange("hours", e.target.value)}
            />
          </div>

          {/* Services */}
          <div className="field-full field-last">
            <label className="field-label">
              Services Offered (select all that apply)
            </label>
            <div className="services-grid">
              {SERVICES.map((svc) => (
                <button
                  key={svc.id}
                  type="button"
                  className={`service-tag${(data.services || []).includes(svc.id) ? " selected" : ""}`}
                  onClick={() => toggleService(svc.id)}
                >
                  {svc.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Eligibility */}
      <div className="field-full" style={{ marginTop: 20 }}>
        <label className="field-label">Eligibility &amp; Requirements</label>
        <textarea
          className="field-textarea field-last"
          placeholder="List any specific requirements for entry (e.g., ID required, families only, etc.)…"
          value={data.eligibility}
          onChange={(e) => onChange("eligibility", e.target.value)}
          rows={3}
        />
      </div>
    </div>
  );
}
