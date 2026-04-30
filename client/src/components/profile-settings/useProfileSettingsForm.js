// hooks/useProfileSettingsForm.js
import { useState, useCallback, useEffect } from "react";
import { fetchUserProfile, updateUserProfile } from "./profileSettingsApi";

const INITIAL_PREFERENCES = {
  activeRole: "donor",
  language: "en",
};

const INITIAL_SECURITY = {
  authenticatorEnabled: true,
  loginAlertsEnabled: true,
};

const INITIAL_PASSWORD_VISIBILITY = {
  newPassword: false,
  confirmPassword: false,
};

export function useProfileSettingsForm(userId = "1") {
  const [preferences, setPreferences] = useState(INITIAL_PREFERENCES);
  const [securityToggles, setSecurityToggles] = useState(INITIAL_SECURITY);
  const [passwordVisibility, setPasswordVisibility] = useState(INITIAL_PASSWORD_VISIBILITY);
  const [isDirty, setIsDirty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch user profile on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const userData = await fetchUserProfile(userId);
        if (userData) {
          if (userData.preferences) {
            setPreferences(userData.preferences);
          }
          if (userData.security) {
            setSecurityToggles(userData.security);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch profile, using default data:", err);
        // Keep using INITIAL_PREFERENCES as fallback
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [userId]);

  /** Update preference and mark form dirty */
  const handlePreferenceChange = useCallback((key, value) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  }, []);

  /** Update security toggle and mark form dirty */
  const handleToggleChange = useCallback((key, value) => {
    setSecurityToggles((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  }, []);

  /** Toggle password visibility */
  const togglePasswordVisibility = useCallback((key) => {
    setPasswordVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  /** Save profile changes */
  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);

      const profileData = {
        preferences,
        security: securityToggles,
      };

      const response = await updateUserProfile(profileData);
      setSuccess(true);
      setIsDirty(false);

      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || "Failed to save profile settings");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /** Cancel changes */
  const handleCancel = () => {
    if (isDirty && !window.confirm("Discard unsaved changes?")) return;
    setPreferences(INITIAL_PREFERENCES);
    setSecurityToggles(INITIAL_SECURITY);
    setIsDirty(false);
  };

  return {
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
  };
}
