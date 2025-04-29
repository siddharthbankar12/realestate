import React from "react";
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
  return (
    <div className={styles.container}>
      {loading ? (
        <p>Loading appointments...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {appointments && appointments.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Full Name</th>

                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th>Guest / User</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>
                      {`${appointment.firstName || ""} ${
                        appointment.lastName || ""
                      }`.trim() || "N/A"}
                    </td>

                    <td>{appointment.email || "N/A"}</td>
                    <td>{appointment.phoneNumber || "N/A"}</td>
                    <td>{appointment.status || "N/A"}</td>
                    <td>{new Date(appointment.createdAt).toLocaleString()}</td>
                    <td>{new Date(appointment.updatedAt).toLocaleString()}</td>
                    <td>{appointment.isGuest ? "Guest" : "User"}</td>
                    <td>
                      <button
                        onClick={() => handleRemoveAppointment(appointment._id)}
                        className={styles.deleteBtn}
                        title="Delete Appointment"
                      >
                        <FaTrash />
                      </button>
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

export default AdminAppointment;
