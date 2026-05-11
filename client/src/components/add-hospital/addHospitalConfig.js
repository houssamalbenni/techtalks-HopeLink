

export const DEPARTMENT_OPTIONS = [
  "Wheelchair_Access",
  "Family_Rooms",
  "Hot_Meals",
  "Free_WiFi",
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
  operatingHoursStart: "",
  operatingHoursEnd: "",
  operatingHoursEmergencyInterval: "",
  lat: "",
  lng: "",
  streetAddress: "",
  city: "",
  phone: "",
  email: "",
  website: "",
  erEnabled: true,
  appointmentsRequired: false,
  departments: ["Wheelchair_Access", "Family_Rooms", "Hot_Meals", "Free_WiFi"],
  insuranceInput: "",
  insuranceTags: [],
  totalBeds: "",
  initialStatus: "active",
  internalNotes: "",
};
