import React, { useState } from "react";
import styles from "../components/AdminAppointment.module.css";
import { FaTrash } from "react-icons/fa";
import { FaEye } from "react-icons/fa"; // for "Details" icon
import Modal from "react-modal";

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
  appointmentUpdates: any[];
  staffId?: {
    staffId: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    role: string;
  };
  userId?: any;
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
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUpdates, setSelectedUpdates] = useState<any[]>([]);

  const filteredAppointments = [...appointments].reverse().filter((a) => {
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

  const openStaffModal = (staff: any) => {
    setSelectedStaff(staff);
    setShowStaffModal(true);
  };

  const openUpdateModal = (updates: any[]) => {
    setSelectedUpdates(updates);
    setShowUpdateModal(true);
  };

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
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Scheduled">Scheduled</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
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
                  <th>Managed By</th>
                  <th>Updated / Created</th>
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
                      <span className={styles.status}>{a.status}</span>
                    </td>
                    <td>
                      <button
                        className={styles.linkBtn}
                        onClick={() => openStaffModal(a.staffId)}
                        disabled={!a.staffId}
                      >
                        {a.staffId?.staffId || "N/A"}
                      </button>
                    </td>
                    <td>
                      {new Date(a.updatedAt).toLocaleString()}
                      <hr />
                      {new Date(a.createdAt).toLocaleString()}
                    </td>
                    <td>{a.isGuest ? "Guest" : "User"}</td>
                    <td>
                      <p
                        onClick={() => openUpdateModal(a.appointmentUpdates)}
                        className={styles.detailsBtn}
                        title="Details"
                      >
                        <FaEye />
                      </p>
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

      {/* Staff Modal */}
      <Modal
        isOpen={showStaffModal}
        onRequestClose={() => setShowStaffModal(false)}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        {selectedStaff ? (
          <>
            <h2>Staff Details</h2>
            <p>
              <strong>ID:</strong> {selectedStaff.staffId}
            </p>
            <p>
              <strong>Name:</strong> {selectedStaff.fullName}
            </p>
            <p>
              <strong>Email:</strong> {selectedStaff.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedStaff.phoneNumber}
            </p>
            <p>
              <strong>Role:</strong> {selectedStaff.role}
            </p>
          </>
        ) : (
          <p>No staff data available.</p>
        )}
        <button
          onClick={() => setShowStaffModal(false)}
          className={styles.closeBtn}
        >
          Close
        </button>
      </Modal>

      {/* Appointment Updates Modal */}
      <Modal
        isOpen={showUpdateModal}
        onRequestClose={() => setShowUpdateModal(false)}
        className={styles.largeModal}
        overlayClassName={styles.overlay}
      >
        <div className={styles.modalHeader}>
          <h2>Appointment Updates</h2>
          <button
            onClick={() => setShowUpdateModal(false)}
            className={styles.closeBtn}
          >
            X
          </button>
        </div>

        {selectedUpdates?.length > 0 ? (
          <div className={styles.tableContainer}>
            <table className={styles.updateTable}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Status</th>
                  <th>Type</th>
                  <th>Note</th>
                  <th>Staff ID</th>
                  <th>Follow-up Date</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                {selectedUpdates.reverse().map((log, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{log.status}</td>
                    <td>{log.appointmentType}</td>
                    <td>{log.note}</td>
                    <td>{log.staffId}</td>
                    <td>{new Date(log.followUpDate).toLocaleDateString()}</td>
                    <td>{new Date(log.updatedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No updates found.</p>
        )}
      </Modal>
    </div>
  );
};

export default AdminAppointment;
