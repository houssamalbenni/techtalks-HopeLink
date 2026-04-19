import { useMemo, useState } from "react";

import AdminSidebar from "../hospitals/AdminSidebar";
import TopHeader from "../hospitals/TopHeader";
import { SIDEBAR_LINKS, USER_PROFILE } from "../hospitals/hospitalsData";
import FieldControl from "./FieldControl";
import OperatingHoursTable from "./OperatingHoursTable";
import OptionGrid from "./OptionGrid";
import SectionCard from "./SectionCard";
import {
  EDIT_BREADCRUMBS,
  EDIT_HEADER_ACTIONS,
  EDIT_INITIAL_FORM,
  ER_STATUS_OPTIONS,
  FACILITY_TYPES,
  INSURANCE_OPTIONS,
  OPERATING_DAYS,
  OVERALL_STATUS_OPTIONS,
  SPECIALTY_OPTIONS,
} from "./editHospitalConfig";
import "../hospitals/Hospitals.css";
import "./EditHospital.css";

const BASIC_FIELD_GROUP = [
  { field: "hospitalName", label: "Hospital Name", required: true },
  { field: "facilityType", label: "Facility Type", required: true, options: FACILITY_TYPES },
];

const STATUS_FIELD_GROUP = [
  { field: "overallStatus", label: "Overall Status", options: OVERALL_STATUS_OPTIONS },
  { field: "erStatus", label: "ER Status", options: ER_STATUS_OPTIONS },
  { field: "totalBeds", label: "Total Beds", required: true, type: "number" },
];

const ADDRESS_FIELD_GROUP = [
  { field: "city", label: "City", required: true },
  { field: "state", label: "State", required: true },
  { field: "zip", label: "ZIP Code", required: true },
];

const CONTACT_FIELD_GROUP = [
  { field: "phone", label: "Main Phone Number", required: true },
  { field: "email", label: "Contact Email", type: "email" },
];

export default function EditHospital() {
  const [form, setForm] = useState(EDIT_INITIAL_FORM);

  const breadcrumbs = useMemo(() => EDIT_BREADCRUMBS, []);
  const headerActions = useMemo(() => EDIT_HEADER_ACTIONS, []);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleFromList(field, value) {
    setForm((prev) => {
      const exists = prev[field].includes(value);
      return {
        ...prev,
        [field]: exists ? prev[field].filter((item) => item !== value) : [...prev[field], value],
      };
    });
  }

  function updateHours(day, key, value) {
    setForm((prev) => ({
      ...prev,
      hours: {
        ...prev.hours,
        [day]: {
          ...prev.hours[day],
          [key]: value,
        },
      },
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function renderOptionList(options) {
    return options.map((item) => (
      <option key={item.value} value={item.value}>
        {item.label}
      </option>
    ));
  }

  function renderFieldControl(config) {
    const { field, label, required, options, type = "text" } = config;

    return (
      <FieldControl key={field} label={label} required={required} htmlFor={field}>
        {options ? (
          <select
            id={field}
            className="eh-input"
            value={form[field]}
            onChange={(event) => updateField(field, event.target.value)}
          >
            {renderOptionList(options)}
          </select>
        ) : (
          <input
            id={field}
            type={type}
            className="eh-input"
            value={form[field]}
            onChange={(event) => updateField(field, type === "number" ? Number(event.target.value) : event.target.value)}
          />
        )}
      </FieldControl>
    );
  }

  return (
    <div className="hospitals-page">
      <AdminSidebar logoText="CareAdmin" navItems={SIDEBAR_LINKS} activeItem="Hospitals" user={USER_PROFILE} />

      <div className="hospitals-main-wrap">
        <TopHeader breadcrumbs={breadcrumbs} actions={headerActions} />

        <main className="hospitals-content">
          <div className="eh-page">
            <header className="eh-page-title">
              <h1>Edit Hospital Details</h1>
              <p>
                Update information for Mercy General Hospital. Changes will be reflected immediately across the system.
              </p>
            </header>

            <form className="eh-form" onSubmit={handleSubmit}>
              <SectionCard title="Basic Information">
                <div className="eh-grid two-col">{BASIC_FIELD_GROUP.map(renderFieldControl)}</div>

                <FieldControl label="Description / Subtitle" htmlFor="description" className="top-gap">
                  <input
                    id="description"
                    className="eh-input"
                    value={form.description}
                    onChange={(event) => updateField("description", event.target.value)}
                  />
                </FieldControl>

                <div className="eh-logo-row">
                  <div className="eh-logo-frame">
                    <img
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/8a63a1214d-61dda6d03bd05096ba47.png"
                      alt="Hospital logo"
                    />
                  </div>
                  <div>
                    <button type="button" className="hospitals-secondary-btn">
                      Change Logo
                    </button>
                    <p>JPG, PNG or SVG. Max size of 2MB.</p>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Status & Capacity">
                <div className="eh-grid three-col">{STATUS_FIELD_GROUP.map(renderFieldControl)}</div>
              </SectionCard>

              <SectionCard title="Location & Contact">
                <FieldControl label="Street Address" required htmlFor="address1">
                  <input
                    id="address1"
                    className="eh-input"
                    value={form.address1}
                    onChange={(event) => updateField("address1", event.target.value)}
                  />
                </FieldControl>

                <div className="eh-grid three-col top-gap">
                  {ADDRESS_FIELD_GROUP.map(renderFieldControl)}
                </div>

                <div className="eh-grid two-col top-gap border-top">
                  {CONTACT_FIELD_GROUP.map(renderFieldControl)}
                </div>
              </SectionCard>

              <SectionCard title="Services & Insurance">
                <div>
                  <h3>Available Specialties</h3>
                  <OptionGrid
                    options={SPECIALTY_OPTIONS}
                    selected={form.specialties}
                    onToggle={(value) => toggleFromList("specialties", value)}
                  />
                </div>

                <div className="top-gap border-top">
                  <h3>Accepted Insurance Providers</h3>
                  <OptionGrid
                    options={INSURANCE_OPTIONS}
                    selected={form.insurance}
                    onToggle={(value) => toggleFromList("insurance", value)}
                  />
                </div>
              </SectionCard>

              <SectionCard
                title="Operating Hours"
                rightSlot={
                  <label className="eh-inline-check">
                    <input
                      type="checkbox"
                      checked={form.isTwentyFourSeven}
                      onChange={() => updateField("isTwentyFourSeven", !form.isTwentyFourSeven)}
                    />
                    <span>24/7 Facility</span>
                  </label>
                }
              >
                <OperatingHoursTable
                  days={OPERATING_DAYS}
                  hours={form.hours}
                  disabled={form.isTwentyFourSeven}
                  onChange={updateHours}
                />
              </SectionCard>

              <footer className="eh-footer-actions">
                <button type="button" className="hospitals-secondary-btn">
                  Cancel
                </button>
                <button type="submit" className="hospitals-primary-btn">
                  Save Changes
                </button>
              </footer>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
