export const sidebarConfig = {
  logo: {
    icon: 'fa-hands-holding-circle',
    label: 'RefugeLink',
  },
  searchPlaceholder: 'Search resources...',
  user: {
    name: 'Michael Chen',
    role: 'Philanthropist',
    avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
  },
};

export const mainNavItems = [
  { id: 'ngo-operations', icon: 'fa-chart-pie', label: 'NGO Operations Dashboard' },
  { id: 'aid-distribution', icon: 'fa-box-open', label: 'Aid Distribution Monitoring' },
  { id: 'donor-dashboard', icon: 'fa-hand-holding-heart', label: 'Donor Dashboard' },
  { id: 'interactive-map', icon: 'fa-map-location-dot', label: 'Interactive Map' },
  { id: 'profile-settings', icon: 'fa-gear', label: 'Profile & Settings', active: true },
];

export const settingsTabs = [
  { id: 'account-details', icon: 'fa-user', label: 'Account Details', active: true },
  { id: 'security', icon: 'fa-shield-halved', label: 'Security & 2FA' },
  { id: 'notifications', icon: 'fa-bell', label: 'Notifications' },
  { id: 'language-region', icon: 'fa-globe', label: 'Language & Region' },
  { id: 'privacy-data', icon: 'fa-database', label: 'Privacy & Data' },
  { id: 'help-support', icon: 'fa-headset', label: 'Help & Support' },
];

export const headerConfig = {
  title: 'Profile & Settings',
};

export const profileSummaryConfig = {
  name: 'Michael Chen',
  email: 'michael.chen@example.com',
  avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
  verifiedLabel: 'Verified',
  profileActions: [
    { id: 'delete-profile', label: 'Delete', className: 'danger-lite' },
    { id: 'update-profile', label: 'Update', className: 'success-primary' },
  ],
};

export const profileFieldSections = [
  {
    id: 'personal-information',
    title: 'Personal Information',
    action: { id: 'edit-personal', label: 'Edit', icon: 'fa-pen' },
    fields: [
      { id: 'username', label: 'Username', value: 'michael.c', type: 'text' },
      { id: 'birth-date', label: 'Date of Birth', value: 'August 12, 1985', type: 'text' },
      { id: 'email', label: 'Email Address', value: 'michael.chen@example.com', type: 'email' },
      { id: 'phone', label: 'Phone Number', value: '+1 (555) 019-8432', type: 'tel' },
    ],
  },
  {
    id: 'address',
    title: 'Address',
    fields: [
      { id: 'country', label: 'Country', value: 'United States of America', type: 'text' },
      { id: 'city-state', label: 'City / State', value: 'San Francisco, CA', type: 'text' },
      { id: 'postal', label: 'Postal Code', value: '94105', type: 'text' },
      { id: 'tax-id', label: 'Tax ID / Organization Number', value: '88-XXXX421', type: 'text' },
    ],
  },
];

export const rolePreferenceConfig = {
  title: 'Role & Preferences',
  fields: [
    {
      id: 'active-role',
      stateKey: 'activeRole',
      label: 'Active Role',
      hint: 'Switching roles will change your default dashboard view.',
      options: [
        { value: 'donor', label: 'Donor / Philanthropist' },
        { value: 'ngo', label: 'NGO Representative (Pending Approval)' },
        { value: 'volunteer', label: 'Field Volunteer' },
      ],
    },
    {
      id: 'language',
      stateKey: 'language',
      label: 'Interface Language',
      options: [
        { value: 'en', label: 'English (US)' },
        { value: 'fr', label: 'French' },
        { value: 'ar', label: 'Arabic' },
        { value: 'es', label: 'Spanish' },
      ],
    },
  ],
};

export const securityConfig = {
  verificationTitle: 'Two-Step Verification',
  toggles: [
    {
      id: 'authenticator',
      stateKey: 'authenticatorEnabled',
      title: 'Two-Factor Authenticator',
      hint: 'Use an app like Google Auth',
    },
    {
      id: 'login-alert',
      stateKey: 'loginAlertsEnabled',
      title: 'Login Alert Notification',
      hint: 'Get notified of new logins',
    },
  ],
  passwordTitle: 'Security',
  passwordFields: [
    { id: 'new-password', stateKey: 'newPassword', label: 'New Password' },
    { id: 'confirm-password', stateKey: 'confirmPassword', label: 'Confirm New Password' },
  ],
  passwordAction: 'Update Password',
};

export const sessionsConfig = {
  title: 'Active Sessions',
  sessions: [
    {
      id: 'desktop-current',
      icon: 'fa-desktop',
      title: 'Mac OS • Chrome',
      meta: 'San Francisco, USA • IP: 192.168.1.1',
      current: true,
    },
    {
      id: 'ios-safari',
      icon: 'fa-mobile-screen',
      title: 'iOS • Safari',
      meta: 'San Francisco, USA • Active 2 hours ago',
      current: false,
    },
  ],
};

export const privacyConfig = {
  title: 'Privacy & Data Management',
  actions: [
    {
      id: 'export-data',
      title: 'Export Account Data',
      description:
        'Download a copy of your donation history, profile information, and activity logs in JSON or CSV format.',
      buttonLabel: 'Request Export',
      buttonIcon: 'fa-download',
      buttonClassName: 'ps-outline-btn',
    },
    {
      id: 'delete-account',
      title: 'Delete Account',
      description: 'Permanently delete your account and all associated data. This action cannot be undone.',
      buttonLabel: 'Delete Account',
      buttonIcon: 'fa-trash-can',
      buttonClassName: 'ps-danger-btn',
      rowClassName: 'danger',
    },
  ],
};
