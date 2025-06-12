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
import StaffManagedUsers from "./StaffManagedUsers";
import StaffAppointLogDetails from "./StaffAppointLogDetails";
import StaffTitleSearch from "./StaffTitleSearch";
import StaffPrePurchaseProVer from "./StaffPrePurchaseProVer";

const StaffDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("profile");
  const [staffData, setStaffData] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [titleSearchRequest, SetTitleSearchRequest] = useState<any[]>([]);
  const [prePurchaseRequest, SetPrePurchaseRequest] = useState<any[]>([]);

  const menuOptions = [
    { key: "profile", label: "Staff Profile" },
    { key: "usersDetails", label: "Users Details" },
    { key: "appointments", label: "Manage Appointments" },
    { key: "properties", label: "Verify Properties" },
    { key: "title-search", label: "Title Search Request" },
    {
      key: "pre-purchase-property-verification",
      label: "Pre Purchase Property Request",
    },
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

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/staff/users-details",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setUserData(data.usersData);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const [appointmentsRes, propertiesRes, titleSearchRes, prePurchaseRes] =
        await Promise.all([
          fetch("http://localhost:8000/api/appointments", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }),
          fetch("http://localhost:8000/api/property/verification"),
          fetch("http://localhost:8000/api/title-search/list"),
          fetch(
            "http://localhost:8000/api/Pre-Purchase-Property-Verification/list"
          ),
        ]);

      if (!appointmentsRes.ok || !propertiesRes.ok) {
        throw new Error("Failed to fetch data.");
      }

      const appointmentsData = await appointmentsRes.json();
      const propertiesData = await propertiesRes.json();
      const titleSearchData = await titleSearchRes.json();
      const prePurchaseData = await prePurchaseRes.json();

      console.log(propertiesData);

      if (appointmentsData.success)
        setAppointments(appointmentsData.appointments);
      if (propertiesData?.success)
        setProperties(propertiesData.property_verify);
      if (titleSearchData?.success)
        SetTitleSearchRequest(titleSearchData.allRequests);
      if (prePurchaseData?.success)
        SetPrePurchaseRequest(prePurchaseData.allRequests);
    } catch (err) {
      toast.error("Failed to fetch data. Please try again.");
      setError((err as Error).message);
    } finally {
      setLoading(false);
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

  const handleCancelAppointment = async (appointmentId: string) => {
    const staffId = staffData?._id;
    try {
      const response = await fetch(
        `http://localhost:8000/api/staff/appointment/cancelled/${appointmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ staffId }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        toast.error(result.error || "Failed to cancel appointment");
        return;
      }

      setAppointments((prev) =>
        prev.map((a) =>
          a._id === appointmentId ? { ...a, status: "Cancelled" } : a
        )
      );
      fetchData();
      toast.success("Appointment cancelled successfully");
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleAcceptAppointment = async (id: string) => {
    const staffId = staffData?._id;
    try {
      const response = await fetch(
        `http://localhost:8000/api/staff/appointment/accept/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ staffId }),
        }
      );

      const result = await response.json();
      if (!response.ok || !result.success) {
        toast.error(result.error || "Failed to accept appointment");
        return;
      }

      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: "Accepted" } : a))
      );
      fetchData();
      toast.success("Appointment accepted successfully");
    } catch (error) {
      console.error("Error accepting appointment:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/staff-login");
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "profile":
        return <StaffProfile staff={staffData} updateToken={fetchStaffData} />;
      case "usersDetails":
        return <StaffManagedUsers userDetails={userData} />;
      case "appointments":
        return (
          <StaffManagedAppointments
            staffId={staffData.staffId}
            appointments={appointments}
            loading={loading}
            error={error}
            handleCancelAppointment={handleCancelAppointment}
            handleAcceptAppointment={handleAcceptAppointment}
          />
        );
      case "properties":
        return (
          <StaffVerifyProperties
            loading={loading}
            error={error}
            properties={properties}
            handleAcceptProperty={handleAcceptProperty}
          />
        );
      case "title-search":
        return <StaffTitleSearch titleSearchRequest={titleSearchRequest} />;

      case "pre-purchase-property-verification":
        return (
          <StaffPrePurchaseProVer prePurchaseRequest={prePurchaseRequest} />
        );

      case "logout":
        handleLogout();
        return null;
      default:
        return <div>Select an option</div>;
    }
  };

  useEffect(() => {
    fetchStaffData();
    fetchUserDetails();
    fetchData();
  }, [navigate]);

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
