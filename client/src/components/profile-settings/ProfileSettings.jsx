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
  const [preferences, setPreferences] = useState({
    activeRole: 'donor',
    language: 'en',
  });
  const [securityToggles, setSecurityToggles] = useState({
    authenticatorEnabled: true,
    loginAlertsEnabled: true,
  });
  const [passwordVisibility, setPasswordVisibility] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const handlePreferenceChange = (key, value) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const handleToggleChange = (key, value) => {
    setSecurityToggles((prev) => ({ ...prev, [key]: value }));
  };

  const togglePasswordVisibility = (key) => {
    setPasswordVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfileSettings;
