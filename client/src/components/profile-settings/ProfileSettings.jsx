import { useState } from 'react';
import './ProfileSettings.css';
import SidebarNav from './SidebarNav';
import TopHeader from './TopHeader';
import SettingsTabs from './SettingsTabs';
import ProfileSummaryCard from './ProfileSummaryCard';
import FieldGrid from './FieldGrid';
import ReadonlyField from './ReadonlyField';
import SelectField from './SelectField';
import ToggleCard from './ToggleCard';
import PasswordField from './PasswordField';
import SessionList from './SessionList';
import ActionPanel from './ActionPanel';
import { useProfileSettingsForm } from './useProfileSettingsForm';
import {
  sidebarConfig,
  mainNavItems,
  settingsTabs,
  headerConfig,
  profileSummaryConfig,
  profileFieldSections,
  rolePreferenceConfig,
  securityConfig,
  sessionsConfig,
  privacyConfig,
} from './data/profileSettingsData';

function ProfileSettings() {
  const {
    preferences,
    securityToggles,
    passwordVisibility,
    isDirty,
    loading,
    error,
    success,
    handlePreferenceChange,
    handleToggleChange,
    togglePasswordVisibility,
    handleSave,
    handleCancel,
  } = useProfileSettingsForm();

  return (
    <div className="ps-page">
      <SidebarNav
        logo={sidebarConfig.logo}
        searchPlaceholder={sidebarConfig.searchPlaceholder}
        navItems={mainNavItems}
        user={sidebarConfig.user}
      />

      <main className="ps-main">
        <div className="ps-glow ps-glow-blue" />
        <div className="ps-glow ps-glow-violet" />

        <TopHeader title={headerConfig.title} />

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
              marginLeft: "20px",
              marginRight: "20px",
              marginTop: "20px",
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
              marginLeft: "20px",
              marginRight: "20px",
              marginTop: "20px",
            }}
          >
            ✅ Profile settings updated successfully!
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
              marginLeft: "20px",
              marginRight: "20px",
              marginTop: "20px",
            }}
          >
            ⏳ Loading profile settings...
          </div>
        )}

        <div className="ps-content-scroll">
          <div className="ps-workspace">
            <SettingsTabs tabs={settingsTabs} />

            <section className="ps-sections">
              <section className="ps-card">
                <ProfileSummaryCard profile={profileSummaryConfig} />

                {profileFieldSections.map((section) => (
                  <div key={section.id}>
                    <div className="ps-divider" />
                    {section.action ? (
                      <div className="ps-section-head">
                        <h3>{section.title}</h3>
                        <button type="button">
                          {section.action.label}
                          <i className={`fa-solid ${section.action.icon}`} aria-hidden="true" />
                        </button>
                      </div>
                    ) : (
                      <h3 className="ps-block-title">{section.title}</h3>
                    )}
                    <FieldGrid
                      fields={section.fields}
                      renderField={(field) => (
                        <ReadonlyField
                          key={field.id}
                          id={field.id}
                          label={field.label}
                          value={field.value}
                          type={field.type}
                        />
                      )}
                    />
                  </div>
                ))}
              </section>

              <section className="ps-card">
                <h3 className="ps-block-title">{rolePreferenceConfig.title}</h3>
                <div className="ps-split-grid">
                  {rolePreferenceConfig.fields.map((field) => (
                    <SelectField
                      key={field.id}
                      id={field.id}
                      label={field.label}
                      options={field.options}
                      value={preferences[field.stateKey]}
                      hint={field.hint}
                      onChange={(value) => handlePreferenceChange(field.stateKey, value)}
                    />
                  ))}
                </div>
              </section>

              <section className="ps-card">
                <h3 className="ps-block-title">{securityConfig.verificationTitle}</h3>

                <div className="ps-split-grid">
                  {securityConfig.toggles.map((toggle) => (
                    <ToggleCard
                      key={toggle.id}
                      id={toggle.id}
                      title={toggle.title}
                      hint={toggle.hint}
                      checked={securityToggles[toggle.stateKey]}
                      onChange={(value) => handleToggleChange(toggle.stateKey, value)}
                    />
                  ))}
                </div>

                <div className="ps-divider" />

                <h3 className="ps-block-title">{securityConfig.passwordTitle}</h3>
                <div className="ps-split-grid">
                  {securityConfig.passwordFields.map((field) => (
                    <PasswordField
                      key={field.id}
                      id={field.id}
                      label={field.label}
                      visible={passwordVisibility[field.stateKey]}
                      onToggle={() => togglePasswordVisibility(field.stateKey)}
                    />
                  ))}
                </div>

                <div className="ps-inline-actions">
                  <button type="button">{securityConfig.passwordAction}</button>
                </div>

                <div className="ps-divider" />

                <h3 className="ps-block-title">{sessionsConfig.title}</h3>
                <SessionList sessions={sessionsConfig.sessions} />
              </section>

              <section className="ps-card">
                <h3 className="ps-block-title">{privacyConfig.title}</h3>

                <div className="ps-action-list">
                  {privacyConfig.actions.map((action) => (
                    <ActionPanel
                      key={action.id}
                      title={action.title}
                      description={action.description}
                      buttonLabel={action.buttonLabel}
                      buttonIcon={action.buttonIcon}
                      buttonClassName={action.buttonClassName}
                      rowClassName={action.rowClassName}
                    />
                  ))}
                </div>
              </section>

              {/* Settings Footer */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                marginTop: "20px",
              }}>
                {isDirty && !loading && (
                  <div style={{
                    color: "#666",
                    fontSize: "14px",
                  }}>
                    • Unsaved changes
                  </div>
                )}
                {loading && (
                  <div style={{
                    color: "#33c",
                    fontSize: "14px",
                  }}>
                    ⏳ Saving...
                  </div>
                )}
                {!isDirty && !loading && (
                  <div />
                )}
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={loading}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                      backgroundColor: "#fff",
                      cursor: loading ? "not-allowed" : "pointer",
                      opacity: loading ? 0.6 : 1,
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={loading || !isDirty}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: (loading || !isDirty) ? "#ccc" : "#33c",
                      color: "#fff",
                      cursor: (loading || !isDirty) ? "not-allowed" : "pointer",
                      opacity: (loading || !isDirty) ? 0.6 : 1,
                    }}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfileSettings;
