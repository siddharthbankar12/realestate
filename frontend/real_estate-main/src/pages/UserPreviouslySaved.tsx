import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import LottieAnimation from "../components/LottieAnimation";
import styles from "./UserPreviouslySaved.module.css";

const UserPreviouslySaved: FunctionComponent = () => {
  const navigate = useNavigate();

  const onHomeContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className={styles.userPreviouslySaved0}>
      <Navbar />
      <main className={styles.sidebarParent}>
        <Sidebar
          currentPage="user-previously-saved0"
          sidebarMarginLeft="unset"
          profileSettingsColor="#000"
          profileSettingsFontWeight="unset"
          myPropertiesColor="#784dc6"
          myPropertiesFontWeight="bold"
        />
        <div className={styles.emptyStateWrapper}>
          <div className={styles.emptyState}>
            <div className={styles.animationWrapper}>
              <LottieAnimation
                animationLink="https://lottie.host/69e157cb-db54-4f03-b411-e105a2b76125/2bWLBAXZpM.json"
                style={{ width: 400, height: 280 }}
              />
            </div>
            <div className={styles.emptyMessage}>
              <div className={styles.title}>
                You haven’t saved any property lately!
              </div>
            </div>
            <div className={styles.subtitle}>
              All the properties and projects that you have saved will start
              appearing here. Search or explore cities now.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserPreviouslySaved;
