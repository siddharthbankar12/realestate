import React, { useState, useEffect } from "react";
import styles from "./AdminDashboard.module.css";
import Navbar from "../components/Navbar";
import AdminAppointment from "../components/AdminAppointment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AdminPropertyVerification from "../components/AdminPropertyVerification";
import AdminReviews from "../components/AdminReviews";
import AdminSideBar from "../components/AdminSideBar";
import AdminList from "../components/AdminList";
import AdminProfile from "../components/AdminProfile";
import AdminDashUserDetails from "../components/AdminDashUserDetails";
import StaffManagement from "../components/StaffManagement";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("appointments");
  const [appointments, setAppointments] = useState<any[]>([]);
  const [adminProfile, setAdminProfile] = useState<any>(null);
  const [properties, setProperties] = useState<any[]>([]);
  const [admins, setAdmins] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedSection =
      localStorage.getItem("activeSection") || "adminProfile";
    setActiveSection(savedSection);

    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setAdminProfile(decoded);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  console.log(adminProfile);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsRes, propertiesRes, reviewsRes, adminsRes] =
          await Promise.all([
            fetch("http://localhost:8000/api/appointments", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            }),
            fetch("http://localhost:8000/api/property/verification"),
            fetch("http://localhost:8000/api/reviews/get-all-reviews"),
            fetch("http://localhost:8000/api/admin", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            }),
          ]);

        if (
          !appointmentsRes.ok ||
          !propertiesRes.ok ||
          !reviewsRes.ok ||
          !adminsRes.ok
        ) {
          throw new Error("Failed to fetch data.");
        }

        const appointmentsData = await appointmentsRes.json();
        const propertiesData = await propertiesRes.json();
        const reviewsData = await reviewsRes.json();
        const adminsData = await adminsRes.json();

        console.log(propertiesData);

        if (appointmentsData.success) {
          setAppointments(appointmentsData.appointments);
        }
        if (propertiesData.success) {
          setProperties(propertiesData.property_verify);
        }
        if (adminsData.success) {
          setAdmins(adminsData.data);
        }

        if (reviewsData.success) {
          setReviews(reviewsData.reviews);
        }
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
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authorization token found");
      }

      const response = await fetch(
        `http://localhost:8000/api/appointments/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete the appointment");
      }

      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment._id !== id)
      );

      toast.success("Appointment deleted successfully!");
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message || "Something went wrong while deleting.");
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
      toast.success("Property accepted successfully");
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
      toast.success("Property rejected successfully");
    } catch (error) {
      console.error("Error rejecting property:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("activeSection");

    toast.success("Logged out successfully!");

    navigate("/admin-login");
  };

  const handleRemoveAdmin = async (adminId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/admin/${adminId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      const text = await response.text(); // read raw text
      const result = text ? JSON.parse(text) : { success: response.ok };

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete admin");
      }

      setAdmins((prevAdmins) =>
        prevAdmins.filter((admin) => admin._id !== adminId)
      );

      toast.success("Admin deleted successfully!");
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message || "Something went wrong while deleting.");
    }
  };

  const [showModal, setShowModal] = useState(false);
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    localStorage.setItem("activeSection", section);
  };
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <div style={{ backgroundColor: "#f5f7fa" }}>
      <div style={{ padding: "20px 0" }}>
        <Navbar />
        <div className={styles.adminDashboard}>
          <AdminSideBar
            activeSection={activeSection}
            handleSectionChange={handleSectionChange}
            handleShowModal={handleShowModal}
            handleLogout={handleLogout}
          />

          <div className={styles.content}>
            {activeSection === "adminProfile" && adminProfile && (
              <AdminProfile adminProfile={adminProfile} />
            )}
            {activeSection === "adminDashUserDetails" && (
              <AdminDashUserDetails adminProfile={adminProfile} />
            )}
            {activeSection === "appointments" && (
              <AdminAppointment
                appointments={appointments}
                loading={loading}
                error={error}
                handleRemoveAppointment={handleRemoveAppointment}
              />
            )}
            {activeSection === "propertyVerification" && (
              <AdminPropertyVerification
                properties={properties}
                loading={loading}
                error={error}
                handleAcceptProperty={handleAcceptProperty}
                handleRejectProperty={handleRejectProperty}
              />
            )}
            {activeSection === "reviews" && (
              <AdminReviews
                reviews={reviews || []}
                adminId={adminProfile?.adminId}
              />
            )}
            {activeSection === "adminsList" && (
              <AdminList
                admins={admins || []}
                onAddAdminClick={handleShowModal}
                handleRemoveAdmin={handleRemoveAdmin}
                loading={loading}
                error={error}
              />
            )}
            {activeSection === "staffManagement" && <StaffManagement />}
          </div>
          <Modal show={showModal} handleClose={handleCloseModal} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
