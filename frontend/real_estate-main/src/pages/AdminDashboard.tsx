import React, { useState, useEffect } from "react";
import styles from "./AdminDashboard.module.css";
import Navbar from "../components/Navbar";
import AdminAppointment from "../components/AdminAppointment";
import AdminPropertyVerification from "../components/AdminPropertyVerification";
import AdminReviews from "../components/AdminReviews";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AdminSideBar from "../components/AdminSideBar";
import AdminList from "../components/AdminList";

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
interface Admin {
  _id: string;
  adminId: string;
  buyersId?: { name: string; email: string }[];
  sellersId?: { name: string; email: string }[];
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("appointments");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [admins, setAdmins] = useState<Admin[]>([]);
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
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        console.log("Decoded token:", decoded);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsRes, propertiesRes, adminsRes] = await Promise.all([
          fetch("http://localhost:8000/api/appointments", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }),
          fetch("http://localhost:8000/api/property/verification"),
          fetch("http://localhost:8000/api/admin", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }),
        ]);

        if (!appointmentsRes.ok || !propertiesRes.ok || !adminsRes.ok) {
          throw new Error("Failed to fetch data.");
        }

        const appointmentsData = await appointmentsRes.json();
        const propertiesData = await propertiesRes.json();
        const adminsData = await adminsRes.json();

        if (appointmentsData.success)
          setAppointments(appointmentsData.appointments);
        if (propertiesData.success) setProperties(propertiesData);
        if (adminsData.success) setAdmins(adminsData.data);
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

  const handleLogout = () => {
    localStorage.removeItem("authToken");

    toast.success("Logged out successfully!");

    navigate("/admin-login");
  };

  const [showModal, setShowModal] = useState(false);
  const handleSectionChange = (section: string) => setActiveSection(section);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <>
      <Navbar />
      <div className={styles.adminDashboard}>
        <AdminSideBar
          activeSection={activeSection}
          handleSectionChange={handleSectionChange}
          handleShowModal={handleShowModal}
          handleLogout={handleLogout}
        />

        <div className={styles.content}>
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
          {activeSection === "reviews" && <AdminReviews reviews={reviews} />}
          {activeSection === "adminsList" && (
            <AdminList
              admins={admins}
              onAddAdminClick={handleShowModal}
              loading={loading}
              error={error}
            />
          )}
        </div>
        <Modal show={showModal} handleClose={handleCloseModal} />
      </div>
    </>
  );
};

export default AdminDashboard;
