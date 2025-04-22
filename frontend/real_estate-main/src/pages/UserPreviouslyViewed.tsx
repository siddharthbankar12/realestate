import { FunctionComponent } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FrameComponent1 from "../components/FrameComponent11";
import styles from "./UserPreviouslyViewed.module.css";

const UserPreviouslyViewed: FunctionComponent = () => {
  return (
    <div className={styles.userPreviouslyViewed0}>
      <Navbar />
      <main className={styles.sidebarParent}>
        <Sidebar currentPage="user-previously-viewed0"
        sidebarMarginLeft="unset"
        profileSettingsColor="#000"
        profileSettingsFontWeight="unset"
        myPropertiesColor="#784dc6"
        myPropertiesFontWeight="bold"
        />
        <div className={styles.frameWrapper}>
          <FrameComponent1 />
        </div>
      </main>
    </div>
  );
};

export default UserPreviouslyViewed;
