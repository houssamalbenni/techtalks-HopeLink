export const EDIT_BREADCRUMBS = [
  { label: "Admin Dashboard", href: "/dashboard" },
  { label: "Hospitals", href: "/hospitals" },
  { label: "Mercy General Hospital", href: "/hospitals" },
  { label: "Edit Details", current: true },
];

export const EDIT_HEADER_ACTIONS = [
  { label: "Cancel", variant: "secondary" },
  { label: "Save Changes", variant: "primary" },
];

export const FACILITY_TYPES = [
  { value: "general", label: "General Hospital" },
  { value: "specialty", label: "Regional Medical Center" },
  { value: "clinic", label: "Clinic" },
  { value: "trauma", label: "Trauma Center" },
];

export const OVERALL_STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "maintenance", label: "Maintenance" },
];

export const ER_STATUS_OPTIONS = [
  { value: "accepting", label: "Accepting Patients" },
  { value: "divert", label: "On Divert" },
  { value: "closed", label: "Closed" },
];

export const SPECIALTY_OPTIONS = [
  "Cardiology",
  "Pediatrics",
  "Orthopedics",
  "Neurology",
  "Oncology",
  "Psychiatry",
];

export const INSURANCE_OPTIONS = [
  "Medicare",
  "Medicaid",
  "BlueCross",
  "Aetna",
  "Cigna",
];

export const OPERATING_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const EDIT_INITIAL_FORM = {
  hospitalName: "Mercy General Hospital",
  facilityType: "specialty",
  description: "Regional Medical Center & Level I Trauma Facility",
  totalBeds: 500,
  overallStatus: "active",
  erStatus: "accepting",
  address1: "123 Health Ave",
  city: "San Francisco",
  state: "CA",
  zip: "94103",
  phone: "(555) 000-0000",
  email: "contact@mercygeneral.org",
  specialties: ["Cardiology", "Pediatrics", "Orthopedics", "Neurology"],
  insurance: ["Medicare", "Medicaid", "BlueCross", "Aetna"],
  isTwentyFourSeven: true,
  hours: {
    Monday: { open: "00:00", close: "23:59" },
    Tuesday: { open: "00:00", close: "23:59" },
    Wednesday: { open: "00:00", close: "23:59" },
    Thursday: { open: "00:00", close: "23:59" },
    Friday: { open: "00:00", close: "23:59" },
    Saturday: { open: "00:00", close: "23:59" },
    Sunday: { open: "00:00", close: "23:59" },
  },
};
