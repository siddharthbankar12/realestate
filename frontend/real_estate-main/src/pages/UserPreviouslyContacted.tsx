import { FunctionComponent, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import styles from "./UserPreviouslyContacted.module.css";
import Navbar from "../components/Navbar";

const UserPreviouslyContacted: FunctionComponent = () => {
  return (
    <div className={styles.userPreviouslyContacted0}>
      <Navbar/>
      <main className={styles.sidebarParent}>
        <Sidebar currentPage="user-previously-contacted0"
            sidebarMarginLeft="unset"
            profileSettingsColor="#000"
            profileSettingsFontWeight="unset"
            myPropertiesColor="#784dc6"
            myPropertiesFontWeight="bold"
          />
        <div className={styles.contactImage}>
          <div className={styles.content}>
            <div className={styles.emptyState}>
              <img
                className={styles.image6Icon}
                loading="lazy"
                alt=""
                src="/image-6@2x.png"
              />
            </div>
            <div className={styles.noContactsMessage}>
              <div className={styles.youHaventContacted}>
                You haven’t contacted anyone lately!
              </div>
            </div>
            <div className={styles.youWillSee}>
              You will see the list of properties / projects here, where you
              have contacted the advertiser
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserPreviouslyContacted;
