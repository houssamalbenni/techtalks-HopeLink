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

export const EDIT_DEFAULT_FORM = {
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
  departments: ["Wheelchair_Access", "Family_Rooms", "Hot_Meals", "Free_WiFi"],
  insuranceInput: "",
  insuranceTags: [],
  totalBeds: "",
  ownerNgo: "",
};
