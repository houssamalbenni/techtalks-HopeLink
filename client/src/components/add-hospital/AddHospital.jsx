
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AdminSidebar from "../hospitals/AdminSidebar";
import TopHeader from "../hospitals/TopHeader";
import { SIDEBAR_LINKS, USER_PROFILE } from "../hospitals/hospitalsData";
import FieldGroup from "./FieldGroup";
import FormSection from "./FormSection";
import ToggleCard from "./ToggleCard";
import MapComponent from "../add-shelter/MapComponent";
import {
  BREADCRUMBS,
  DEFAULT_FORM,
  DEPARTMENT_OPTIONS,
  HEADER_ACTIONS,
  OPERATING_HOURS_OPTIONS,
  STATE_OPTIONS,
  STATUS_OPTIONS,
} from "./addHospitalConfig";
import api from "../../../utils/axios";
import { ApiConst } from "../../../utils/APIConst";
import { getSupabaseClient } from "../../../utils/supabaseClient";
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
  const navigate = useNavigate();
  const [form, setForm] = useState(DEFAULT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const logoInputRef = useRef(null);
  const [mapKey, setMapKey] = useState(0);

  const supabaseBucket = import.meta.env.VITE_SUPABASE_BUCKET || "public-images";

  const actions = useMemo(
    () =>
      HEADER_ACTIONS.map((action) => {
        if (action.label === "Cancel") {
          return {
            ...action,
            onClick: () => navigate("/hospitals"),
            disabled: isSubmitting,
          };
        }

        if (action.label === "Save Draft") {
          return {
            ...action,
            onClick: () => toast.success("Draft saved locally."),
            disabled: isSubmitting,
          };
        }

        return action;
      }),
    [navigate, isSubmitting],
  );
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

  function decodeTokenUserId() {
    const token = localStorage.getItem("token");
    if (!token) return "";

    try {
      const tokenParts = token.split(".");
      if (tokenParts.length < 2) return "";

      const base64 = tokenParts[1].replace(/-/g, "+").replace(/_/g, "/");
      const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
      const payload = JSON.parse(atob(padded));

      return payload?.id || payload?._id || "";
    } catch {
      return "";
    }
  }

  function getOwnerNgoId() {
    const userId = localStorage.getItem("userId");
    if (userId) return userId;

    const rawUser = localStorage.getItem("user");
    if (!rawUser) return "";

    try {
      const parsed = JSON.parse(rawUser);
      return parsed?._id || parsed?.id || decodeTokenUserId();
    } catch {
      return decodeTokenUserId();
    }
  }

  async function uploadLogo(file) {
    const supabase = getSupabaseClient();
    if (!supabase) {
      toast.error("Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      return "";
    }

    const ownerNgoId = getOwnerNgoId() || "public";
    const extension = file.name.split(".").pop() || "png";
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
    const filePath = `hospitals/${ownerNgoId}/${fileName}`;

    const { error } = await supabase.storage.from(supabaseBucket).upload(filePath, file, {
      contentType: file.type,
      upsert: true,
    });

    if (error) {
      throw error;
    }

    const { data } = supabase.storage.from(supabaseBucket).getPublicUrl(filePath);
    return data?.publicUrl || "";
  }

  async function handleLogoChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const maxBytes = 5 * 1024 * 1024;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      event.target.value = "";
      return;
    }

    if (file.size > maxBytes) {
      toast.error("Image must be 5MB or smaller.");
      event.target.value = "";
      return;
    }

    setIsUploadingLogo(true);

    try {
      const publicUrl = await uploadLogo(file);
      if (!publicUrl) return;

      updateField("logoUrl", publicUrl);
      toast.success("Logo uploaded successfully.");
    } catch (error) {
      toast.error(error?.message || "Failed to upload logo.");
    } finally {
      setIsUploadingLogo(false);
      event.target.value = "";
    }
  }

  function getCurrentCoordinates() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported in this browser."));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          resolve([longitude, latitude]);
        },
        () => {
          reject(new Error("Location permission is required to create a hospital service."));
        },
      );
    });
  }

  async function handleUseMyLocation() {
    try {
      const [longitude, latitude] = await getCurrentCoordinates();
      updateField("lng", String(longitude));
      updateField("lat", String(latitude));
      setMapKey((prev) => prev + 1);
      toast.success("Location updated.");
    } catch (error) {
      toast.error(error?.message || "Unable to read your location.");
    }
  }

  async function onSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;
    if (isUploadingLogo) {
      toast.error("Please wait for the logo upload to finish.");
      return;
    }

    const capacity = Number(form.totalBeds);
    if (!Number.isFinite(capacity) || capacity <= 0) {
      toast.error("Total bed capacity is required and must be greater than 0.");
      return;
    }

    const ownerNgoId = getOwnerNgoId();

    setIsSubmitting(true);

    try {
      const lng = parseFloat(form.lng);
      const lat = parseFloat(form.lat);
      const coordinates = Number.isFinite(lng) && Number.isFinite(lat)
        ? [lng, lat]
        : await getCurrentCoordinates();

      const payload = {
        title: "hospital",
        location: {
          type: "Point",
          coordinates,
        },
        capacity,
        availability: capacity,
        images: form.logoUrl ? [form.logoUrl] : [],
        phone_number: form.phone,
        address: {
          street: form.streetAddress,
          city: form.city,
          building: form.hospitalName || undefined,
        },
        requirements: form.description,
        ...(ownerNgoId ? { owner_ngo: ownerNgoId } : {}),
      };

      await api.post(ApiConst.CREATE_SERVICE, payload);
      toast.success("Hospital created successfully.");
      navigate("/hospitals");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors?.[0]?.message ||
        error?.message ||
        "Failed to create hospital.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
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
                    <div className="ah-map">
                      <MapComponent
                        key={mapKey}
                        coords={form.lat && form.lng ? [Number(form.lat), Number(form.lng)] : undefined}
                        onCoordsChange={({ latitude, longitude }) => {
                          updateField("lat", latitude);
                          updateField("lng", longitude);
                        }}
                      />
                      <div className="ah-map-actions">
                        <button type="button" onClick={handleUseMyLocation}>
                          Use my location
                        </button>
                        <span>
                          Lat: {form.lat || "--"} | Lng: {form.lng || "--"}
                        </span>
                      </div>
                      <div className="ah-coords-row">
                        <label>
                          Latitude
                          <input
                            type="number"
                            className="ah-coord-input"
                            value={form.lat}
                            onChange={(event) => updateField("lat", event.target.value)}
                            step="0.000001"
                            placeholder="33.8547"
                          />
                        </label>
                        <label>
                          Longitude
                          <input
                            type="number"
                            className="ah-coord-input"
                            value={form.lng}
                            onChange={(event) => updateField("lng", event.target.value)}
                            step="0.000001"
                            placeholder="35.8623"
                          />
                        </label>
                      </div>
                    </div>
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
                      <input
                        ref={logoInputRef}
                        type="file"
                        accept="image/*"
                        className="ah-file-input"
                        onChange={handleLogoChange}
                      />
                      <button
                        type="button"
                        className={`ah-upload ${isUploadingLogo ? "is-uploading" : ""}`}
                        onClick={() => logoInputRef.current?.click()}
                        disabled={isUploadingLogo}
                      >
                        <i className="fa-solid fa-cloud-arrow-up" />
                        <strong>
                          {isUploadingLogo ? "Uploading logo..." : "Click to upload or drag and drop"}
                        </strong>
                        <span>SVG, PNG, JPG or GIF (max. 5MB)</span>
                      </button>
                      {form.logoUrl ? (
                        <div className="ah-upload-preview">
                          <img src={form.logoUrl} alt="Hospital logo preview" />
                          <button type="button" onClick={() => updateField("logoUrl", "")}>Remove</button>
                        </div>
                      ) : null}
                    </FieldGroup>
                  </div>

                  <div className="ah-grid two-col">{STATUS_FIELDS.map(renderField)}</div>
                </div>
              </FormSection>

              <footer className="ah-actions">
                <button type="button" className="hospitals-secondary-btn" onClick={() => navigate("/hospitals")}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="hospitals-primary-btn"
                  disabled={isSubmitting || isUploadingLogo}
                >
                  {isSubmitting ? "Publishing..." : "Publish Hospital"} <i className="fa-solid fa-arrow-right" />
                </button>
              </footer>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
