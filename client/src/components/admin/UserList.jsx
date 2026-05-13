import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/userService";
import { UserSkeleton } from "./UserSkeleton";
export const UserList = ({ onSelectUser, selectedUserId }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data.users);
      console.log("Fetched users:", res.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredUsers = normalizedSearch
    ? users.filter((user) =>
        (user.full_name || "").toLowerCase().startsWith(normalizedSearch),
      )
    : users;

  return (
    <div className="user-list-card">
      <div className="user-list-header">
        <img
          src="https://api.iconify.design/lucide:users.svg?color=%232563eb"
          alt="Users icon"
          style={{ width: 20, height: 20 }}
          referrerPolicy="no-referrer"
        />
        <h2>All Users</h2>
      </div>
      <div className="user-list-search">
        <p className="user-list-search-label">Search by name (starts with)</p>
        <input
          className="user-list-search-input"
          type="text"
          placeholder="Type a name"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      {!loading && (
        <p
          style={{
            fontSize: "12px",
            color: "var(--text-muted)",
            marginTop: "16px",
          }}
        >
          Click a user to select them for a private announcement.
        </p>
      )}
      <div className="user-list-content">
        {loading
          ? Array.from({ length: 5 }).map((_, idx) => (
              <UserSkeleton key={idx} />
            ))
          : filteredUsers.map((user) => (
              <div
                key={user._id}
                className={`user-item ${selectedUserId === user._id ? "selected" : ""}`}
                onClick={() => onSelectUser(user._id)}
                id={`user-${user._id}`}
              >
                <div className="user-name-row">
                  <span className="user-name">{user.full_name}</span>
                  <span
                    className={`user-role-badge role-${user.role.toLowerCase()}`}
                  >
                    {user.role}
                  </span>
                </div>
                <span className="user-id">{user._id}</span>
              </div>
            ))}
      </div>
    </div>
  );
};
