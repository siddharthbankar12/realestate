import React, { useState } from "react";
import styles from "../components/AdminProfile.module.css";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify"; // Import toastify

interface AdminProfileProps {
  adminProfile: {
    adminId: string;
    email: string;
    fullName: string;
    phoneNumber: number;
  };
}

const AdminProfile: React.FC<AdminProfileProps> = ({ adminProfile }) => {
  const [formData, setFormData] = useState(adminProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phoneNumber" ? Number(value) : value,
    }));
  };

  const handleUpdate = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/admin/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", result.token);
        setIsEditing(false);
        toast.success("Profile updated successfully!"); // Success toast
      } else {
        toast.error(result.error || "Something went wrong. Please try again."); // Error toast
      }
    } catch (error) {
      toast.error("An error occurred while updating the profile."); // Error toast
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiscard = () => {
    setFormData(adminProfile);
    setIsEditing(false);
  };

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <FaUserCircle className={styles.avatar} />
          <h2 className={styles.profileTitle}>Admin Profile</h2>
        </div>

        <div className={styles.profileGrid}>
          <div className={styles.profileField}>
            <label className={styles.label}>Admin ID</label>
            <p className={styles.readonly}>{formData.adminId}</p>
          </div>

          <div className={styles.profileField}>
            <label className={styles.label}>Full Name</label>
            {isEditing ? (
              <input
                className={styles.input}
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            ) : (
              <p className={styles.readonly}>{formData.fullName}</p>
            )}
          </div>

          <div className={styles.profileField}>
            <label className={styles.label}>Email</label>
            {isEditing ? (
              <input
                className={styles.input}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            ) : (
              <p className={styles.readonly}>{formData.email}</p>
            )}
          </div>

          <div className={styles.profileField}>
            <label className={styles.label}>Phone</label>
            {isEditing ? (
              <input
                className={styles.input}
                type="number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            ) : (
              <p className={styles.readonly}>{formData.phoneNumber}</p>
            )}
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.profileActions}>
          {isEditing ? (
            <>
              <button
                className={styles.updateBtn}
                onClick={handleUpdate}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
              <button className={styles.cancelBtn} onClick={handleDiscard}>
                Cancel
              </button>
            </>
          ) : (
            <button
              className={styles.editBtn}
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
