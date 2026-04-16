// components/BasicInfoSection.jsx

export default function BasicInfoSection({ data, onChange }) {
  return (
    <div className="form-card">
      {/* Section header */}
      <div className="section-header">
        <div className="section-title">
          <span className="section-icon">📋</span>
          Basic Information
        </div>
        <p className="section-desc">
          General details about the shelter facility.
        </p>
      </div>

      {/* Shelter Name */}
      <div className="field-full">
        <label className="field-label">
          Shelter Name <span className="required-star">*</span>
        </label>
        <input
          className="field-input"
          type="text"
          placeholder="e.g. Safe Haven Center"
          value={data.name}
          onChange={(e) => onChange("name", e.target.value)}
        />
      </div>

      {/* Description */}
      <div className="field-full field-last">
        <label className="field-label">
          Description <span className="required-star">*</span>
        </label>
        <textarea
          className="field-textarea"
          placeholder="Provide a brief description of the shelter and its primary mission…"
          value={data.description}
          onChange={(e) => onChange("description", e.target.value)}
          rows={4}
        />
      </div>
    </div>
  );
}
