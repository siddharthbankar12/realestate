import React, { useEffect, useState } from "react";
import styles from "./StaffProfile.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type Staff = {
  _id: string;
  staffId: string;
  fullName: string;
  email: string;
  role: string;
};

const StaffProfile: React.FC<{
  staff: Staff | null;
  updateToken: () => void;
}> = ({ staff, updateToken }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStaff, setEditedStaff] = useState<Staff | null>(staff);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (staff) {
      setEditedStaff(staff);
    }
  }, [staff]);

  if (!staff) return <div className={styles.loading}>Loading profile...</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedStaff) return;
    setEditedStaff({ ...editedStaff, [e.target.name]: e.target.value });
  };

  // console.log(token);

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/staff/update-detail/${staff._id}`,
        {
          fullName: editedStaff?.fullName,
          email: editedStaff?.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsEditing(false);
      toast.success("Profile updated successfully!");
      console.log(response.data.token);
      localStorage.setItem("authToken", response.data.token);
      updateToken();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      return toast.warn("Please fill both password fields.");
    }
    try {
      await axios.put(
        `http://localhost:8000/api/staff/${staff._id}/change-password`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Password changed successfully.");
      setOldPassword("");
      setNewPassword("");
      setShowPasswordChange(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to change password.");
    }
  };

  return (
    <div className={styles.profileContainerStaff}>
      <div className={styles.profileCardStaff}>
        <h2 className={styles.titleStaff}>👤 Staff Profile</h2>

        <div className={styles.fieldGroupStaff}>
          <label>Staff ID</label>
          <p>{staff.staffId}</p>
        </div>

        <div className={styles.fieldGroupStaff}>
          <label>Full Name</label>
          {isEditing ? (
            <input
              name="fullName"
              value={editedStaff?.fullName}
              onChange={handleChange}
            />
          ) : (
            <p>{staff.fullName}</p>
          )}
        </div>

        <div className={styles.fieldGroupStaff}>
          <label>Email</label>
          {isEditing ? (
            <input
              name="email"
              value={editedStaff?.email}
              onChange={handleChange}
            />
          ) : (
            <p>{staff.email}</p>
          )}
        </div>

        <div className={styles.fieldGroupStaff}>
          <label>Role</label>
          <p>{staff.role}</p>
        </div>

        <div className={styles.actionRowStaff}>
          {isEditing ? (
            <>
              <p onClick={handleSave} className={styles.saveBtnStaff}>
                Save
              </p>
              <p
                onClick={() => {
                  setEditedStaff(staff);
                  setIsEditing(false);
                }}
                className={styles.cancelBtnStaff}
              >
                Cancel
              </p>
            </>
          ) : (
            <p
              onClick={() => setIsEditing(true)}
              className={styles.editBtnStaff}
            >
              Edit Profile
            </p>
          )}
        </div>

        <hr className={styles.dividerStaff} />

        {!showPasswordChange ? (
          <p
            className={styles.changePasswordLinkStaff}
            onClick={() => setShowPasswordChange(true)}
          >
            🔐 Change Password
          </p>
        ) : (
          <div className={styles.passwordSectionStaff}>
            <div className={styles.fieldGroupStaff}>
              <label>Old Password</label>
              <div className={styles.passwordInputWrapperStaff}>
                <input
                  type={showOld ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <span onClick={() => setShowOld(!showOld)}>
                  {showOld ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div className={styles.fieldGroupStaff}>
              <label>New Password</label>
              <div className={styles.passwordInputWrapperStaff}>
                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <span onClick={() => setShowNew(!showNew)}>
                  {showNew ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div className={styles.actionRowStaff}>
              <p onClick={handleChangePassword} className={styles.saveBtnStaff}>
                Change Password
              </p>
              <p
                onClick={() => {
                  setShowPasswordChange(false);
                  setOldPassword("");
                  setNewPassword("");
                }}
                className={styles.cancelBtnStaff}
              >
                Cancel
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffProfile;
