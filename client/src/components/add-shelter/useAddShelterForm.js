// hooks/useAddShelterForm.js
import { useState } from "react";
import { createShelter, saveShelterDraft } from "./addShelterApi";

const INITIAL_FORM = {
  // Basic Info
  name:        "",
  description: "",

  // Location
  street:      "",
  city:        "",
  state:       "",
  zip:         "",
  coordinates: null,

  // Contact & Ops
  phone:             "",
  email:             "",
  website:           "",
  totalCapacity:     "",
  availableCapacity: "",
  hours:             "",
  services:          [],
  eligibility:       "",

  // Media & Status
  mediaFiles: [],
  adminNotes: "",
};

const INITIAL_STATUS = {
  active:            true,
  acceptingReferrals: true,
};

export function useAddShelterForm() {
  const [form,   setForm]   = useState(INITIAL_FORM);
  const [status, setStatus] = useState(INITIAL_STATUS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const parseNumber = (value) => {
    const num = Number(value);
    return Number.isFinite(num) ? num : null;
  };

  const normalizeCoords = (coords) => {
    if (!coords) return null;
    if (Array.isArray(coords) && coords.length === 2) {
      const [lat, lng] = coords;
      const latitude = Number(lat);
      const longitude = Number(lng);
      if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
        return [longitude, latitude];
      }
      return null;
    }

    const latitude = Number(coords.latitude);
    const longitude = Number(coords.longitude);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
    return [longitude, latitude];
  };

  const parseIntakeHours = (hours) => {
    if (!hours || !hours.toString().trim()) return null;
    const raw = hours.toString().trim();
    const parts = raw.split(/\s*[\u2013-]\s*/);
    if (parts.length >= 2) {
      return { startTime: parts[0].trim(), endTime: parts[1].trim() };
    }
    return { startTime: raw, endTime: raw };
  };

  const buildRequirements = (data) => {
    const parts = [];
    if (data.description) parts.push(`Description: ${data.description}`);
    if (data.eligibility) parts.push(`Eligibility: ${data.eligibility}`);
    if (Array.isArray(data.services) && data.services.length > 0) {
      parts.push(`Services: ${data.services.join(", ")}`);
    }
    if (data.email) parts.push(`Email: ${data.email}`);
    if (data.website) parts.push(`Website: ${data.website}`);
    return parts.join("\n");
  };

  const buildServicePayload = (data, draft = false) => {
    const coords = normalizeCoords(data.coordinates);
    const capacity = parseNumber(data.totalCapacity);
    const availability =
      parseNumber(data.availableCapacity) ?? capacity ?? null;

    if (!coords) {
      throw new Error("Please set the map pin to select coordinates.");
    }

    if (capacity === null) {
      throw new Error("Total capacity must be a valid number.");
    }

    const intakeHours = parseIntakeHours(data.hours);
    const requirements = buildRequirements(data);

    return {
      title: "shelter",
      location: {
        type: "Point",
        coordinates: coords,
      },
      capacity,
      availability: availability ?? capacity,
      images: [],
      phone_number: data.phone,
      address: {
        building: data.name,
        street: data.street,
        city: data.city,
      },
      requirements: requirements || undefined,
      intake_hours: intakeHours || undefined,
      facilities: [],
      draft,
    };
  };

  /** Update any top-level field */
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  /** Update status toggles */
  const handleStatusChange = (field, value) => {
    setStatus((prev) => ({ ...prev, [field]: value }));
  };

  /** Update media file list */
  const handleFilesChange = (files) => {
    setForm((prev) => ({ ...prev, mediaFiles: files }));
  };

  /** Basic required-field validation */
  const validate = () => {
    const required = [
      "name",
      "description",
      "street",
      "city",
      "state",
      "zip",
      "phone",
      "email",
      "hours",
      "totalCapacity",
    ];
    const missing = required.filter((f) => !form[f]?.toString().trim());
    if (!form.coordinates) missing.push("coordinates");
    return { valid: missing.length === 0, missing };
  };

  const handlePublish = async () => {
    const { valid, missing } = validate();
    if (!valid) {
      setError(`Please fill in required fields: ${missing.join(", ")}`);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const shelterData = buildServicePayload(form, false);
      await createShelter(shelterData);
      setSuccess(true);
      setForm(INITIAL_FORM);
      setStatus(INITIAL_STATUS);
      
      // Reset success after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || "Failed to publish shelter");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const shelterData = buildServicePayload(form, true);
      await saveShelterDraft(shelterData);
      setSuccess(true);
      
      // Reset success after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || "Failed to save draft");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Discard changes and go back?")) {
      setForm(INITIAL_FORM);
    }
  };

  return {
    form,
    status,
    loading,
    error,
    success,
    handleChange,
    handleStatusChange,
    handleFilesChange,
    handlePublish,
    handleSaveDraft,
    handleCancel,
  };
}
