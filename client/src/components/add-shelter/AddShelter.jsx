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
