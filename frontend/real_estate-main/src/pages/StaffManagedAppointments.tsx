import React, { useState } from "react";
import styles from "./StaffManagedAppointments.module.css";
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

interface StaffManagedAppointmentsProps {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
  handleConfirmedAppointment: (id: String) => void;
  handleCancelAppointment: (id: string) => void;
}

const StaffManagedAppointments: React.FC<StaffManagedAppointmentsProps> = ({
  appointments,
  loading,
  error,
  handleConfirmedAppointment,
  handleCancelAppointment,
}) => {
  const [selectedStatus, setSelectedStatus] = useState("All");

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  const filteredAppointments =
    selectedStatus === "All"
      ? appointments
      : appointments.filter(
          (a) => a.status.toLowerCase() === selectedStatus.toLowerCase()
        );

  return (
    <div className={styles.containerStaffApp}>
      {loading ? (
        <p className={styles.loading}>Loading appointments...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <div className={styles.tableWrapper}>
          <div className={styles.headerRow}>
            <p className={styles.headApp}>Appointments</p>
            <select
              value={selectedStatus}
              onChange={handleStatusChange}
              className={styles.statusFilter}
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {filteredAppointments && filteredAppointments.length > 0 ? (
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
                      {a.status.toLowerCase() === "pending" ? (
                        <>
                          <button
                            onClick={() => handleConfirmedAppointment(a._id)}
                            className={styles.ConfirmedBtn}
                            title="Confirmed"
                          >
                            Confirmed
                          </button>
                          <button
                            onClick={() => handleCancelAppointment(a._id)}
                            className={styles.CancelBtn}
                            title="Cancel"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className={styles.noAppointments}>No appointments available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default StaffManagedAppointments;
