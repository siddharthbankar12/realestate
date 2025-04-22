import { FunctionComponent, useCallback } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FrameComponent from "../components/FrameComponent4";
import styles from "./UserPreviouslySaved.module.css";

const UserPreviouslySaved: FunctionComponent = () => {
  return (
    <div className={styles.userPreviouslySaved0}>
      <Navbar/>
      <main className={styles.sidebarParent}>
        <Sidebar currentPage="user-previously-saved0"
          sidebarMarginLeft="unset"
          profileSettingsColor="#000"
          profileSettingsFontWeight="unset"
          myPropertiesColor="#784dc6"
          myPropertiesFontWeight="bold"
          
        />
        <FrameComponent />
      </main>
    </div>
  );
};

export default UserPreviouslySaved;
