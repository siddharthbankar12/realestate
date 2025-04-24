import React, {
  FunctionComponent,
  useMemo,
  CSSProperties,
  useCallback,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";

export type SidebarType = {
  className?: string;
  sidebarMarginLeft?: CSSProperties["marginLeft"];
  profileSettingsColor?: CSSProperties["color"];
  profileSettingsFontWeight?: CSSProperties["fontWeight"];
  myPropertiesColor?: CSSProperties["color"];
  myPropertiesFontWeight?: CSSProperties["fontWeight"];
  onHomeIconClick?: () => void;
  onLOGOTextClick?: () => void;
  currentPage: string;
};

const Sidebar: FunctionComponent<SidebarType> = ({
  className = "",
  sidebarMarginLeft,
  onLOGOTextClick,
  currentPage,
}) => {
  const navigate = useNavigate();
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  const sidebar1Style: CSSProperties = useMemo(() => {
    return {
      marginLeft: sidebarMarginLeft,
    };
  }, [sidebarMarginLeft]);

  const getCurrentPageClass = (page: string) => {
    return currentPage === page ? styles.currPage : styles.notCurrPage;
  };

  const onProfileSettingTextClick = useCallback(() => {
    navigate("/user-profile");
  }, [navigate]);

  const onMyPropertiesTextClick = useCallback(() => {
    navigate("/user-properties0");
  }, [navigate]);

  const onAppointmentsTextClick0 = useCallback(() => {
    navigate("/user-appointments");
  }, [navigate]);

  const onPastSearchesTextClick = useCallback(() => {
    navigate("/user-past-searches0");
  }, [navigate]);

  const onPreviouslyViewedTextClick = useCallback(() => {
    navigate("/user-previously-viewed0");
  }, [navigate]);

  const onSavedTextClick = useCallback(() => {
    navigate("/user-previously-saved0");
  }, [navigate]);

  const onContactedTextClick = useCallback(() => {
    navigate("/user-previously-contacted0");
  }, [navigate]);

  const onNotificationTextClick = useCallback(() => {
    navigate("/user-notifications0");
  }, [navigate]);

  const onLogOutClick = useCallback(() => {
    setShowLogoutConfirmation(true);
  }, []);

  const handleLogoutConfirm = useCallback(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userProfile");
    setShowLogoutConfirmation(false);
    navigate("/");
  }, [navigate]);

  const handleLogoutCancel = useCallback(() => {
    setShowLogoutConfirmation(false);
  }, []);

  return (
    <div
      className={[styles.sidebar, className].join(" ")}
      style={sidebar1Style}
    >
      <div
        className={getCurrentPageClass("profile-settings")}
        onClick={onProfileSettingTextClick}
      >
        Profile settings
      </div>
      <div
        className={getCurrentPageClass("user-appointments0")}
        onClick={onAppointmentsTextClick0}
      >
        Appointments
      </div>
      <div
        className={getCurrentPageClass("user-properties0")}
        onClick={onMyPropertiesTextClick}
      >
        My properties
      </div>
      <div
        className={getCurrentPageClass("user-past-searches0")}
        onClick={onPastSearchesTextClick}
      >
        Past searches
      </div>
      <div
        className={getCurrentPageClass("user-previously-viewed0")}
        onClick={onPreviouslyViewedTextClick}
      >
        Previously viewed
      </div>
      <div
        className={getCurrentPageClass("user-previously-saved0")}
        onClick={onSavedTextClick}
      >
        Saved
      </div>
      <div
        className={getCurrentPageClass("user-previously-contacted0")}
        onClick={onContactedTextClick}
      >
        Contacted
      </div>
      <div
        className={getCurrentPageClass("user-notifications0")}
        onClick={onNotificationTextClick}
      >
        Notifications
      </div>
      <div className={styles.notCurrPage} onClick={onLogOutClick}>
        Log out
      </div>

      {/* Logout confirmation popup */}
      {showLogoutConfirmation && (
        <div className={styles.logoutPopup}>
          <div className={styles.logoutMessage}>
            Are you sure you want to log out?
          </div>
          <div className={styles.logoutButtons}>
            <button
              className={styles.logoutButton}
              onClick={handleLogoutConfirm}
            >
              Yes
            </button>
            <button
              className={styles.cancelButton}
              onClick={handleLogoutCancel}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
