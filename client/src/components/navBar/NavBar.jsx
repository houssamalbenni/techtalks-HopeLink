import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./NavBar.css";
import { useNavigate,useLocation } from "react-router-dom";
export const Navbar = ({ navItems = [], photo }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (path) => {
    navigate(path);

    setIsMobileMenuOpen(false);
  };
  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        <div className="navbar-left">
          <button
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
          >
            <img
              src="../../../assets/menu.png"
              alt="menu"
              width={24}
              height={24}
            />
          </button>

          <div className="navbar-logo-group">
            <img
              src="../../../assets/logo.jpeg"
              alt="HopeLink Logo"
              className="navbar-logo"
              referrerPolicy="no-referrer"
            />
            <span className="navbar-brand">HopeLink</span>
          </div>
        </div>

        <ul className="desktop-nav-links">
          {navItems.map((item, index) => (
            <li key={index}>
              <button
                className={`nav-link-item ${location.pathname === item.path ? "active" : ""}`}
                onClick={() => handleNavClick(item.path)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="navbar-right">
          <div className="nav-icon-container" onClick={()=>navigate("/notification")}>
            <img src="../../../assets/notification.png" alt="test" width={20} height={20} />
            <span className="notification-badge"></span>
          </div>

          <div className="profile-wrapper" onClick={()=>navigate("/profile")}>
            <img
              src={photo || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
              alt="Profile"
              className="profile-image"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
            />
            <motion.aside
              className="mobile-drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="drawer-header">
                <span className="navbar-brand">HopeLink</span>
                <button onClick={toggleMobileMenu} className="close-drawer-btn">
                  <img
                    src="../../../assets/close.png"
                    alt="Close"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
              <ul className="mobile-nav-links">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <button
                      className={`mobile-nav-item ${location.pathname === item.path ? "active2" : ""}`}
                      onClick={() => handleNavClick(item.path)}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};
