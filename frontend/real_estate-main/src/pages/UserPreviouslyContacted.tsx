import { FunctionComponent } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import styles from "./UserPreviouslyContacted.module.css";

const UserPreviouslyContacted: FunctionComponent = () => {
  return (
    <div className={styles.userPreviouslyContacted0}>
      <Navbar />
      <main className={styles.sidebarParent}>
        <Sidebar
          currentPage="user-previously-contacted0"
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
                alt="Empty Contacted State"
                src="/image-6@2x.png"
              />
            </div>
            <div className={styles.messageTitle}>
              You haven’t contacted anyone lately!
            </div>
            <div className={styles.messageSubtitle}>
              You will see the list of properties / projects here, where you
              have contacted the advertiser.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserPreviouslyContacted;
