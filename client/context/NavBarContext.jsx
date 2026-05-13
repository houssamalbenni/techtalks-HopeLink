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
    { label: "Mentel Health", path: "/support-home" },
  ];
  const adminNavItems = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Announcement", path: "/admin/announcement" },
    {label: "Services Management", path: "hospital"},
  ];
  const doctorNavItems = [];

  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("role")) {
      const role = localStorage.getItem("role");
      if (role === "refugee") setNavItems(refugeNavItems);
      else if (role === "admin") setNavItems(adminNavItems);
      else if (role === "doctor") setNavItems(doctorNavItems);
    }
    if (localStorage.getItem("user_photo")) {
      setPhoto(localStorage.getItem("user_photo"));
    }
  }, []);

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
