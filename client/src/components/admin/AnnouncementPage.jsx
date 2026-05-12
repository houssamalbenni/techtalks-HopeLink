import { useState } from 'react';
import { Announcement } from './Announcement';
import { UserList } from './UserList';
import { useNavBar } from '../../../context/NavBarContext';
import './Announcement.css';
export default function AnnouncementPage() {
  const [selectedUserId, setSelectedUserId] = useState('');
  const {setNavItems,setPhoto} = useNavBar();
  useState(() => {
    setNavItems([
      { label: "Dashboard", path: "/admin/dashboard" },
      { label: "Announcements", path: "/admin/announcement" },
    ]);
    const photo = localStorage.getItem("user_photo");
    setPhoto(photo);
  },[]);
  return (
    <div className="dashboard-container">
      <div className="dashboard-layouts">
        <Announcement selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId} />
        <UserList 
          selectedUserId={selectedUserId} 
          onSelectUser={(id) => setSelectedUserId(id)} 
        />
      </div>
    </div>
  );
}
