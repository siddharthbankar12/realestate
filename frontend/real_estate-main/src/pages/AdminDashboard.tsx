import React, { useState, useEffect } from "react";
import styles from "./AdminDashboard.module.css"; // Assuming styles are defined here
import Nav from "../components/Nav";
import Modal from "../components/Modal";
import FirstNameField from "../components/FirstNameField";
import VerifyPropertiesForm from "../components/VerifyForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";

// Sample interfaces for demonstration
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
  // const [showModal, setShowModal] = useState(false);
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
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/appointments");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAppointments(data.appointments);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/property/verification"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProperties(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
    fetchProperties();
  }, []);

  const handleRemoveAppointment = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/appointments/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
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
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
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
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
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
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  // const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleDeleteReview = (id: string) => {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review._id !== id)
    );
  };
  return (
    <>
      <Navbar />
      <div>
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
            <button onClick={() => setShowModal(true)}>Add Admin</button>
          </div>
          <div className={styles.content}>
            {activeSection === "appointments" && (
              <div>
                {/* Content for appointments */}
                <div className={styles.profile}>
                  {loading ? (
                    <p>Loading appointments...</p>
                  ) : error ? (
                    <p>{error}</p>
                  ) : (
                    <div className={styles.dashboardLayout}>
                      <div className={styles.appointmentsAdmin}>
                        <div className={styles.heading}>
                          <b>Appointments</b>
                        </div>
                        {appointments.map((appointment) => (
                          <div
                            key={appointment._id}
                            className={styles.profileImage}
                          >
                            <div className={styles.profileImageChild} />
                            <div className={styles.profileImageHolderParent}>
                              <div className={styles.profileImageHolder}>
                                <img
                                  className={
                                    styles.istockphoto1476170969170667aIcon
                                  }
                                  loading="lazy"
                                  alt=""
                                  src="/userdefault.jpg"
                                />
                              </div>
                              <div className={styles.firstName}>
                                <FirstNameField
                                  firstName="First Name"
                                  firstNamePlaceholder={appointment.firstName}
                                />
                                <FirstNameField
                                  firstName="Phone No."
                                  firstNamePlaceholder={appointment.PhoneNumber.toString()}
                                  propMinWidth="106px"
                                />
                                <div></div>
                              </div>
                            </div>
                            <div className={styles.lastName}>
                              <FirstNameField
                                firstName="Last Name"
                                firstNamePlaceholder={appointment.lastName}
                                propMinWidth="110px"
                              />
                              <FirstNameField
                                firstName="Mail"
                                firstNamePlaceholder={appointment.email}
                                propMinWidth="43px"
                              />
                            </div>
                            <button
                              type="button"
                              className={`${styles.btn1} ${styles.accept}`}
                              onClick={() =>
                                handleRemoveAppointment(appointment._id)
                              }
                            >
                              Done
                            </button>
                          </div>
                        ))}
                      </div>
                      {/* <VerifyPropertiesForm
                        properties={properties}
                        onAccept={handleAcceptProperty}
                        onReject={handleRejectProperty}
                      /> */}
                    </div>
                  )}
                </div>
              </div>
            )}
            {activeSection === "propertyVerification" && (
              <VerifyPropertiesForm
                properties={properties}
                onAccept={handleAcceptProperty}
                onReject={handleRejectProperty}
              />
            )}
            {activeSection === "reviews" && (
              <div>
                {/* Content for reviews */}
                <div>
                  {reviews.map((review) => (
                    <div key={review._id} className={styles.reviewItem}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <h3>{review.reviewerName}</h3>
                        <div>1 day ago</div>
                      </div>
                      <div className={styles.reviewContent}>
                        {review.content}
                      </div>
                      {/* <span>Rating: {review.rating}</span> */}
                      {/* <button onClick={() => handleDeleteReview(review._id)}>
                        Delete Review
                      </button> */}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Modal show={showModal} handleClose={handleCloseModal} />
          <ToastContainer />
        </div>
        {/* <div className={styles.adminDashboard}>
        <section className={styles.content}>
          <div className={styles.profile}>
            {loading ? (
              <p>Loading appointments...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className={styles.dashboardLayout}>
                <div className={styles.appointmentsAdmin}>
                  <div className={styles.heading}>
                    <b>Appointments</b>
                  </div>
                  {appointments.map((appointment) => (
                    <div key={appointment._id} className={styles.profileImage}>
                      <div className={styles.profileImageChild} />
                      <div className={styles.profileImageHolderParent}>
                        <div className={styles.profileImageHolder}>
                          <img
                            className={styles.istockphoto1476170969170667aIcon}
                            loading="lazy"
                            alt=""
                            src="/userdefault.jpg"
                          />
                        </div>
                        <div className={styles.firstName}>
                          <FirstNameField
                            firstName="First Name"
                            firstNamePlaceholder={appointment.firstName}
                          />
                          <FirstNameField
                            firstName="Phone No."
                            firstNamePlaceholder={appointment.PhoneNumber.toString()}
                            propMinWidth="106px"
                          />
                          <div>
                            <button
                              type="button"
                              className={`${styles.btn1} ${styles.accept}`}
                              onClick={() =>
                                handleRemoveAppointment(appointment._id)
                              }
                            >
                              Done
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className={styles.lastName}>
                        <FirstNameField
                          firstName="Last Name"
                          firstNamePlaceholder={appointment.lastName}
                          propMinWidth="110px"
                        />
                        <FirstNameField
                          firstName="Mail"
                          firstNamePlaceholder={appointment.email}
                          propMinWidth="43px"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <VerifyPropertiesForm
                  properties={properties}
                  onAccept={handleAcceptProperty}
                  onReject={handleRejectProperty}
                />
              </div>
            )}
          </div>
        </section>
        <div className={styles.formButtons2}>
          <button
            type="submit"
            className={`${styles.btn} ${styles.accept}`}
            onClick={handleShowModal}
          >
            Add Admin
          </button>
          <Modal show={showModal} handleClose={handleCloseModal} />
          <ToastContainer />
          <button type="button" className={`${styles.btn} ${styles.reject}`}>Remove Admin</button>
        </div>
      </div> */}
      </div>
    </>
  );
};

export default AdminDashboard;
