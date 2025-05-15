import React, { useEffect, useState } from "react";
import styles from "./StaffDashboard.module.css";
import Navbar from "../components/Navbar";
import StaffProfile from "./StaffProfile";
import SidebarStaff from "../components/SidebarStaff";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import StaffManagedAppointments from "./StaffManagedAppointments";
import StaffVerifyProperties from "./StaffVerifyProperties";
import { toast } from "react-toastify";

const StaffDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("profile");
  const [staffData, setStaffData] = useState(null);
  const navigate = useNavigate();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const menuOptions = [
    { key: "profile", label: "Staff Profile" },
    { key: "appointments", label: "Manage Appointments" },
    { key: "properties", label: "Verify Properties" },
    { key: "logout", label: "Logout" },
  ];

  const fetchStaffData = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("Token not found.");
      navigate("/staff-login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setStaffData(decoded);
      console.log(decoded);
    } catch (err) {
      console.error("Invalid token.");
      localStorage.removeItem("authToken");
      navigate("/staff-login");
    }
  };

  const handleAcceptProperty = async (id: string) => {
    let staffId = staffData._id;
    try {
      const response = await fetch(
        `http://localhost:8000/api/staff/property/${id}/accept/${staffId}`,
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

  useEffect(() => {
    fetchStaffData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/staff-login");
  };

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

        console.log(propertiesData);

        if (propertiesData?.success)
          setProperties(propertiesData.property_verify);
      } catch (err) {
        toast.error("Failed to fetch data. Please try again.");
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderContent = () => {
    switch (selectedOption) {
      case "profile":
        return <StaffProfile staff={staffData} updateToken={fetchStaffData} />;
      case "appointments":
        return <StaffManagedAppointments />;
      case "properties":
        return (
          <StaffVerifyProperties
            loading={loading}
            error={error}
            properties={properties}
            handleAcceptProperty={handleAcceptProperty}
          />
        );
      case "logout":
        handleLogout();
        return null;
      default:
        return <div>Select an option</div>;
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.dashboardLayout}>
        <SidebarStaff
          onSelect={setSelectedOption}
          selectedOption={selectedOption}
          menuOptions={menuOptions}
        />
        <div className={styles.contentStaffDash}>{renderContent()}</div>
      </div>
    </div>
  );
};

export default StaffDashboard;
