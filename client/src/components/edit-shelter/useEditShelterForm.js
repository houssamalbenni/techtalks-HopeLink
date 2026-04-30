// hooks/useEditShelterForm.js
import { useState, useCallback, useEffect } from "react";
import { fetchShelter, updateShelter } from "./editShelterApi";

// Pre-populated with "Sunny Haven Shelter" data matching the screenshots
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

export function useEditShelterForm(shelterId = "1") {
  const [data,    setData]    = useState(INITIAL_DATA);
  const [isDirty, setIsDirty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch shelter data on mount
  useEffect(() => {
    const loadShelter = async () => {
      try {
        setLoading(true);
        setError(null);
        const shelterData = await fetchShelter(shelterId);
        if (shelterData) {
          setData(shelterData);
        }
      } catch (err) {
        console.warn("Failed to fetch shelter, using default data:", err);
        // Keep using INITIAL_DATA as fallback
      } finally {
        setLoading(false);
      }
    };

    loadShelter();
  }, [shelterId]);

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

  const handleSave = async () => {
    const { valid, missing } = validate();
    if (!valid) {
      setError(`Please fill in required fields: ${missing.join(", ")}`);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await updateShelter(shelterId, data);
      setSuccess(true);
      setIsDirty(false);
      
      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || "Failed to update shelter");
      console.error(err);
    } finally {
      setLoading(false);
    }
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
    loading,
    error,
    success,
    handleChange,
    handleSave,
    handleUpdate,
    handleCancel,
  };
}
