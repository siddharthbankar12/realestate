import { FunctionComponent, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import LottieAnimation from "../components/LottieAnimation";
import Navbar from "../components/Navbar";
import styles from "./UserPreviouslyViewed.module.css";
import { jwtDecode } from "jwt-decode";

const UserPreviouslyViewed: FunctionComponent = () => {
  useEffect(() => {
    const fetchPreviouslyViewed = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return console.warn("No token found");

        const decoded: any = jwtDecode(token);
        const userId = decoded?._id;

        if (!userId) return console.warn("User ID not found in token");

        const res = await fetch(
          `http://localhost:8000/api/user-update/previous-view`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          }
        );

        const data = await res.json();
        console.log("Previously viewed properties:", data.previousView);
      } catch (error) {
        console.error("Failed to fetch previously viewed properties:", error);
      }
    };

    fetchPreviouslyViewed();
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <section className={styles.contentArea}>
        <Sidebar currentPage="user-previously-viewed" />
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
