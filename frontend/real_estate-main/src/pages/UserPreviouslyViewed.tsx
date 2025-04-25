import { FunctionComponent } from "react";
import Sidebar from "../components/Sidebar";
import LottieAnimation from "../components/LottieAnimation";
import Navbar from "../components/Navbar";
import styles from "./UserPreviouslyViewed.module.css";

const UserPreviouslyViewed: FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <section className={styles.contentArea}>
        <Sidebar currentPage="user-previously-viewed0" />
        <div className={styles.emptySection}>
          <LottieAnimation
            animationLink="https://lottie.host/fc9fb0d0-1766-4e25-8483-ba9f9fa545f6/rNwcjg5a6Q.json"
            style={{ width: "300px", height: "auto" }}
          />
          <p className={styles.message}>You haven’t viewed anything yet</p>
          <p className={styles.message}>
            All the properties and projects that you have viewed will start
            appearing here. Search or explore cities now.
          </p>
        </div>
      </section>
    </div>
  );
};

export default UserPreviouslyViewed;
