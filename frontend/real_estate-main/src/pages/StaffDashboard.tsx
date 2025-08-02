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
import StaffSalesTargetManagement from "./StaffSalesTargetManagement";

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
  const [employees, setEmployees] = useState<any[]>([]);
  const [salesTargets, setSalesTargets] = useState<any[]>([]);

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
    { key: "sales-target-management", label: "Sales and Target Management" },
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
      const baseURL = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(
        `${baseURL}/api/staff/users-details`,
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

  const fetchSalesData = async () => {
    try {
      const baseURL = import.meta.env.VITE_BACKEND_URL;
      const [employeesRes, salesTargetsRes] = await Promise.all([
        fetch(`${baseURL}/api/staff/employees`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }),
        fetch(`${baseURL}/api/staff/sales-targets`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }),
      ]);

      if (employeesRes.ok) {
        const employeesData = await employeesRes.json();
        if (employeesData.success) {
          setEmployees(employeesData.employees);
        }
      }

      if (salesTargetsRes.ok) {
        const salesTargetsData = await salesTargetsRes.json();
        if (salesTargetsData.success) {
          setSalesTargets(salesTargetsData.salesTargets);
        }
      }
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  const handleCreateTarget = async (targetData: any) => {
    try {
      const baseURL = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(
        `${baseURL}/api/staff/sales-targets`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(targetData),
        }
      );

      const result = await response.json();
      if (result.success) {
        setSalesTargets([...salesTargets, result.salesTarget]);
        return Promise.resolve();
      } else {
        return Promise.reject(new Error(result.error));
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleUpdateTarget = async (targetId: string, updateData: any) => {
    try {
      const baseURL = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(
        `${baseURL}/api/staff/sales-targets/${targetId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(updateData),
        }
      );

      const result = await response.json();
      if (result.success) {
        setSalesTargets(
          salesTargets.map((target) =>
            target._id === targetId ? result.salesTarget : target
          )
        );
        return Promise.resolve();
      } else {
        return Promise.reject(new Error(result.error));
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const fetchData = async () => {
    try {
      const baseURL = import.meta.env.VITE_BACKEND_URL;
      const [appointmentsRes, propertiesRes, titleSearchRes, prePurchaseRes] =
        await Promise.all([
          fetch(`${baseURL}/api/appointments`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }),
          fetch(`${baseURL}/api/property/verification`),
          fetch(`${baseURL}/api/title-search/list`),
          fetch(
            `${baseURL}/api/Pre-Purchase-Property-Verification/list`
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
      const baseURL = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(
        `${baseURL}/api/staff/property/${id}/accept/${staffId}`,
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
      const baseURL = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(
        `${baseURL}/api/staff/appointment/cancelled/${appointmentId}`,
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
      const baseURL = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(
        `${baseURL}/api/staff/appointment/accept/${id}`,
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
      case "sales-target-management":
        return (
          <StaffSalesTargetManagement
          // employees={employees}
          // salesTargets={salesTargets}
          // onCreateTarget={handleCreateTarget}
          // onUpdateTarget={handleUpdateTarget}
          />
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
    fetchSalesData();
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
