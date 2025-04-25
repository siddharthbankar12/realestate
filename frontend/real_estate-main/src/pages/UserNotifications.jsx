import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import styles from "./UserNotifications.module.css";

const UserNotifications = () => {
  return (
    <div className={styles.userNotifications}>
      <Navbar />
      <main className={styles.sidebarParent}>
        <Sidebar
          currentPage="user-notifications0"
          sidebarMarginLeft="unset"
          profileSettingsColor="#000"
          profileSettingsFontWeight="unset"
          myPropertiesColor="#784dc6"
          myPropertiesFontWeight="bold"
        />
        <div className={styles.emptyStateWrapper}>
          <div className={styles.emptyState}>
            <div className={styles.imageWrapper}>
              <img
                className={styles.image}
                loading="lazy"
                alt="No notifications yet"
                src="/notificationImg.jpg"
              />
            </div>
            <div className={styles.messageTitle}>
              You haven’t received any notifications!
            </div>
            <div className={styles.messageSubtitle}>
              You will see your notifications here when we have something for
              you.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserNotifications;
