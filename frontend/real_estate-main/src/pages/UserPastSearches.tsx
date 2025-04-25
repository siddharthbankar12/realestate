import { FunctionComponent } from "react";
import Sidebar from "../components/Sidebar";
import LottieAnimation from "../components/LottieAnimation";
import Navbar from "../components/Navbar";
import styles from "./UserPastSearches.module.css";

const UserPastSearches: FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <section className={styles.contentArea}>
        <Sidebar currentPage="user-past-searches0" />
        <div className={styles.emptySection}>
          <LottieAnimation
            animationLink="https://lottie.host/a5254c19-e1f1-409d-95bd-c175ec072f09/lfnd0ChTqd.json"
            style={{ width: "300px", height: "auto" }}
          />
          <p className={styles.message}>You haven’t searched anything yet</p>
        </div>
      </section>
    </div>
  );
};

export default UserPastSearches;
