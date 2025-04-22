import { FunctionComponent, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import styles from "./UserPastSearches.module.css";
import LottieAnimation from "../components/LottieAnimation";
import Navbar from "../components/Navbar";

const UserPastSearches: FunctionComponent = () => {
  return (
    <div className={styles.userPastSearches0}>
      <Navbar/>
      <section className={styles.homeNavigation}>
        <div className={styles.sidebar}>
          <Sidebar currentPage="user-past-searches0"
            sidebarMarginLeft="unset"
            profileSettingsColor="#000"
            profileSettingsFontWeight="unset"
            myPropertiesColor="#784dc6"
            myPropertiesFontWeight="bold"
          />
          <div className={styles.emptySearch}>
            <div className={styles.emptySearchContent}>
              <div className={styles.emptySearchIcon}>
              <LottieAnimation animationLink="https://lottie.host/a5254c19-e1f1-409d-95bd-c175ec072f09/lfnd0ChTqd.json" style={{ width: 500, height: 300 }} />
              </div>
              <div className={styles.emptySearchMessage}>
                <div className={styles.youHaventSearched}>
                  You haven’t searched anything yet
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserPastSearches;
