// hooks/useEditShelterForm.js
import { useState, useCallback } from "react";

// Pre-populated with "Safe Haven Center" data matching the screenshots
const INITIAL_DATA = {
  // Basic Info
  name:            "Sunny Haven Shelter",
  orgType:         "Non-Profit Organization",
  operatingStatus: "Active & Accepting Intake",
  description:
    "Safe Haven Center provides emergency and transitional housing for individuals and families experiencing homelessness. Our primary mission is to offer a safe, supportive environment while connecting residents with resources to achieve long-term stability.",

  // Contact & Location
  email:  "contact@safehaven.org",
  phone:  "(415) 555-0200",
  street: "123 Main St, Suite 100",
  city:   "San Francisco",
  state:  "CA",
  zip:    "94105",

  // Capacity & Facilities
  totalCapacity: "160",
  overflowLimit: "20",
  amenities: ["overnight", "meals", "medical", "jobs"],
};

export function useEditShelterForm() {
  const [data,    setData]    = useState(INITIAL_DATA);
  const [isDirty, setIsDirty] = useState(false);

  /** Update any field and mark form dirty */
  const handleChange = useCallback((field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  }, []);

  /** Validate required fields */
  const validate = () => {
    const required = ["name", "phone", "totalCapacity"];
    const missing  = required.filter((f) => !data[f]?.toString().trim());
    return { valid: missing.length === 0, missing };
  };

  const handleSave = () => {
    const { valid, missing } = validate();
    if (!valid) {
      alert(`Please fill in required fields: ${missing.join(", ")}`);
      return;
    }
    console.log("Saving shelter:", data);
    setIsDirty(false);
    alert("Shelter updated successfully! ✅");
  };

  const handleUpdate = () => handleSave();

  const handleCancel = () => {
    if (isDirty && !window.confirm("Discard unsaved changes?")) return;
    setData(INITIAL_DATA);
    setIsDirty(false);
  };

  return {
    data,
    isDirty,
    handleChange,
    handleSave,
    handleUpdate,
    handleCancel,
  };
}
