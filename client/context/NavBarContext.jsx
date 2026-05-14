import { createContext, useContext, useEffect, useState } from "react";

const NavBarContext = createContext();

const NavBarProvider = ({ children }) => {
  const [navitems, setNavItems] = useState([
    { label: "Dashboard", path: "/refugee-dashboard" },
    { label: "Family Reunification", path: "/family-reunification" },
  ]);
  const refugeNavItems = [
    { label: "Dashboard", path: "/refugee-dashboard" },
    { label: "Family Reunification", path: "/family-reunification" },
    { label: "Mental Health", path: "/mental-health" },
    { label: "Support Home", path: "/support-home" },
    { label: "Interactive Exercises", path: "/interactive-exercises" },
  ];
  const donorNavItems = [
    { label: "donor", path: "/donor/donate" },
    { label: "Family Reunification", path: "/family-reunification" },
  ];
  const adminNavItems = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Announcement", path: "/admin/announcement" },
    {label: "Services Management", path: "hospital"},
  ];
  const doctorNavItems = [];
  const ngoNavItems = [
    { label: "NGO Dashboard", path: "/ngo/dashboard" },
    { label: "Aid Requests", path: "/ngo/dashboard" },
    { label: "Shelter Capacity", path: "/hospital" },
    { label: "Family Tracking", path: "/family-reunification" },
  ];

  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("role")) {
      const role = localStorage.getItem("role");
      if (role === "refugee") setNavItems(refugeNavItems);
      else if (role === "donor") setNavItems(donorNavItems);
      else if (role === "admin") setNavItems(adminNavItems);
      else if (role === "doctor") setNavItems(doctorNavItems);
      else if (role === "ngo") setNavItems(ngoNavItems);
    }
    if (localStorage.getItem("user_photo")) {
      setPhoto(localStorage.getItem("user_photo"));
    }
  }, [localStorage.getItem("token"), localStorage.getItem("user_photo")]);

  return (
    <NavBarContext.Provider value={{ navitems, setNavItems, photo, setPhoto }}>
      {children}
    </NavBarContext.Provider>
  );
};

export default NavBarProvider;

export const useNavBar = () => {
  const context = useContext(NavBarContext);
  if (!context) {
    throw new Error("useNavBar must be used within a NavBarProvider");
  }
  return context;
};
