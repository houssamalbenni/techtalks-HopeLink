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
    const required = ["name", "description", "street", "city", "state", "zip", "phone", "email", "hours", "totalCapacity"];
    const missing  = required.filter((f) => !form[f]?.toString().trim());
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
      
      const shelterData = {
        ...form,
        ...status,
      };
      
      const response = await createShelter(shelterData);
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
      
      const shelterData = {
        ...form,
        status: "draft",
      };
      
      const response = await saveShelterDraft(shelterData);
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
