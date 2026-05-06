import React, { useEffect, useState } from "react";
import "./Notification.css";
import NotificationCard from "./NotificationCard";
import SidebarOption from "./SidebarOption";
import SkeletonNotificationCard from "./SkeletonNotificationCard";
import { useNotifications } from "../../../context/NotificationContext";
import { formatNotificationTime } from "../../../utils/helper";

const NotificationsPage = () => {
  const [activeOption, setActiveOption] = useState("All Inbox");

  const { registerToSocket, notifications, loading } = useNotifications();
  const shelter_updates = notifications.filter(
    (n) => n.type === "shelter_update",
  );
  const food_updates = notifications.filter((n) => n.type === "food_update");
  const medicine_updates = notifications.filter(
    (n) => n.type === "medicine_update",
  );
  const emergency_alerts = notifications.filter(
    (n) => n.type === "emergency_alert",
  );
  const system_notifications = notifications.filter((n) => n.type === "system");
  const request_update = notifications.filter(
    (n) => n.type === "aid_request_update",
  );
  useEffect(() => {
    registerToSocket(
      localStorage.getItem("userId"),
      localStorage.getItem("role"),
    );
  }, []);

  const settingsOptions = [
    {
      label: "All Inbox",
      count: notifications.length == 0 ? "" : notifications.length,
      src: "../../assets/inbox.png",
    },
    {
      label: "Shelter Updates",
      count: shelter_updates.length == 0 ? "" : shelter_updates.length,
      src: "../../assets/shelters.png",
    },
    {
      label: "Medicine Updates",
      count: medicine_updates.length == 0 ? "" : medicine_updates.length,
      src: "../../assets/hospital.png",
    },
    {
      label: "Emergency Alerts",
      count: emergency_alerts.length == 0 ? "" : emergency_alerts.length,
      src: "../../assets/critical.png",
    },
    {
      label: "System",
      count:
        system_notifications.length == 0 ? "" : system_notifications.length,
      src: "../../assets/system.png",
    },
    {
      label: "Request Updates",
      count: request_update.length == 0 ? "" : request_update.length,
      src: "../../assets/request.png",
    },
  ];

  const typeByOption = {
    "Shelter Updates": "shelter_update",
    "Food Updates": "food_update",
    "Medicine Updates": "medicine_update",
    "Emergency Alerts": "emergency_alert",
    "System": "system",
    "Request Updates": "aid_request_update",
  };

  const filteredNotifications =
    activeOption === "All Inbox"
      ? notifications
      : notifications.filter(
          (notification) => notification.type === typeByOption[activeOption],
        );

  return (
    <div className="hopelink-container">
      <header className="main-header">
        <div className="logo">
          <img src="../../assets/clock.png" alt="logo" className="logo-img" />
          <span>HopeLink</span>
        </div>

        <nav className="desktop-nav">
          <a href="#">Dashboard</a>
          <a href="#">Aid Requests</a>
          <a href="#">Resources</a>
          <a href="#" className="active">
            Notifications
          </a>
        </nav>
      </header>

      <main className="main-layout">
        <aside className="left-sidebar desktop-only">
          <section className="sidebar-group">
            <h4 className="sidebar-title">NOTIFICATION SETTINGS</h4>
            {settingsOptions.map((opt) => (
              <SidebarOption
                key={opt.label}
                label={opt.label}
                src={opt.src}
                count={opt.count}
                active={activeOption === opt.label}
                onClick={() => setActiveOption(opt.label)}
              />
            ))}
          </section>
        </aside>

        <section className="content-area">
          <div className="content-header">
            <h1>Notifications</h1>
            <p>Stay updated on aid, shelter, and alerts.</p>
          </div>

          <div className="date-group">
            <h5 className="date-label">Your Notification</h5>

            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <SkeletonNotificationCard key={i} />
              ))
            ) : filteredNotifications.length === 0 ? (
              <p>No notifications.</p>
            ) : (
              filteredNotifications.map((notification) => (
                <NotificationCard
                  key={`${notification.id}-${notification.createdAt}`}
                  time={formatNotificationTime(notification.createdAt)}
                  {...notification}
                />
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default NotificationsPage;
