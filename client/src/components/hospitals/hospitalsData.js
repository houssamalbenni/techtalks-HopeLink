export const FILTER_OPTIONS = {
  status: [
    { value: "active", label: "Available" },
    { value: "maintenance", label: "Limited" },
    { value: "capacity", label: "Closed" },
  ],
  city: [
    { value: "sf", label: "San Francisco" },
    { value: "oak", label: "Oakland" },
    { value: "sj", label: "San Jose" },
  ],
  specialty: [
    { value: "trauma", label: "Trauma Center" },
    { value: "pediatric", label: "Pediatric" },
    { value: "cardiac", label: "Cardiac Care" },
  ],
};

export const SIDEBAR_LINKS = [
  { label: "Admin Dashboard", icon: "fa-solid fa-chart-pie", href: "/dashboard" },
  { label: "Shelters", icon: "fa-solid fa-house-chimney-medical", href: "/shelter-overview" },
  { label: "Hospitals", icon: "fa-solid fa-hospital", href: "/hospitals" },
  { label: "Add Hospital", icon: "fa-solid fa-folder-plus", href: "/add-hospital" },
  { label: "Edit Hospital", icon: "fa-solid fa-pen-to-square", href: "/edit-hospital" },
  { label: "Add Shelter", icon: "fa-solid fa-plus-circle", href: "/add-shelter" },
  { label: "Settings", icon: "fa-solid fa-gear", href: "/profile-settings" },
];

export const ACTIVE_TAGS = [
  { label: "Status: Active", primary: true },
  { label: "Emergency Services: Yes", primary: false },
];

export const USER_PROFILE = {
  initials: "AD",
  name: "Dr. Admin",
  email: "admin@careadmin.com",
};
