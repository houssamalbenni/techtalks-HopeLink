// AddShelter.jsx  –  Root page component
import { useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import BasicInfoSection from "./BasicInfoSection";
import LocationSection from "./LocationSection";
import ContactOperationsSection from "./ContactOperationsSection";
import MediaUpload from "./MediaUpload";
import StatusCard from "./StatusCard";

import { useAddShelterForm } from "./useAddShelterForm";

import "./AddShelter.css";

export default function AddShelter() {
  const [activeNav, setActiveNav] = useState("Add Shelter");

  const {
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
  } = useAddShelterForm();

  return (
    <div className="app-shell">
      {/* ── Sidebar ── */}
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      {/* ── Main ── */}
      <div className="main">
        <Topbar
          onCancel={handleCancel}
          onDraft={handleSaveDraft}
          onPublish={handlePublish}
          loading={loading}
        />

        <div className="page-body">
          {/* Page heading */}
          <div className="page-heading">
            <h1 className="page-title">Create New Shelter</h1>
            <p className="page-subtitle">
              Fill in the details below to add a new shelter to the network.
              Required fields are marked with an asterisk{" "}
              <span className="required-note">(*)</span>.
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
              ✅ Shelter saved successfully!
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
              ⏳ Processing...
            </div>
          )}

          {/* Section 1: Basic Info */}
          <BasicInfoSection data={form} onChange={handleChange} />

          {/* Section 2: Location */}
          <LocationSection data={form} onChange={handleChange} />

          {/* Section 3: Contact & Operations */}
          <ContactOperationsSection data={form} onChange={handleChange} />

          {/* Section 4: Media + Status side-by-side */}
          <div className="bottom-grid">
            <div className="form-card">
              <MediaUpload
                files={form.mediaFiles}
                onFilesChange={handleFilesChange}
              />
            </div>

            <StatusCard
              status={status}
              onStatusChange={handleStatusChange}
              onPublish={handlePublish}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
