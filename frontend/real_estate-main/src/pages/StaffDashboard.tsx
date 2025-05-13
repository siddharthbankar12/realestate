import React, { useEffect, useState } from "react";
import styles from "./StaffDashboard.module.css";
import Navbar from "../components/Navbar";
import StaffProfile from "./StaffProfile";
import SidebarStaff from "../components/SidebarStaff";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const StaffDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("profile");
  const [staffData, setStaffData] = useState(null);
  const navigate = useNavigate();

  const menuOptions = [
    { key: "profile", label: "Staff Profile" },
    { key: "appointments", label: "Manage Appointments" },
    { key: "properties", label: "Verified Properties" },
    { key: "calls", label: "Call Logs" },
    { key: "settings", label: "Settings" },
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

  useEffect(() => {
    fetchStaffData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/staff-login");
  };

  // console.log(staffData);

  const renderContent = () => {
    switch (selectedOption) {
      case "profile":
        return <StaffProfile staff={staffData} updateToken={fetchStaffData} />;
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
