import React, { useState } from "react";
import styles from "../components/AdminAppointment.module.css";
import { FaTrash } from "react-icons/fa";

interface Appointment {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  isGuest: boolean;
}

interface AdminAppointmentProps {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
  handleRemoveAppointment: (id: string) => void;
}

const AdminAppointment: React.FC<AdminAppointmentProps> = ({
  appointments,
  loading,
  error,
  handleRemoveAppointment,
}) => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter appointments based on selected status and search term
  const filteredAppointments = appointments.filter((a) => {
    const fullName = `${a.firstName} ${a.lastName}`.toLowerCase();
    const email = a.email.toLowerCase();
    const phone = a.phoneNumber.toLowerCase();
    const status = a.status.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();

    return (
      (selectedStatus === "all" || status === selectedStatus.toLowerCase()) &&
      (fullName.includes(searchTermLower) ||
        email.includes(searchTermLower) ||
        phone.includes(searchTermLower))
    );
  });

  return (
    <div className={styles.container}>
      {loading ? (
        <p className={styles.loading}>Loading appointments...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <div className={styles.tableWrapper}>
          <div className={styles.headerRow}>
            <p className={styles.headApp}>Appointments</p>
            <div style={{ width: "30%", display: "flex", gap: "10px" }}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search here..."
                className={styles.searchInput}
              />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className={styles.dropdown}
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {filteredAppointments.length > 0 ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Updated</th>
                  <th>Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((a) => (
                  <tr key={a._id}>
                    <td>
                      {`${a.firstName || ""} ${a.lastName || ""}`.trim() ||
                        "N/A"}
                    </td>
                    <td>{a.email || "N/A"}</td>
                    <td>{a.phoneNumber || "N/A"}</td>
                    <td>
                      <span
                        className={`${styles.status} ${
                          a.status.toLowerCase() === "pending"
                            ? styles.pending
                            : a.status.toLowerCase() === "cancelled"
                            ? styles.cancelled
                            : styles.confirmed
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                    <td>{new Date(a.createdAt).toLocaleString()}</td>
                    <td>{new Date(a.updatedAt).toLocaleString()}</td>
                    <td>{a.isGuest ? "Guest" : "User"}</td>
                    <td>
                      <button
                        onClick={() => handleRemoveAppointment(a._id)}
                        className={styles.deleteBtn}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className={styles.noAppointments}>
              No appointments found for selected status.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminAppointment;
