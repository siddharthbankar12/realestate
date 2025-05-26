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
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleUserClick = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  const filteredAppointments = appointments.filter((a) => {
    const matchesStatus =
      selectedStatus === "All" ||
      a.status.toLowerCase() === selectedStatus.toLowerCase();

    const fullName = `${a.firstName || ""} ${a.lastName || ""}`.toLowerCase();
    const email = (a.email || "").toLowerCase();
    const phone = (a.phoneNumber || "").toLowerCase();

    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      phone.includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  console.log(filteredAppointments);

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
            <div style={{ display: "flex", width: "30%", gap: "10px" }}>
              <input
                type="text"
                placeholder="Search here..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
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
                    <td>
                      {a.isGuest ? (
                        "Guest"
                      ) : (
                        <p
                          onClick={() => handleUserClick(a.userId)}
                          className={styles.userDetailsBtn}
                        >
                          User
                        </p>
                      )}
                    </td>

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
                {isModalOpen && selectedUser && (
                  <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                      <button
                        className={styles.closeModalBtn}
                        onClick={closeModal}
                      >
                        ×
                      </button>
                      <h2>User Details</h2>

                      <p>
                        <strong>Name:</strong> {selectedUser.firstName}{" "}
                        {selectedUser.lastName}
                      </p>
                      <p>
                        <strong>Email:</strong> {selectedUser.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {selectedUser.phoneNumber}
                      </p>
                      <p>
                        <strong>Landline:</strong> {selectedUser.landlineNumber}
                      </p>
                      <p>
                        <strong>City:</strong> {selectedUser.city}
                      </p>
                      <p>
                        <strong>Address:</strong> {selectedUser.address}
                      </p>
                    </div>
                  </div>
                )}
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
