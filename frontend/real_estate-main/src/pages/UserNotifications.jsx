import React from "react";
import Sidebar from "../components/Sidebar";
import styles from "./UserNotifications.module.css";
import Navbar from "../components/Navbar";

const UserNotifications = () => {
  return (
    <div className={styles.userPreviouslynotificationed0}>
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
        <div className={styles.notificationImage}>
          <div className={styles.content}>
            <div className={styles.emptyState}>
              <img
                className={styles.image6Icon}
                loading="lazy"
                alt=""
                src="/notificationImg.jpg"
              />
            </div>
            <div className={styles.noNotification}>
              <div className={styles.notYetNotification}>
                You haven’t received any notifications!
              </div>
            </div>
            <div className={styles.youWillSee}>
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
