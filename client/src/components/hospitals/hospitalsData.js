export const HOSPITALS = [
  {
    id: "HSP-4092",
    name: "Mercy General Hospital",
    city: "San Francisco, CA",
    district: "Downtown District",
    email: "admin@mercygeneral.org",
    phone: "(415) 555-0125",
    status: "active",
    occupiedBeds: 320,
    totalBeds: 450,
  },
  {
    id: "HSP-4093",
    name: "St. Jude Medical Center",
    city: "San Jose, CA",
    district: "Westside",
    email: "contact@stjude.org",
    phone: "(408) 555-0128",
    status: "maintenance",
    occupiedBeds: 180,
    totalBeds: 210,
  },
  {
    id: "HSP-4095",
    name: "Oakland Central Trauma",
    city: "Oakland, CA",
    district: "East Bay",
    email: "trauma@oakcentral.org",
    phone: "(510) 555-0123",
    status: "active",
    occupiedBeds: 210,
    totalBeds: 480,
  },
  {
    id: "HSP-4098",
    name: "Valley Regional Care",
    city: "Santa Clara, CA",
    district: "North Valley",
    email: "info@valleyregional.org",
    phone: "(408) 555-0127",
    status: "capacity",
    occupiedBeds: 150,
    totalBeds: 150,
  },
];

export const STATUS_META = {
  active: { label: "Active", tone: "active" },
  maintenance: { label: "Maintenance", tone: "maintenance" },
  capacity: { label: "At Capacity", tone: "capacity" },
};

export const FILTER_OPTIONS = {
  status: [
    { value: "active", label: "Active" },
    { value: "maintenance", label: "Maintenance" },
    { value: "full", label: "At Capacity" },
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
  { label: "Admin Dashboard", icon: "fa-solid fa-chart-pie", href: "#" },
  { label: "Shelters", icon: "fa-solid fa-house-chimney-medical", href: "#" },
  { label: "Hospitals", icon: "fa-solid fa-hospital", href: "#" },
  { label: "Add Hospital", icon: "fa-solid fa-folder-plus", href: "#" },
  { label: "Add Shelter", icon: "fa-solid fa-plus-circle", href: "#" },
  { label: "Settings", icon: "fa-solid fa-gear", href: "#" },
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

export const PAGINATION_CONFIG = {
  from: 1,
  to: 10,
  total: 142,
  currentPage: 1,
  totalPages: 15,
  pages: [1, 2, 3, "ellipsis", 15],
};
