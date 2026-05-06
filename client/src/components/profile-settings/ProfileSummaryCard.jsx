import { useRef } from 'react';

function ProfileSummaryCard({ profile, onAction, onAvatarSelect, avatarUploading }) {
  const fileInputRef = useRef(null);

  const handlePickAvatar = () => {
    if (avatarUploading) {
      return;
    }

    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onAvatarSelect?.(file);
      event.target.value = '';
    }
  };

  return (
    <div className="ps-profile-top">
      <div className="ps-profile-identity">
        <div className="ps-avatar-wrap">
          <img src={profile.avatar} alt="Profile" />
          <button type="button" aria-label="Change avatar" onClick={handlePickAvatar} disabled={avatarUploading}>
            <i className="fa-solid fa-camera" aria-hidden="true" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="ps-avatar-input"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <h2>
            {profile.name}
            <span>
              <i className="fa-solid fa-circle-check" aria-hidden="true" />
              {profile.verifiedLabel}
            </span>
          </h2>
          <p>{profile.email}</p>
        </div>
      </div>
      <div className="ps-profile-actions">
        {profile.profileActions.map((action) => (
          <button
            key={action.id}
            type="button"
            className={action.className}
            onClick={() => onAction?.(action)}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProfileSummaryCard;
