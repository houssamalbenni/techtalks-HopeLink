// EditShelter.jsx  –  Root page component
import { useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import BasicInfoSection from "./BasicInfoSection";
import ContactLocationSection from "./ContactLocationSection";
import CapacityFacilitiesSection from "./CapacityFacilitiesSection";
import RecentChanges from "./RecentChanges";
import FormFooter from "./FormFooter";

import { useEditShelterForm } from "./useEditShelterForm";

import "./EditShelter.css";

export default function EditShelter() {
  const [activeNav, setActiveNav] = useState("Shelters");

  const {
    data,
    isDirty,
    loading,
    error,
    success,
    handleChange,
    handleSave,
    handleUpdate,
    handleCancel,
  } = useEditShelterForm();

  return (
    <div className="app-shell">
      {/* ── Sidebar ── */}
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      {/* ── Main area ── */}
      <div className="main">
        {/* Top navigation bar */}
        <Topbar
          shelterName={data.name || "Safe Haven Center"}
          onCancel={handleCancel}
          onUpdate={handleUpdate}
        />

        {/* Scrollable page body */}
        <div className="page-body">
          {/* Page heading */}
          <div className="page-heading">
            <h1 className="page-title">Edit Shelter Profile</h1>
            <p className="page-subtitle">
              Update information and settings for {data.name || "this shelter"}.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div
              style={{
                padding: "12px",
                marginBottom: "16px",
                backgroundColor: "#fee",
                border: "1px solid #fcc",
                borderRadius: "8px",
                color: "#c33",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div
              style={{
                padding: "12px",
                marginBottom: "16px",
                backgroundColor: "#efe",
                border: "1px solid #cfc",
                borderRadius: "8px",
                color: "#3c3",
              }}
            >
              ✅ Shelter updated successfully!
            </div>
          )}

          {/* Loading Indicator */}
          {loading && (
            <div
              style={{
                padding: "12px",
                marginBottom: "16px",
                backgroundColor: "#eef",
                border: "1px solid #ccf",
                borderRadius: "8px",
                color: "#33c",
              }}
            >
              ⏳ Loading shelter data...
            </div>
          )}

          {/* Section 1 – Basic Information */}
          <BasicInfoSection data={data} onChange={handleChange} />

          {/* Section 2 – Contact & Location */}
          <ContactLocationSection data={data} onChange={handleChange} />

          {/* Section 3 – Capacity & Facilities */}
          <CapacityFacilitiesSection data={data} onChange={handleChange} />

          {/* Section 4 – Recent Changes (audit log) */}
          <RecentChanges />

          {/* Sticky footer actions */}
          <FormFooter
            isDirty={isDirty}
            loading={loading}
            onCancel={handleCancel}
            onSave={handleSave}
          />
        </div>
      </div>
    </div>
  );
}
