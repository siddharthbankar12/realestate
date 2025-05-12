import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styles from "./StaffManagement.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StaffManagement = () => {
  const [staffList, setStaffList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
  });

  const token = localStorage.getItem("authToken");
  const nameInputRef = useRef(null);

  const fetchStaff = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/staff/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStaffList(res.data);
    } catch (err) {
      console.error("Error fetching staff:", err);
      toast.error("Failed to fetch staff list.");
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { fullName, email, password, role } = form;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullName || !email || !password || !role) {
      toast.warn("Please fill out all fields.");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.warn("Please enter a valid email address.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/staff/signup", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Staff created successfully!");
      setShowModal(false);
      fetchStaff();
      setForm({ fullName: "", email: "", password: "", role: "" });
    } catch (err) {
      console.error(
        "Failed to create staff:",
        err.response?.data || err.message
      );
      toast.error(
        err.response?.data?.message || "Failed to create staff. Try again."
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this staff?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/staff/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Staff deleted successfully.");
      fetchStaff();
    } catch (err) {
      console.error("Error deleting staff:", err);
      toast.error("Failed to delete staff.");
    }
  };

  const openModal = () => {
    setForm({ fullName: "", email: "", password: "", role: "" });
    setShowModal(true);
    setTimeout(() => nameInputRef.current?.focus(), 0);
  };

  return (
    <div className={styles.staffContainer}>
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className={styles.staffHeader}>Staff Management</h2>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <button className={styles.addStaffButton} onClick={openModal}>
          + Add Staff
        </button>
      </div>

      <table className={styles.staffTable}>
        <thead>
          <tr>
            <th>Staff ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff) => (
            <tr key={staff._id}>
              <td>{staff.staffId}</td>
              <td>{staff.fullName}</td>
              <td>{staff.email}</td>
              <td>{staff.role}</td>
              <td>{new Date(staff.createdAt).toLocaleString()}</td>
              <td>
                <p
                  className={styles.deleteButtonStaff}
                  onClick={() => handleDelete(staff._id)}
                >
                  Delete
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className={styles.staffModalOverlay}>
          <div className={styles.staffModal}>
            <h3 className={styles.modalTitle}>Add New Staff</h3>
            <input
              ref={nameInputRef}
              className={styles.staffInput}
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
            />
            <input
              className={styles.staffInput}
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              className={styles.staffInput}
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            <select
              className={styles.staffSelect}
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="appointment_manager">Appointment Manager</option>
              <option value="verifier">Verifier</option>
              <option value="support">Support</option>
            </select>

            <div className={styles.staffModalActions}>
              <button
                className={styles.staffCreateButton}
                onClick={handleSubmit}
              >
                Create
              </button>
              <button
                className={styles.staffCancelButton}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;
