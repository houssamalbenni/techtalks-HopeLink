export const STATE_OPTIONS = [
  { value: "CA", label: "California" },
  { value: "NY", label: "New York" },
  { value: "TX", label: "Texas" },
];

export const DEPARTMENT_OPTIONS = [
  "Cardiology",
  "Pediatrics",
  "Neurology",
  "Orthopedics",
  "Oncology",
  "Maternity",
];

export const OPERATING_HOURS_OPTIONS = [
  { value: "24/7", label: "24/7 (Always Open)" },
  { value: "custom", label: "Custom Schedule..." },
];

export const STATUS_OPTIONS = [
  { value: "draft", label: "Draft (Hidden)" },
  { value: "active", label: "Active (Public)" },
  { value: "maintenance", label: "Maintenance" },
];

export const BREADCRUMBS = [
  { label: "Admin Dashboard", href: "#" },
  { label: "Hospitals", href: "#" },
  { label: "Add Hospital", current: true },
];

export const HEADER_ACTIONS = [
  { label: "Cancel", variant: "secondary" },
  { label: "Save Draft", variant: "primary" },
];

export const DEFAULT_FORM = {
  hospitalName: "",
  description: "",
  logoUrl: "",
  lat: "",
  lng: "",
  streetAddress: "",
  city: "",
  state: "",
  postalCode: "",
  phone: "",
  email: "",
  website: "",
  erEnabled: true,
  appointmentsRequired: false,
  departments: ["Cardiology", "Pediatrics", "Orthopedics"],
  insuranceInput: "",
  insuranceTags: ["Medicare", "Medicaid"],
  operatingHours: "24/7",
  totalBeds: "",
  initialStatus: "active",
  internalNotes: "",
};
