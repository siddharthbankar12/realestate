import React, { useState, useEffect } from "react";
import styles from "./AdminDashboard.module.css";
import Nav from "../components/Nav";
import Modal from "../components/Modal";
import FirstNameField from "../components/FirstNameField";
import VerifyPropertiesForm from "../components/VerifyForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";

interface Appointment {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  PhoneNumber: number;
}

interface Property {
  _id: string;
  firstName: string;
  phoneNumber: string;
  email: string;
}

interface Review {
  _id: string;
  reviewerName: string;
  content: string;
  rating: number;
}

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("appointments");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([
    {
      _id: "1",
      reviewerName: "John Doe",
      content: "Excellent service.",
      rating: 5,
    },
    {
      _id: "2",
      reviewerName: "Jane Smith",
      content: "Could be better.",
      rating: 3,
    },
    {
      _id: "3",
      reviewerName: "Alice Johnson",
      content: "Very helpful.",
      rating: 4,
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsRes, propertiesRes] = await Promise.all([
          fetch("http://localhost:8000/api/appointments", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }),
          fetch("http://localhost:8000/api/property/verification"),
        ]);

        if (!appointmentsRes.ok || !propertiesRes.ok) {
          throw new Error("Failed to fetch data.");
        }

        const appointmentsData = await appointmentsRes.json();
        const propertiesData = await propertiesRes.json();

        if (appointmentsData.success)
          setAppointments(appointmentsData.appointments);
        if (propertiesData.success) setProperties(propertiesData);
      } catch (err) {
        toast.error("Failed to fetch data. Please try again.");
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRemoveAppointment = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/appointments/${id}`,
        { method: "DELETE" }
      );
      const result = await response.json();
      if (!result.success || !response.ok) {
        alert("Deleting failed, please try later");
        return;
      }
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment._id !== id)
      );
      alert("Deleting successful");
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handleAcceptProperty = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/property/${id}/accept`,
        { method: "PUT" }
      );
      const result = await response.json();
      if (!result.success || !response.ok) {
        alert("Accepting property failed, please try later");
        return;
      }
      setProperties((prevProperties) =>
        prevProperties.filter((property) => property._id !== id)
      );
      alert("Property accepted");
    } catch (error) {
      console.error("Error accepting property:", error);
    }
  };

  const handleRejectProperty = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/property/${id}/reject`,
        { method: "PUT" }
      );
      const result = await response.json();
      if (!result.success || !response.ok) {
        alert("Rejecting property failed, please try later");
        return;
      }
      setProperties((prevProperties) =>
        prevProperties.filter((property) => property._id !== id)
      );
      alert("Property rejected");
    } catch (error) {
      console.error("Error rejecting property:", error);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const handleSectionChange = (section: string) => setActiveSection(section);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <>
      <Navbar />
      <div className={styles.adminDashboard}>
        <div className={styles.sidebar}>
          <div
            className={styles.sidebarText}
            onClick={() => handleSectionChange("appointments")}
          >
            Appointments
          </div>
          <div
            className={styles.sidebarText}
            onClick={() => handleSectionChange("propertyVerification")}
          >
            Property Verification
          </div>
          <div
            className={styles.sidebarText}
            onClick={() => handleSectionChange("reviews")}
          >
            Reviews
          </div>
          <button onClick={handleShowModal}>Add Admin</button>
        </div>
        <div className={styles.content}>
          {activeSection === "appointments" && (
            <div>
              {loading ? (
                <p>Loading appointments...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <div>
                  <div className={styles.heading}>Appointments</div>
                  {appointments && appointments.length > 0 ? (
                    appointments.map((appointment) => (
                      <div key={appointment._id}>
                        <FirstNameField
                          firstName="First Name"
                          firstNamePlaceholder={appointment.firstName || "N/A"}
                        />
                        <FirstNameField
                          firstName="Phone No."
                          firstNamePlaceholder={
                            appointment.phoneNumber || "N/A"
                          }
                        />
                        <button
                          onClick={() =>
                            handleRemoveAppointment(appointment._id)
                          }
                        >
                          Done
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>No appointments available.</p>
                  )}
                </div>
              )}
            </div>
          )}
          {activeSection === "propertyVerification" && (
            <div>
              {loading ? (
                <p>Loading properties...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <VerifyPropertiesForm
                  properties={properties}
                  onAccept={handleAcceptProperty}
                  onReject={handleRejectProperty}
                />
              )}
            </div>
          )}
          {activeSection === "reviews" && (
            <div>
              {reviews.map((review) => (
                <div key={review._id}>
                  <h3>{review.reviewerName}</h3>
                  <p>{review.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <Modal show={showModal} handleClose={handleCloseModal} />
        <ToastContainer />
      </div>
    </>
  );
};

export default AdminDashboard;
