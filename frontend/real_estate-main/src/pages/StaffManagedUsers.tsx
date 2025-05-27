import React, { useEffect, useState } from "react";
import styles from "./StaffManagedUsers.module.css";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  landlineNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  role?: string;
  image?: string;
}

interface StaffManagedUsersProps {
  userDetails: User[] | null;
}

const StaffManagedUsers: React.FC<StaffManagedUsersProps> = ({
  userDetails,
}) => {
  const [filteredRole, setFilteredRole] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    if (userDetails) {
      let result = userDetails;

      if (filteredRole !== "All") {
        result = result.filter((user) => user.role === filteredRole);
      }

      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        result = result.filter(
          (user) =>
            user.firstName?.toLowerCase().includes(query) ||
            user.lastName?.toLowerCase().includes(query) ||
            user.email?.toLowerCase().includes(query) ||
            user.phoneNumber?.includes(query)
        );
      }

      setFilteredUsers(result);
    }
  }, [userDetails, filteredRole, searchQuery]);

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h2 className={styles.heading}>User Management</h2>
        <div className={styles.controls}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by name, email, or phone"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className={styles.dropdown}
            value={filteredRole}
            onChange={(e) => setFilteredRole(e.target.value)}
          >
            <option value="All">All Roles</option>
            <option value="builder">Builder</option>
            <option value="agent">Agent</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>

      {filteredUsers.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>State</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, idx) => (
              <tr key={user._id}>
                <td>{idx + 1}</td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.city || "N/A"}</td>
                <td>{user.state || "N/A"}</td>
                <td>
                  <span className={styles.roleTag}>{user.role}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.noData}>No users found for selected criteria.</p>
      )}
    </div>
  );
};

export default StaffManagedUsers;
