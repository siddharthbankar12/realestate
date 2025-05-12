import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AdminDashUserDetails.module.css";

interface AdminProfileProps {
  adminProfile: {
    adminId: string;
    email: string;
    fullName: string;
    phoneNumber: number;
  };
}

interface Property {
  title: string;
  city: string;
  type: string;
  price: number;
  _id: string;
}

interface Search {
  _id: string;
  search_text: string;
  search_datetime: string;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  state: string;
  city: string;
  address: string;
  image: string;
  searches?: Search[];
  previousView?: Property[];
  saveProperties?: Property[];
}

const AdminDashUserDetails: React.FC<AdminProfileProps> = ({
  adminProfile,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [popupUser, setPopupUser] = useState<User | null>(null);
  const [popupType, setPopupType] = useState<
    "searches" | "views" | "saved" | null
  >(null);

  console.log(users);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/admin/users-details?adminId=${adminProfile.adminId}`
        );
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users");
      }
    };

    fetchUsers();
  }, [adminProfile.adminId]);

  const openPopup = (user: User, type: "searches" | "views" | "saved") => {
    setPopupUser(user);
    setPopupType(type);
  };

  const closePopup = () => {
    setPopupUser(null);
    setPopupType(null);
  };
  const renderPopupData = () => {
    if (!popupUser || !popupType) return null;

    if (popupType === "searches") {
      return popupUser.searches?.map((s) => (
        <div className={styles.chartRow} key={s._id}>
          <span>{s.search_text}</span>
          <span>{new Date(s.search_datetime).toLocaleString()}</span>
        </div>
      ));
    }

    const dataList =
      popupType === "views" ? popupUser.previousView : popupUser.saveProperties;

    return dataList?.map((item) => {
      const p = (item as any).propertyId || item;

      return (
        <div className={styles.chartRow} key={item._id}>
          <span>{p.title}</span>
          <span>{p.city}</span>
          <span>₹{p.price}</span>
        </div>
      );
    });
  };

  return (
    <div className={styles.adminContainer}>
      <h2 className={styles.title}>All Registered Users</h2>
      <div className={styles.tableContainer}>
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td>
                  <img src={user.image} className={styles.userImg} />
                </td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.city == "City" ? "-" : user.city} </td>
                <td>{user.role}</td>
                <td>
                  <button
                    className={styles.BtnAdminDash}
                    onClick={() => openPopup(user, "searches")}
                  >
                    Searches
                  </button>
                  <button
                    className={styles.BtnAdminDash}
                    onClick={() => openPopup(user, "views")}
                  >
                    Previous Views
                  </button>
                  <button
                    className={styles.BtnAdminDash}
                    onClick={() => openPopup(user, "saved")}
                  >
                    Saved Properties
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {popupUser && popupType && (
        <div className={styles.popupOverlay} onClick={closePopup}>
          <div
            className={styles.popupContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className={styles.popupHeading}>
              {popupType === "searches"
                ? "User Searches"
                : popupType === "views"
                ? "User Previous Views"
                : "USer Saved Properties"}
            </h3>
            <button onClick={closePopup} className={styles.closeBtn}>
              ✕
            </button>
            <div className={styles.chartContainer}>
              <div className={styles.chartHeader}>
                {popupType === "searches" ? (
                  <>
                    <span>Search Text</span>
                    <span>Timestamp</span>
                  </>
                ) : (
                  <>
                    <span>Title</span>
                    <span>City</span>
                    <span>Price</span>
                  </>
                )}
              </div>
              <div className={styles.chartBody}>{renderPopupData()}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashUserDetails;
