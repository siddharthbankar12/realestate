import React, { useEffect, useState } from "react";
import { FunctionComponent } from "react";
import Sidebar from "../components/Sidebar";
import LottieAnimation from "../components/LottieAnimation";
import Navbar from "../components/Navbar";
import axios from "axios";
import styles from "./UserPastSearches.module.css";
import { jwtDecode } from "jwt-decode";

const UserPastSearches: FunctionComponent = () => {
  const [searches, setSearches] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchSearchHistory = async () => {
      if (token) {
        const decoded = jwtDecode(token);
        try {
          const response = await axios.get(
            `http://localhost:8000/api/user-update/${decoded._id}/past-searches`
          );
          setSearches(response.data);
        } catch (err) {
          setError("Failed to load search history");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchSearchHistory();
  }, [token]);

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <p>Loading your past search history...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <section className={styles.contentWrapper}>
        <Sidebar currentPage="user-past-searches0" />
        <div className={styles.tableWrapper}>
          {searches.length > 0 ? (
            <div className={styles.tableSection}>
              <h2 className={styles.pageTitle}>Your Past Searches</h2>
              <table className={styles.searchTable}>
                <thead>
                  <tr>
                    <th>Search Term</th>
                    <th>Search Date</th>
                    <th>Search Time</th>
                  </tr>
                </thead>
                <tbody>
                  {searches.map((search, index) => {
                    const searchDate = new Date(search.search_datetime);
                    const formattedDate = searchDate.toLocaleDateString();
                    const formattedTime = searchDate.toLocaleTimeString();

                    return (
                      <tr key={index}>
                        <td>{search.search_text}</td>
                        <td>{formattedDate}</td>
                        <td>{formattedTime}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className={styles.emptyState}>
              <LottieAnimation
                animationLink="https://lottie.host/a5254c19-e1f1-409d-95bd-c175ec072f09/lfnd0ChTqd.json"
                style={{ width: "300px", height: "auto" }}
              />
              <p className={styles.noSearchMessage}>
                You haven’t searched anything yet. Start exploring properties
                now!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default UserPastSearches;
