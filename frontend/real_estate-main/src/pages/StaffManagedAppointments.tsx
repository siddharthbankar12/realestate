import React, { useState } from "react";
import styles from "./StaffManagedAppointments.module.css";
import { useNavigate } from "react-router-dom";

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
  staffId?: string;
  userId?: string;
  log?: string;
}

interface StaffManagedAppointmentsProps {
  appointments: Appointment[];
  loading: boolean;
  staffId: String;
  error: string | null;
  handleConfirmedAppointment: (id: String) => void;
  handleCancelAppointment: (id: string) => void;
  handleAcceptAppointment: (id: string) => void;
  handleUpdateLog: (id: string, log: string) => void;
}

const StaffManagedAppointments: React.FC<StaffManagedAppointmentsProps> = ({
  appointments,
  loading,
  staffId,
  error,
  handleCancelAppointment,
  handleAcceptAppointment,
}) => {
  const navigate = useNavigate();
  console.log(staffId);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStaff, setSelectedStaff] = useState<any | null>(null);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);

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
                <option value="Accepted">Accepted</option>
                <option value="Scheduled">Scheduled</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
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
                  <th>Managed By</th>
                  <th>Created</th>
                  <th>Updated</th>
                  <th>Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.reverse().map((a) => (
                  <tr key={a._id}>
                    <td>
                      {`${a.firstName || ""} ${a.lastName || ""}`.trim() ||
                        "N/A"}
                    </td>
                    <td>{a.email || "N/A"}</td>
                    <td>{a.phoneNumber || "N/A"}</td>
                    <td>
                      <span className={styles.status}>{a.status}</span>
                    </td>

                    <td className={styles.APManageStaff}>
                      {a.staffId ? (
                        <p
                          onClick={() => {
                            setSelectedStaff(a.staffId);
                            setIsStaffModalOpen(true);
                          }}
                          className={styles.userDetailsBtn}
                        >
                          {a.staffId.staffId}
                        </p>
                      ) : (
                        "—"
                      )}
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
                        <div className={styles.statusBTNs}>
                          <button
                            onClick={() => handleAcceptAppointment(a._id)}
                            className={styles.AcceptBtn}
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleCancelAppointment(a._id)}
                            className={styles.CancelBtn}
                          >
                            Reject
                          </button>
                        </div>
                      ) : a.status.toLowerCase() !== "cancelled" ? (
                        <button
                          className={styles.LogBTNs}
                          onClick={() =>
                            navigate(
                              `/staff/${staffId}/appointments/${a._id}/logs`
                            )
                          }
                        >
                          Logs
                        </button>
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
                {isStaffModalOpen && selectedStaff && (
                  <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                      <button
                        className={styles.closeModalBtn}
                        onClick={() => {
                          setIsStaffModalOpen(false);
                          setSelectedStaff(null);
                        }}
                      >
                        ×
                      </button>
                      <h2>Staff Details</h2>
                      <p>
                        <p>
                          <strong>Staff ID :</strong> {selectedStaff.staffId}
                        </p>
                        <strong>Full Name :</strong> {selectedStaff.fullName}
                      </p>
                      <p>
                        <strong>Email :</strong> {selectedStaff.email}
                      </p>
                      <p>
                        <strong>Phone :</strong> {selectedStaff.phoneNumber}
                      </p>
                      <p>
                        <strong>Role :</strong> {selectedStaff.role}
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
