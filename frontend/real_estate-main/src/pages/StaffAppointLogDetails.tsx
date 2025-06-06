import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import styles from "./StaffAppointLogDetails.module.css";
import { toast } from "react-toastify";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city?: string;
  address?: string;
}

interface Staff {
  staffId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
}

interface AppointmentUpdate {
  status: string;
  note: string;
  appointmentType: string;
  followUpDate?: string;
  updatedAt: string;
}

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
  latestUpdate?: AppointmentUpdate;
  userId?: User;
  staffId?: Staff;
}

const StaffAppointLogDetails: React.FC = () => {
  const navigate = useNavigate();
  const { staffId, appointmentId } = useParams();
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [updateList, setUpdateList] = useState<AppointmentUpdate[]>([]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [note, setNote] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");

  const fetchAppointment = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/staff/get-appointment/${appointmentId}/details`
      );
      if (!response.ok) throw new Error();
      const data = await response.json();
      const appt = data.appointmentDetails;
      setAppointment(appt);
      setStatus(appt.latestUpdate?.status || appt.status || "");
      setNote(appt.latestUpdate?.note || "");
      setAppointmentType(appt.latestUpdate?.appointmentType || "");
      setFollowUpDate(appt.latestUpdate?.followUpDate?.split("T")[0] || "");
    } catch {
      toast.error("Unable to fetch appointment details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointmentLogs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/staff/appointment/${appointmentId}/logs`
      );
      if (response.data.success) {
        const sortedUpdates = response.data.updates.sort(
          (a: AppointmentUpdate, b: AppointmentUpdate) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        setUpdateList(sortedUpdates);
      }
    } catch (error) {
      toast.error("Failed to fetch appointment update logs.");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8000/api/staff/appointment/${appointmentId}/update-log`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
            note,
            appointmentType,
            followUpDate,
            staffId,
          }),
        }
      );

      if (!response.ok) throw new Error();
      toast.success("Appointment update saved successfully!");
      setShowAddForm(false);
      fetchAppointment();
      fetchAppointmentLogs();
    } catch {
      toast.error("Failed to update appointment.");
    }
  };

  useEffect(() => {
    fetchAppointment();
    fetchAppointmentLogs();
  }, [appointmentId]);

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <button
            onClick={() => navigate("/staff-dashboard")}
            className={styles.backButton}
          >
            Back
          </button>
        </div>
        <h2 className={styles.heading}>Appointment Details</h2>

        {loading ? (
          <p className={styles.loading}>Loading...</p>
        ) : appointment ? (
          <div className={styles.flexLayout}>
            {/* Left: Appointment Info */}
            <div className={styles.detailsTableWrapper}>
              <table className={styles.detailsTable}>
                <tbody>
                  <tr className={styles.sectionHeader}>
                    <td colSpan={2}>
                      <strong>Appointment Information</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Appointment ID</td>
                    <td>{appointment._id}</td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>{appointment.status}</td>
                  </tr>
                  <tr>
                    <td>Created At</td>
                    <td>{new Date(appointment.createdAt).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Last Updated</td>
                    <td>{new Date(appointment.updatedAt).toLocaleString()}</td>
                  </tr>

                  <tr className={styles.sectionHeader}>
                    <td colSpan={2}>
                      <strong>Contact Person</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>
                      {appointment.firstName} {appointment.lastName}
                    </td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{appointment.email}</td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td>{appointment.phoneNumber}</td>
                  </tr>
                  <tr>
                    <td>User Type</td>
                    <td>
                      {appointment.isGuest ? "Guest User" : "Registered User"}
                    </td>
                  </tr>

                  {!appointment.isGuest && appointment.userId && (
                    <>
                      <tr className={styles.sectionHeader}>
                        <td colSpan={2}>
                          <strong>Registered User Details</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>Name</td>
                        <td>
                          {appointment.userId.firstName}{" "}
                          {appointment.userId.lastName}
                        </td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{appointment.userId.email}</td>
                      </tr>
                      <tr>
                        <td>Address</td>
                        <td>{appointment.userId.address || "N/A"}</td>
                      </tr>
                    </>
                  )}

                  {appointment.staffId && (
                    <>
                      <tr className={styles.sectionHeader}>
                        <td colSpan={2}>
                          <strong>Staff In Charge</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>Name</td>
                        <td>{appointment.staffId.fullName}</td>
                      </tr>
                      <tr>
                        <td>Role</td>
                        <td>{appointment.staffId.role}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{appointment.staffId.email}</td>
                      </tr>
                      <tr>
                        <td>Phone</td>
                        <td>{appointment.staffId.phoneNumber}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>

            <div className={styles.formWrapper}>
              <h3 className={styles.formHeading}>Appointment Updates</h3>
              {appointment.status !== "Completed" && (
                <button
                  onClick={() => {
                    setShowAddForm(true);
                    setStatus("");
                    setNote("");
                    setAppointmentType("");
                    setFollowUpDate("");
                  }}
                  className={styles.submitButton}
                >
                  + Add Update
                </button>
              )}
              {updateList.length > 0 ? (
                <ul className={styles.updateList}>
                  {updateList.map((update, index) => (
                    <li key={index} className={styles.updateItem}>
                      <div>
                        <strong>Status :</strong> {update.status}
                      </div>
                      <div>
                        <strong>Managed By :</strong> {update?.staffId}
                      </div>
                      <div>
                        <strong>Type :</strong> {update.appointmentType}
                      </div>

                      {update.followUpDate && (
                        <div>
                          <strong>Follow-up Date :</strong>{" "}
                          {new Date(update.followUpDate).toLocaleDateString()}
                        </div>
                      )}
                      <div>
                        <strong>Updated At :</strong>{" "}
                        {new Date(update.updatedAt).toLocaleString()}
                      </div>
                      <div>
                        <strong>Note :</strong> {update.note}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No updates added yet.</p>
              )}
            </div>
          </div>
        ) : (
          <p>No appointment found.</p>
        )}

        {showAddForm && (
          <div
            className={styles.popupOverlay}
            onClick={() => setShowAddForm(false)}
          >
            <div
              className={styles.popupForm}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.closeButton}
                onClick={() => setShowAddForm(false)}
                type="button"
              >
                ×
              </button>

              <h3 className={styles.formHeading}>Appointment Activity Log</h3>
              <form onSubmit={handleUpdate}>
                <div className={styles.formGroup}>
                  <label>Appointment Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="" disabled>
                      -- Select Appointment Status --
                    </option>
                    <option value="Pending">Pending</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="No-show">No-show</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Appointment Type</label>
                  <select
                    value={appointmentType}
                    onChange={(e) => setAppointmentType(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      -- Select Appointment Type --
                    </option>
                    <option value="Site Visit">Site Visit</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Document Collection">
                      Document Collection
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Next Follow-up Date</label>
                  <input
                    type="date"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Internal Notes / Log</label>
                  <textarea
                    rows={5}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Describe client discussion, visit notes, pending docs, follow-up steps, etc."
                  />
                </div>

                <button type="submit" className={styles.submitButton}>
                  Save Activity Log
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffAppointLogDetails;
