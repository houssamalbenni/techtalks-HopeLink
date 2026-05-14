import { useState } from "react";
import { Announcement } from "./Announcement";
import { UserList } from "./UserList";
import "./Announcement.css";
export default function AnnouncementPage() {
  const [selectedUserId, setSelectedUserId] = useState("");
  return (
    <div className="announcement-page dashboard-container">
      <div className="dashboard-layouts">
        <Announcement
          selectedUserId={selectedUserId}
          setSelectedUserId={setSelectedUserId}
        />
        <UserList
          selectedUserId={selectedUserId}
          onSelectUser={(id) => setSelectedUserId(id)}
        />
      </div>
    </div>
  );
}
