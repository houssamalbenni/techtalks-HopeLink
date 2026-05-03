// hooks/useAddShelterForm.js
import { useState } from "react";

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

  const handlePublish = () => {
    const { valid, missing } = validate();
    if (!valid) {
      alert(`Please fill in required fields: ${missing.join(", ")}`);
      return;
    }
    console.log("Publishing shelter:", { ...form, status });
    alert("Shelter published successfully! 🎉");
  };

  const handleSaveDraft = () => {
    console.log("Saving draft:", form);
    alert("Draft saved!");
  };

  const handleCancel = () => {
    if (window.confirm("Discard changes and go back?")) {
      setForm(INITIAL_FORM);
    }
  };

  return {
    form,
    status,
    handleChange,
    handleStatusChange,
    handleFilesChange,
    handlePublish,
    handleSaveDraft,
    handleCancel,
  };
}
