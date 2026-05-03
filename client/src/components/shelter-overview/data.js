/* ── Static data ──────────────────────────────────────────── */
export const SHELTERS = [
  { id: 1, name: "Safe Haven Center",  address: "123 Hope Street",  city: "Downtown",  capacity: 85,  total: 100, status: "active"   },
  { id: 2, name: "Mercy House",        address: "45 West Avenue",   city: "Westside",  capacity: 95,  total: 100, status: "active"   },
  { id: 3, name: "Sunrise Shelter",    address: "88 East Blvd",     city: "Eastside",  capacity: 20,  total: 50,  status: "inactive" },
  { id: 4, name: "Hope Community",     address: "200 North Park",   city: "Northside", capacity: 80,  total: 150, status: "active"   },
  { id: 5, name: "Harbor Light",       address: "12 Bay Road",      city: "Harbor",    capacity: 40,  total: 60,  status: "active"   },
  { id: 6, name: "Riverside Care",     address: "55 River Walk",    city: "Riverside", capacity: 10,  total: 40,  status: "inactive" },
];

export const TABS = ["Active Shelters", "Pending Approvals", "Archived"];

export const NAV_ITEMS = [
  { label: "Admin Dashboard", icon: "🏠" },
  { label: "Shelters",        icon: "🏥" },
  { label: "Hospitals",       icon: "🏨" },
  { label: "Add Shelter",     icon: "➕" },
  { label: "Add Hospital",    icon: "🏗️" },
  { label: "Settings",        icon: "⚙️" },
];
