import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import AdminSidebar from "../hospitals/AdminSidebar";
import TopHeader from "../hospitals/TopHeader";
import { SIDEBAR_LINKS, USER_PROFILE } from "../hospitals/hospitalsData";
import FieldGroup from "../add-hospital/FieldGroup";
import FormSection from "../add-hospital/FormSection";
import MapComponent from "../add-hospital/MapComponent";
import {
  EDIT_BREADCRUMBS,
  EDIT_HEADER_ACTIONS,
  EDIT_DEFAULT_FORM,
} from "./editHospitalConfig";
import { DEPARTMENT_OPTIONS } from "../add-hospital/addHospitalConfig";
import api from "../../../utils/axios";
import { ApiConst } from "../../../utils/APIConst";
import { getSupabaseClient } from "../../../utils/supabaseClient";
import "../hospitals/Hospitals.css";
import "./EditHospital.css";

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

const LOCATION_INNER_FIELDS = [];

const CONFIG_FIELDS = [
  {
    field: "totalBeds",
    label: "Total Bed Capacity *",
    type: "input",
    inputType: "number",
    placeholder: "e.g. 500",
  },
];

export default function EditHospital() {
  const navigate = useNavigate();
  const { id } = useParams();
  const formRef = useRef(null);
  const initialOccupiedBedsRef = useRef(0);
  const [form, setForm] = useState(EDIT_DEFAULT_FORM);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const logoInputRef = useRef(null);
  const [mapKey, setMapKey] = useState(0);

  const supabaseBucket = import.meta.env.VITE_SUPABASE_BUCKET || "public-images";

  const breadcrumbs = useMemo(() => EDIT_BREADCRUMBS, []);
  const headerActions = useMemo(
    () =>
      EDIT_HEADER_ACTIONS.map((action) => {
        if (action.label === "Cancel") {
          return {
            ...action,
            onClick: () => navigate("/hospital"),
            disabled: isSubmitting,
          };
        }

        if (action.label === "Save Changes") {
          return {
            ...action,
            onClick: () => formRef.current?.requestSubmit(),
            disabled: isLoading || isSubmitting,
          };
        }

        return action;
      }),
    [navigate, isLoading, isSubmitting],
  );

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

  function getOwnerNgoId(fallbackValue = "") {
    if (fallbackValue) return fallbackValue;

    const userId = localStorage.getItem("userId");
    if (userId) return userId;

    const rawUser = localStorage.getItem("user");
    if (!rawUser) return decodeTokenUserId();

    try {
      const parsed = JSON.parse(rawUser);
      return parsed?._id || parsed?.id || decodeTokenUserId();
    } catch {
      return decodeTokenUserId();
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchHospital() {
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await api.get(ApiConst.GET_SERVICE_BY_ID(id));
        const hospital = res?.data?.data || res?.data || {};
        const coordinates = Array.isArray(hospital?.location?.coordinates)
          ? hospital.location.coordinates
          : [];
        const [lng, lat] = coordinates;
        const ownerNgoId = hospital?.owner_ngo?._id || hospital?.owner_ngo || "";
        const fetchedCapacity = Number(hospital?.capacity);
        const safeCapacity = Number.isFinite(fetchedCapacity) && fetchedCapacity > 0 ? fetchedCapacity : 0;
        const fetchedAvailability = Number(hospital?.availability);
        const safeAvailability = Number.isFinite(fetchedAvailability)
          ? Math.min(Math.max(fetchedAvailability, 0), safeCapacity)
          : 0;
        initialOccupiedBedsRef.current = Math.max(safeCapacity - safeAvailability, 0);

        if (!isMounted) return;

        const logoUrl = Array.isArray(hospital?.images) ? hospital.images[0] : "";
        const intakeHours = hospital?.intake_hours || {};
        const facilities = Array.isArray(hospital?.facilities) ? hospital.facilities : [];

        setForm((prev) => {
          const nextCapacity = hospital?.capacity ?? prev.totalBeds;
          return {
            ...prev,
            hospitalName: hospital?.address?.building || prev.hospitalName,
            description: hospital?.requirements || "",
            logoUrl,
            operatingHoursStart: intakeHours?.startTime || "",
            operatingHoursEnd: intakeHours?.endTime || "",
            operatingHoursEmergencyInterval: intakeHours?.emergency_interval || "",
            totalBeds: nextCapacity,
            phone: hospital?.phone_number || "",
            streetAddress: hospital?.address?.street || "",
            city: hospital?.address?.city || "",
            availability: safeAvailability,
            ownerNgo: getOwnerNgoId(ownerNgoId),
            lng: lng != null ? String(lng) : "",
            lat: lat != null ? String(lat) : "",
            departments: facilities.length ? facilities : prev.departments,
          };
        });
      } catch (error) {
        console.error("Failed to fetch hospital:", error);
        toast.error("Failed to load hospital data.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchHospital();

    return () => {
      isMounted = false;
    };
  }, [id]);

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

  function removeInsuranceTag(tag) {
    setForm((prev) => ({
      ...prev,
      insuranceTags: prev.insuranceTags.filter((item) => item !== tag),
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;
    if (isUploadingLogo) {
      toast.error("Please wait for the logo upload to finish.");
      return;
    }
    if (!id) {
      console.error("Missing hospital id in route params.");
      toast.error("Please open this page from a specific hospital record.");
      return;
    }

    if ((form.operatingHoursStart && !form.operatingHoursEnd) || (!form.operatingHoursStart && form.operatingHoursEnd)) {
      toast.error("Operating hours require both a start and end time.");
      return;
    }

    setIsSubmitting(true);

    try {
      const capacity = Number(form.totalBeds);
      const preservedOccupied = initialOccupiedBedsRef.current;
      const ownerNgo = getOwnerNgoId(form.ownerNgo);

      if (!Number.isFinite(capacity) || capacity <= 0) {
        toast.error("Total bed capacity must be greater than 0.");
        setIsSubmitting(false);
        return;
      }

      const availability = Math.max(capacity - preservedOccupied, 0);

      if (capacity < preservedOccupied) {
        toast("Capacity is now lower than current occupancy, so availability was set to 0.");
      }

      const lng = parseFloat(form.lng);
      const lat = parseFloat(form.lat);
      const coordinates = Number.isFinite(lng) && Number.isFinite(lat)
        ? [lng, lat]
        : await getCurrentCoordinates();

      const intakeHours = form.operatingHoursStart && form.operatingHoursEnd
        ? {
            startTime: form.operatingHoursStart,
            endTime: form.operatingHoursEnd,
            ...(form.operatingHoursEmergencyInterval
              ? { emergency_interval: form.operatingHoursEmergencyInterval }
              : {}),
          }
        : undefined;

      const payload = {
        title: "hospital",
        capacity,
        availability,
        phone_number: form.phone?.trim(),
        requirements: form.description?.trim(),
        ...(ownerNgo ? { owner_ngo: ownerNgo } : {}),
        location: {
          type: "Point",
          coordinates,
        },
        facilities: form.departments,
        ...(intakeHours ? { intake_hours: intakeHours } : {}),
        address: {
          building: form.hospitalName?.trim(),
          street: form.streetAddress?.trim(),
          city: form.city?.trim(),
        },
      };

      if (form.logoUrl) {
        payload.images = [form.logoUrl];
      }

      await api.put(ApiConst.UPDATE_SERVICE(id), payload);
      toast.success("Hospital updated successfully.");
      navigate("/hospital");
    } catch (error) {
      console.error("Failed to update hospital:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors?.[0]?.message ||
        error?.message ||
        "Failed to update hospital.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
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
          reject(new Error("Location permission is required to update a hospital service."));
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

  async function uploadLogo(file) {
    const supabase = getSupabaseClient();
    if (!supabase) {
      toast.error("Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      return "";
    }

    const ownerNgoId = getOwnerNgoId(form.ownerNgo) || "public";
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
            {options.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
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
      <AdminSidebar logoText="CareAdmin" navItems={SIDEBAR_LINKS} activeItem="Edit Hospital" user={USER_PROFILE} />

      <div className="hospitals-main-wrap">
        <TopHeader breadcrumbs={breadcrumbs} actions={headerActions} />

        <main className="hospitals-content">
          {isLoading ? (
            <div className="ah-skeleton">
              <div className="ah-skeleton-card">
                <div className="ah-skeleton-line lg" />
                <div className="ah-skeleton-grid two">
                  <div className="ah-skeleton-block" />
                  <div className="ah-skeleton-block" />
                </div>
              </div>
              <div className="ah-skeleton-card">
                <div className="ah-skeleton-line md" />
                <div className="ah-skeleton-grid two">
                  <div className="ah-skeleton-block" />
                  <div className="ah-skeleton-block" />
                </div>
                <div className="ah-skeleton-block tall" />
              </div>
              <div className="ah-skeleton-card">
                <div className="ah-skeleton-line md" />
                <div className="ah-skeleton-grid two">
                  <div className="ah-skeleton-block" />
                  <div className="ah-skeleton-block" />
                </div>
                <div className="ah-skeleton-grid two">
                  <div className="ah-skeleton-block" />
                  <div className="ah-skeleton-block" />
                </div>
              </div>
            </div>
          ) : null}
          {!isLoading ? (
            <div className="ah-page">
              <header className="ah-title">
                <h1>Edit Hospital</h1>
                <p>Update the details to keep this hospital record accurate.</p>
              </header>

              <form ref={formRef} className="ah-form" onSubmit={handleSubmit}>
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
                              onClick={() => toggleFromList("departments", department)}
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

                  <FieldGroup className="ah-span-all" label="Operating Hours">
                    <div className="ah-grid inner-two-col">
                      <label className="ah-label">
                        Start Time
                        <input
                          type="time"
                          className="ah-input"
                          value={form.operatingHoursStart}
                          onChange={(event) => updateField("operatingHoursStart", event.target.value)}
                        />
                      </label>
                      <label className="ah-label">
                        End Time
                        <input
                          type="time"
                          className="ah-input"
                          value={form.operatingHoursEnd}
                          onChange={(event) => updateField("operatingHoursEnd", event.target.value)}
                        />
                      </label>
                    </div>
                    <div className="ah-top-gap">
                      <label className="ah-label">
                        Emergency Interval (optional)
                        <input
                          type="text"
                          className="ah-input"
                          value={form.operatingHoursEmergencyInterval}
                          onChange={(event) => updateField("operatingHoursEmergencyInterval", event.target.value)}
                          placeholder="e.g. 15 mins"
                        />
                      </label>
                    </div>
                  </FieldGroup>

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
                </div>
              </FormSection>

                <footer className="ah-actions">
                  <button type="button" className="hospitals-secondary-btn" onClick={() => navigate("/hospital")}>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="hospitals-primary-btn"
                    disabled={isSubmitting || isUploadingLogo}
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"} <i className="fa-solid fa-arrow-right" />
                  </button>
                </footer>
              </form>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
}
