// components/BasicInfoSection.jsx

const ORG_TYPES = [
  "Non-Profit Organization",
  "Government Agency",
  "Religious Institution",
  "Community Organization",
  "Private Organization",
];

const OPERATING_STATUSES = [
  "Active & Accepting Intake",
  "Active – At Capacity",
  "Temporarily Closed",
  "Closed Permanently",
  "Pending Approval",
];

export default function BasicInfoSection({ data, onChange }) {
  return (
    <div className="form-card">
      <div className="section-header">
        <div className="section-title">
          <span className="section-icon">📋</span>
          Basic Information
        </div>
      </div>

      {/* Shelter Name */}
      <div className="field-full">
        <label className="field-label">
          Shelter Name <span className="required-star">*</span>
        </label>
        <input
          className="field-input required-highlight"
          type="text"
          value={data.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="e.g. Safe Haven Center"
        />
      </div>

      {/* Org Type + Operating Status */}
      <div className="field-row">
        <div>
          <label className="field-label">Organization Type</label>
          <div className="select-wrap">
            <select
              className="field-select"
              value={data.orgType}
              onChange={(e) => onChange("orgType", e.target.value)}
            >
              {ORG_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="field-label">Operating Status</label>
          <div className="select-wrap">
            <select
              className="field-select"
              value={data.operatingStatus}
              onChange={(e) => onChange("operatingStatus", e.target.value)}
            >
              {OPERATING_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="field-full field-last">
        <label className="field-label">Description / Mission Statement</label>
        <textarea
          className="field-textarea"
          rows={4}
          value={data.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Describe the shelter's mission and services…"
        />
      </div>
    </div>
  );
}
