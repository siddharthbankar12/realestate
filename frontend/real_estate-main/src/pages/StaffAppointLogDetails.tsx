import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import styles from "./StaffAppointLogDetails.module.css";

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
  log?: string;
  userId?: User;
  staffId?: Staff;
}

const StaffAppointLogDetails: React.FC = () => {
  const navigate = useNavigate();
  const { appointmentId } = useParams();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [logInput, setLogInput] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/staff/get-appointment/${appointmentId}/details`
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setAppointment(data.appointmentDetails);
        setLogInput(data.appointmentDetails.log || "");
        setStatus(data.appointmentDetails.status || "");
      } catch (err) {
        setError("Unable to fetch appointment details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [appointmentId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/api/staff/update-appointment/${appointmentId}`,
        {
          log: logInput,
          status,
        }
      );
      alert("Appointment updated successfully!");
    } catch (err) {
      alert("Failed to update appointment.");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.headerRow}>
          <button
            onClick={() => {
              navigate("/staff-dashboard");
            }}
            className={styles.backButton}
          >
            Back
          </button>
        </div>
        <h2 className={styles.heading}>Appointment Log Details</h2>

        {loading ? (
          <p className={styles.loading}>Loading...</p>
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : appointment ? (
          <div className={styles.flexLayout}>
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
              <h3 className={styles.formHeading}>Appointment Activity Log</h3>
              <form onSubmit={handleUpdate}>
                <div className={styles.formGroup}>
                  <label>Appointment Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
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
                  <select>
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
                  <input type="date" />
                </div>

                <div className={styles.formGroup}>
                  <label>Internal Notes / Log</label>
                  <textarea
                    rows={5}
                    value={logInput}
                    onChange={(e) => setLogInput(e.target.value)}
                    placeholder="Describe client discussion, visit notes, pending docs, follow-up steps, etc."
                  />
                </div>

                <button type="submit" className={styles.submitButton}>
                  Save Activity Log
                </button>
              </form>
            </div>
          </div>
        ) : (
          <p>No appointment found.</p>
        )}
      </div>
    </div>
  );
};

export default StaffAppointLogDetails;
