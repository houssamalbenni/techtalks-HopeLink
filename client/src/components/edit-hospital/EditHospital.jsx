import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

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
import api from "../../../utils/axios";
import { ApiConst } from "../../../utils/APIConst";
import { getSupabaseClient } from "../../../utils/supabaseClient";
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
  const navigate = useNavigate();
  const { id } = useParams();
  const formRef = useRef(null);
  const fileInputRef = useRef(null);
  const initialOccupiedBedsRef = useRef(0);
  const [form, setForm] = useState(EDIT_INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [logoPreview, setLogoPreview] = useState(
    "https://storage.googleapis.com/uxpilot-auth.appspot.com/8a63a1214d-61dda6d03bd05096ba47.png",
  );

  const supabaseBucket = import.meta.env.VITE_SUPABASE_BUCKET || "public-images";

  const breadcrumbs = useMemo(() => EDIT_BREADCRUMBS, []);
  const headerActions = useMemo(
    () =>
      EDIT_HEADER_ACTIONS.map((action) => {
        if (action.label === "Cancel") {
          return {
            ...action,
            onClick: () => navigate("/hospitals"),
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

        setForm((prev) => {
          const nextCapacity = hospital?.capacity ?? prev.totalBeds;
          return {
            ...prev,
            hospitalName: hospital?.address?.building || prev.hospitalName,
            description: hospital?.requirements || "",
            logoUrl,
            totalBeds: nextCapacity,
            phone: hospital?.phone_number || "",
            address1: hospital?.address?.street || "",
            city: hospital?.address?.city || "",
            state: hospital?.address?.state || prev.state,
            zip: hospital?.address?.zip || prev.zip,
            availability: safeAvailability,
            ownerNgo: getOwnerNgoId(ownerNgoId),
            lng: lng != null ? String(lng) : "",
            lat: lat != null ? String(lat) : "",
          };
        });

        if (logoUrl) {
          setLogoPreview(logoUrl);
        }
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

    const lng = parseFloat(form.lng);
    const lat = parseFloat(form.lat);
    if (Number.isNaN(lng) || Number.isNaN(lat)) {
      console.error("Invalid coordinates in edit form", { lng: form.lng, lat: form.lat });
      toast.error("Valid location coordinates are required before saving.");
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

      const payload = {
        title: "hospital",
        capacity,
        availability,
        phone_number: form.phone?.trim(),
        requirements: form.description?.trim(),
        ...(ownerNgo ? { owner_ngo: ownerNgo } : {}),
        location: {
          type: "Point",
          coordinates: [lng, lat],
        },
        address: {
          building: form.hospitalName?.trim(),
          street: form.address1?.trim(),
          city: form.city?.trim(),
        },
      };

      if (form.logoUrl) {
        payload.images = [form.logoUrl];
      }

      await api.put(ApiConst.UPDATE_SERVICE(id), payload);
      toast.success("Hospital updated successfully.");
      navigate("/hospitals");
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
      setLogoPreview(publicUrl);
      toast.success("Logo uploaded successfully.");
    } catch (error) {
      toast.error(error?.message || "Failed to upload logo.");
    } finally {
      setIsUploadingLogo(false);
      event.target.value = "";
    }
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
      <AdminSidebar logoText="CareAdmin" navItems={SIDEBAR_LINKS} activeItem="Edit Hospital" user={USER_PROFILE} />

      <div className="hospitals-main-wrap">
        <TopHeader breadcrumbs={breadcrumbs} actions={headerActions} />

        <main className="hospitals-content">
          {isLoading ? <p>Loading hospital details...</p> : null}
          <div className="eh-page">
            <header className="eh-page-title">
              <h1>Edit Hospital Details</h1>
              <p>
                Update information for Mercy General Hospital. Changes will be reflected immediately across the system.
              </p>
            </header>

            <form ref={formRef} className="eh-form" onSubmit={handleSubmit}>
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
                      src={logoPreview}
                      alt="Hospital logo"
                    />
                  </div>
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".png,.jpg,.jpeg,.svg"
                      onChange={handleLogoChange}
                      style={{ display: "none" }}
                    />
                    <button
                      type="button"
                      className="hospitals-secondary-btn"
                      onClick={() => fileInputRef.current?.click()}
                    >
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
                <button type="button" className="hospitals-secondary-btn" onClick={() => navigate("/hospitals")}> 
                  Cancel
                </button>
                <button type="submit" className="hospitals-primary-btn" disabled={isSubmitting || isLoading}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </footer>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
