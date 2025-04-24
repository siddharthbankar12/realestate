import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import LottieAnimation from "../components/LottieAnimation";
import styles from "./UserAppointments.module.css";

interface Appointment {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  PhoneNumber: number;
  userId?: string;
  createdAt?: string;
}

const UserAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const id = decoded._id || decoded.id;
        setUserId(id);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/api/appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const allAppointments = response.data.appointments;
        const userAppointments = allAppointments.filter(
          (appt: Appointment) => appt.userId === userId
        );

        setAppointments(userAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchAppointments();
    }
  }, [userId]);

  return (
    <div className={styles.container}>
      <Navbar />

      <section className={styles.sidebarParent}>
        <Sidebar currentPage="user-appointments0" />

        <main className={styles.mainContent}>
          {loading ? (
            <div className={styles.txt}>Loading appointments...</div>
          ) : appointments.length === 0 ? (
            <>
              <div className={styles.noAppointment}>
                <LottieAnimation
                  animationLink="https://lottie.host/2bc9990e-d2fb-4fd7-adf1-0a31c295f944/S3gYyygOxW.json"
                  style={{ width: 500, height: 300 }}
                />
              </div>
              <div className={styles.txt}>
                You haven’t booked any appointments yet!
              </div>
            </>
          ) : (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Date</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt) => (
                    <tr key={appt._id}>
                      <td>{`${appt.firstName} ${appt.lastName}`}</td>
                      <td>{appt.email}</td>
                      <td>{appt.PhoneNumber}</td>
                      <td>
                        {appt.createdAt &&
                          new Date(appt.createdAt).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                      </td>
                      <td>
                        {appt.createdAt &&
                          new Date(appt.createdAt).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </section>
    </div>
  );
};

export default UserAppointments;
