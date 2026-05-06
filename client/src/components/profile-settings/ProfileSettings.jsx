import { useEffect, useMemo, useState } from 'react';
import './ProfileSettings.css';
import SidebarNav from './SidebarNav';
import TopHeader from './TopHeader';
import SettingsTabs from './SettingsTabs';
import ProfileSummaryCard from './ProfileSummaryCard';
import FieldGrid from './FieldGrid';
import ReadonlyField from './ReadonlyField';
import SelectField from './SelectField';
import {
  sidebarConfig,
  mainNavItems,
  settingsTabs,
  headerConfig,
  profileSummaryConfig,
  profileFieldSections,
  rolePreferenceConfig,
} from './data/profileSettingsData';
import { deleteCurrentUser, getUserById, updateCurrentUser } from '../../../services/userService';
import { clearAuthSession, getStoredUserId } from '../../../utils/authStorage';
import { getSupabaseClient } from '../../../utils/supabaseClient';

const AVATAR_BUCKET =
  import.meta.env.VITE_SUPABASE_AVATAR_BUCKET ||
  import.meta.env.VITE_SUPABASE_BUCKET ||
  'avatars';

const formatDate = (value) => {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const hasValue = (value) => {
  if (value === null || value === undefined) {
    return false;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (typeof value === 'string') {
    return value.trim().length > 0;
  }

  return true;
};

const formatRoleLabel = (role) => {
  if (!role) {
    return '';
  }

  return role
    .split(/[_-]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};

const ALWAYS_VISIBLE_FIELDS = new Set(['password']);

function ProfileSettings() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [actionMessage, setActionMessage] = useState('');
  const [preferences, setPreferences] = useState({
    activeRole: 'donor',
    language: 'en',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [avatarUploading, setAvatarUploading] = useState(false);

  const handlePreferenceChange = (key, value) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };


  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const userId = getStoredUserId();

        if (!userId) {
          setUser(null);
          setError('No active session found. Please log in again.');
          return;
        }

        const response = await getUserById(userId);
        const resolvedUser = response?.data?.user || response?.user || response;
        setUser(resolvedUser || null);
      } catch (err) {
        setError(err.message || 'Failed to load profile settings');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    setPreferences({
      activeRole: user.role || 'donor',
      language: user.selected_language || 'en',
    });
  }, [user]);

  const profileSummary = useMemo(() => {
    return {
      ...profileSummaryConfig,
      name: user?.full_name || profileSummaryConfig.name,
      email: user?.email || profileSummaryConfig.email,
      avatar: user?.profile_url || profileSummaryConfig.avatar,
    };
  }, [user]);

  const fieldValueMap = useMemo(() => {
    return {
      username: user?.full_name,
      'birth-date': user?.dob ? formatDate(user?.dob) : null,
      email: user?.email,
      phone: user?.phone,
      country: user?.location?.country,
      'city-state': user?.location?.city,
      postal: user?.location?.postal_code,
      'tax-id': user?.tax_id,
    };
  }, [user]);

  useEffect(() => {
    if (!user) {
      return;
    }

    setFormValues({
      username: user?.full_name || '',
      'birth-date': user?.dob ? formatDate(user?.dob) : '',
      email: user?.email || '',
      phone: user?.phone || '',
      country: user?.location?.country || '',
      'city-state': user?.location?.city || '',
      postal: user?.location?.postal_code || '',
      'tax-id': user?.tax_id || '',
      password: '',
    });
  }, [user]);

  const roleOptions = useMemo(() => {
    const baseOptions = rolePreferenceConfig.fields.find((field) => field.stateKey === 'activeRole')?.options || [];
    const activeRole = preferences.activeRole;
    if (!activeRole || baseOptions.some((option) => option.value === activeRole)) {
      return baseOptions;
    }

    return [{ value: activeRole, label: formatRoleLabel(activeRole) }, ...baseOptions];
  }, [preferences.activeRole]);

  const visibleProfileSections = useMemo(() => {
    return profileFieldSections
      .map((section) => {
        const fields = section.fields.filter(
          (field) => ALWAYS_VISIBLE_FIELDS.has(field.id) || hasValue(fieldValueMap[field.id]),
        );
        return { ...section, fields };
      })
      .filter((section) => section.fields.length > 0);
  }, [fieldValueMap]);

  const handleFieldChange = (fieldId, value) => {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleAvatarSelect = async (file) => {
    if (!user?._id) {
      setError('Profile data is not ready yet.');
      return;
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      setError('Supabase is not configured. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
      return;
    }

    try {
      setAvatarUploading(true);
      setError(null);
      const extension = file.name.split('.').pop();
      const safeExtension = extension ? extension.toLowerCase() : 'jpg';
      const filePath = `profiles/${user._id}/${Date.now()}-${Math.random().toString(16).slice(2)}.${safeExtension}`;
      const { error: uploadError } = await supabase.storage.from(AVATAR_BUCKET).upload(filePath, file, {
        upsert: true,
        contentType: file.type,
      });

      if (uploadError) {
        throw uploadError;
      }

      const { data: publicUrlData } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(filePath);
      const publicUrl = publicUrlData?.publicUrl;
      if (!publicUrl) {
        throw new Error('Failed to generate a public URL for the uploaded image.');
      }

      const response = await updateCurrentUser({ profile_url: publicUrl });
      const updatedUser = response?.data?.user || response?.user || response;
      if (updatedUser) {
        setUser(updatedUser);
      }
      setActionMessage('Profile image updated successfully.');
    } catch (err) {
      setError(err.message || 'Failed to upload avatar');
    } finally {
      setAvatarUploading(false);
    }
  };

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
    setActionMessage('');
    setFormValues((prev) => ({ ...prev, password: '' }));
  };

  const handleProfileAction = async (action) => {
    if (action.id === 'delete-profile') {
      const confirmed = window.confirm('Delete your account and all profile data? This cannot be undone.');
      if (!confirmed) {
        return;
      }

      try {
        setSaving(true);
        await deleteCurrentUser();
        clearAuthSession();
        setActionMessage('Account deleted. Redirecting to login...');
        window.location.assign('/login');
      } catch (err) {
        setError(err.message || 'Failed to delete account');
      } finally {
        setSaving(false);
      }
      return;
    }

    if (action.id === 'update-profile') {
      try {
        setSaving(true);
        setActionMessage('Saving changes...');
        const payload = {
          role: preferences.activeRole,
          selected_language: preferences.language,
        };
        const fieldUpdates = {
          username: 'full_name',
          'birth-date': 'dob',
          email: 'email',
          phone: 'phone',
          password: 'password',
        };

        Object.entries(fieldUpdates).forEach(([fieldId, apiKey]) => {
          const value = formValues[fieldId];
          if (hasValue(value)) {
            payload[apiKey] = value;
          }
        });

        const response = await updateCurrentUser(payload);
        const updatedUser = response?.data?.user || response?.user || response;
        if (updatedUser) {
          setUser(updatedUser);
        }
        setActionMessage('Profile updated successfully.');
        setIsEditing(false);
        setFormValues((prev) => ({ ...prev, password: '' }));
      } catch (err) {
        setError(err.message || 'Failed to update profile');
      } finally {
        setSaving(false);
      }
    }
  };


  return (
    <div className="ps-page">
      <SidebarNav
        logo={sidebarConfig.logo}
        searchPlaceholder={sidebarConfig.searchPlaceholder}
        navItems={mainNavItems}
        user={sidebarConfig.user}
      />

      <main className={`ps-main ${isEditing ? 'ps-editing' : ''}`.trim()}>
        <div className="ps-glow ps-glow-blue" />
        <div className="ps-glow ps-glow-violet" />

        <TopHeader title={headerConfig.title} />

        <div className="ps-content-scroll">
          <div className="ps-workspace">
            <SettingsTabs tabs={settingsTabs} />

            <section className="ps-sections">
              <section className="ps-card">
                <ProfileSummaryCard
                  profile={profileSummary}
                  onAction={handleProfileAction}
                  onAvatarSelect={handleAvatarSelect}
                  avatarUploading={avatarUploading}
                />

                {actionMessage ? <p className="ps-inline-note">{actionMessage}</p> : null}
                {error ? <p className="ps-inline-error">{error}</p> : null}
                {avatarUploading ? <p className="ps-inline-note">Uploading avatar...</p> : null}

                {visibleProfileSections.map((section) => (
                  <div key={section.id}>
                    <div className="ps-divider" />
                    {section.action ? (
                      <div className="ps-section-head">
                        <h3>{section.title}</h3>
                        <button type="button" onClick={toggleEditMode}>
                          {isEditing ? 'Cancel' : section.action.label}
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
                          value={isEditing ? formValues[field.id] : fieldValueMap[field.id]}
                          type={field.type}
                          readOnly={!isEditing}
                          onChange={(event) => handleFieldChange(field.id, event.target.value)}
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
                      options={field.stateKey === 'activeRole' ? roleOptions : field.options}
                      value={preferences[field.stateKey]}
                      hint={field.hint}
                      onChange={(value) => handlePreferenceChange(field.stateKey, value)}
                      disabled={field.stateKey === 'activeRole'}
                    />
                  ))}
                </div>
                {loading ? <p className="ps-inline-note">Loading preferences...</p> : null}
                {saving ? <p className="ps-inline-note">Saving changes...</p> : null}
              </section>

            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfileSettings;
