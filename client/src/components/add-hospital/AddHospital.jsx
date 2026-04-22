import { useMemo, useState } from "react";

import AdminSidebar from "../hospitals/AdminSidebar";
import TopHeader from "../hospitals/TopHeader";
import { SIDEBAR_LINKS, USER_PROFILE } from "../hospitals/hospitalsData";
import FieldGroup from "./FieldGroup";
import FormSection from "./FormSection";
import ToggleCard from "./ToggleCard";
import {
  BREADCRUMBS,
  DEFAULT_FORM,
  DEPARTMENT_OPTIONS,
  HEADER_ACTIONS,
  OPERATING_HOURS_OPTIONS,
  STATE_OPTIONS,
  STATUS_OPTIONS,
} from "./addHospitalConfig";
import "../hospitals/Hospitals.css";
import "./AddHospital.css";

const BASIC_FIELDS = [
  {
    field: "hospitalName",
    label: "Hospital Name",
    required: true,
    type: "input",
    className: "ah-span-all",
    inputType: "text",
    placeholder: "e.g. Mercy General Hospital",
  },
  {
    field: "description",
    label: "Description",
    type: "textarea",
    className: "ah-span-all",
    rows: 3,
    placeholder: "Brief description of the facility and its primary focus...",
  },
];

const LOCATION_FIELDS = [
  {
    field: "streetAddress",
    label: "Street Address",
    required: true,
    type: "input",
    className: "ah-span-all",
    inputType: "text",
    placeholder: "123 Health Ave",
  },
  {
    field: "city",
    label: "City",
    required: true,
    type: "input",
    inputType: "text",
    placeholder: "San Francisco",
  },
];

const LOCATION_INNER_FIELDS = [
  {
    field: "state",
    label: "State",
    required: true,
    type: "select",
    options: STATE_OPTIONS,
    placeholder: "Select State",
  },
  {
    field: "postalCode",
    label: "Postal Code",
    required: true,
    type: "input",
    inputType: "text",
    placeholder: "94103",
  },
];

const CONFIG_FIELDS = [
  {
    field: "operatingHours",
    label: "Operating Hours",
    type: "select",
    options: OPERATING_HOURS_OPTIONS,
  },
  {
    field: "totalBeds",
    label: "Total Bed Capacity (Optional)",
    type: "input",
    inputType: "number",
    placeholder: "e.g. 500",
  },
];

const STATUS_FIELDS = [
  {
    field: "initialStatus",
    label: "Initial Status",
    type: "select",
    options: STATUS_OPTIONS,
  },
  {
    field: "internalNotes",
    label: "Internal Notes",
    type: "textarea",
    rows: 1,
    placeholder: "Admin notes...",
  },
];

const TOGGLE_FIELDS = [
  {
    field: "erEnabled",
    title: "Emergency Room (ER)",
    description: "Facility has a 24/7 emergency department",
  },
  {
    field: "appointmentsRequired",
    title: "Appointments Required",
    description: "Walk-ins are not accepted for general visits",
  },
];

export default function AddHospital() {
  const [form, setForm] = useState(DEFAULT_FORM);

  const actions = useMemo(() => HEADER_ACTIONS, []);
  const breadcrumbs = useMemo(() => BREADCRUMBS, []);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleField(field) {
    setForm((prev) => ({ ...prev, [field]: !prev[field] }));
  }

  function toggleDepartment(department) {
    setForm((prev) => {
      const isActive = prev.departments.includes(department);
      const departments = isActive
        ? prev.departments.filter((item) => item !== department)
        : [...prev.departments, department];

      return { ...prev, departments };
    });
  }

  function addInsuranceTag() {
    const value = form.insuranceInput.trim();
    if (!value) return;

    setForm((prev) => {
      if (prev.insuranceTags.includes(value)) return { ...prev, insuranceInput: "" };
      return { ...prev, insuranceTags: [...prev.insuranceTags, value], insuranceInput: "" };
    });
  }

  function removeInsuranceTag(tag) {
    setForm((prev) => ({
      ...prev,
      insuranceTags: prev.insuranceTags.filter((item) => item !== tag),
    }));
  }

  function onSubmit(event) {
    event.preventDefault();
  }

  function renderSelectOptions(options, placeholder) {
    return (
      <>
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </>
    );
  }

  function renderField(config) {
    const {
      field,
      label,
      required,
      className,
      type,
      inputType = "text",
      placeholder,
      rows,
      options,
    } = config;

    return (
      <FieldGroup key={field} className={className} label={label} required={required}>
        {type === "textarea" ? (
          <textarea
            rows={rows || 2}
            className="ah-textarea"
            value={form[field]}
            onChange={(event) => updateField(field, event.target.value)}
            placeholder={placeholder}
          />
        ) : type === "select" ? (
          <select
            className="ah-select"
            value={form[field]}
            onChange={(event) => updateField(field, event.target.value)}
            required={required}
          >
            {renderSelectOptions(options, placeholder)}
          </select>
        ) : (
          <input
            type={inputType}
            className="ah-input"
            value={form[field]}
            onChange={(event) => updateField(field, event.target.value)}
            placeholder={placeholder}
            required={required}
          />
        )}
      </FieldGroup>
    );
  }

  return (
    <div className="hospitals-page">
      <AdminSidebar logoText="CareAdmin" navItems={SIDEBAR_LINKS} activeItem="Add Hospital" user={USER_PROFILE} />

      <div className="hospitals-main-wrap">
        <TopHeader breadcrumbs={breadcrumbs} actions={actions} />

        <main className="hospitals-content">
          <div className="ah-page">
            <header className="ah-title">
              <h1>Add New Hospital</h1>
              <p>Enter the details to register a new hospital facility in the system.</p>
            </header>

            <form className="ah-form" onSubmit={onSubmit}>
              <FormSection title="Basic Information">
                <div className="ah-grid two-col">{BASIC_FIELDS.map(renderField)}</div>
              </FormSection>

              <FormSection title="Location Details">
                <div className="ah-grid two-col">
                  {LOCATION_FIELDS.map(renderField)}

                  <div className="ah-grid inner-two-col">
                    {LOCATION_INNER_FIELDS.map(renderField)}
                  </div>

                  <FieldGroup className="ah-span-all" label="Map Location">
                    <button type="button" className="ah-map">
                      <div>
                        <i className="fa-solid fa-map" />
                        <p>Click to set exact coordinates</p>
                      </div>
                      <span>
                        <i className="fa-solid fa-location-dot" /> Drop Pin
                      </span>
                    </button>
                  </FieldGroup>
                </div>
              </FormSection>

              <FormSection title="Contact Information">
                <div className="ah-grid two-col">
                  <FieldGroup label="Primary Phone" required>
                    <div className="ah-input-icon">
                      <i className="fa-solid fa-phone" />
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(event) => updateField("phone", event.target.value)}
                        placeholder="(555) 000-0000"
                        required
                      />
                    </div>
                  </FieldGroup>

                  <FieldGroup label="Email Address">
                    <div className="ah-input-icon">
                      <i className="fa-solid fa-envelope" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={(event) => updateField("email", event.target.value)}
                        placeholder="contact@hospital.org"
                      />
                    </div>
                  </FieldGroup>

                  <FieldGroup className="ah-span-all" label="Website">
                    <div className="ah-web">
                      <span>https://</span>
                      <input
                        type="text"
                        value={form.website}
                        onChange={(event) => updateField("website", event.target.value)}
                        placeholder="www.hospital.org"
                      />
                    </div>
                  </FieldGroup>
                </div>
              </FormSection>

              <FormSection title="Services & Operations">
                <div className="ah-stack">
                  <div className="ah-grid two-col">
                    {TOGGLE_FIELDS.map((item) => (
                      <ToggleCard
                        key={item.field}
                        title={item.title}
                        description={item.description}
                        checked={form[item.field]}
                        onToggle={() => toggleField(item.field)}
                      />
                    ))}
                  </div>

                  <div>
                    <FieldGroup label="Departments & Specialties">
                      <div className="ah-chip-grid">
                        {DEPARTMENT_OPTIONS.map((department) => {
                          const active = form.departments.includes(department);
                          return (
                            <button
                              key={department}
                              type="button"
                              className={`ah-chip ${active ? "active" : ""}`}
                              onClick={() => toggleDepartment(department)}
                            >
                              <i className={`fa-solid ${active ? "fa-square-check" : "fa-square"}`} />
                              {department}
                            </button>
                          );
                        })}
                      </div>
                    </FieldGroup>
                  </div>

                  <div>
                    <FieldGroup label="Insurance Accepted">
                      <input
                        type="text"
                        className="ah-input"
                        value={form.insuranceInput}
                        onChange={(event) => updateField("insuranceInput", event.target.value)}
                        onBlur={addInsuranceTag}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                            addInsuranceTag();
                          }
                        }}
                        placeholder="Type to add insurance providers... (e.g. BlueCross, Medicare)"
                      />
                    </FieldGroup>

                    <div className="ah-tag-row">
                      {form.insuranceTags.map((tag) => (
                        <span key={tag} className="ah-tag">
                          {tag}
                          <button type="button" onClick={() => removeInsuranceTag(tag)}>
                            <i className="fa-solid fa-xmark" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FormSection>

              <FormSection title="Configuration">
                <div className="ah-stack">
                  <div className="ah-grid two-col">{CONFIG_FIELDS.map(renderField)}</div>

                  <div>
                    <FieldGroup label="Facility Logo / Cover Image">
                      <button type="button" className="ah-upload">
                        <i className="fa-solid fa-cloud-arrow-up" />
                        <strong>Click to upload or drag and drop</strong>
                        <span>SVG, PNG, JPG or GIF (max. 5MB)</span>
                      </button>
                    </FieldGroup>
                  </div>

                  <div className="ah-grid two-col">{STATUS_FIELDS.map(renderField)}</div>
                </div>
              </FormSection>

              <footer className="ah-actions">
                <button type="button" className="hospitals-secondary-btn">
                  Cancel
                </button>
                <button type="submit" className="hospitals-primary-btn">
                  Publish Hospital <i className="fa-solid fa-arrow-right" />
                </button>
              </footer>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
