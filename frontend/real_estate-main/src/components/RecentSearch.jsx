import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { FaClock } from "react-icons/fa";
import styles from "./RecentSearch.module.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const RecentSearch = () => {
  const recentSearchCities = useSelector(
    (state) => state.search.recentSearchCities
  );

  const token = localStorage.getItem("authToken");

  const sentSearchesRef = useRef(new Set());

  const getUserSearchHistory = async (search_text, userId) => {
    try {
      await axios.post("http://localhost:8000/api/user-update/search-history", {
        search_text,
        userId,
      });
    } catch (error) {
      console.log("Error saving search:", error);
    }
  };

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded?._id && recentSearchCities?.length > 0) {
        const uniqueCities = [
          ...new Set(recentSearchCities.map((c) => c.toLowerCase().trim())),
        ];
        uniqueCities.forEach((city) => {
          if (!sentSearchesRef.current.has(city)) {
            sentSearchesRef.current.add(city);
            getUserSearchHistory(city, decoded._id);
          }
        });
      }
    }
  }, [recentSearchCities]);

  return (
    <div className={styles.recentSearchWrapper}>
      <span className={styles.label}>Recent Searches :</span>

      {recentSearchCities && recentSearchCities.length > 0 ? (
        recentSearchCities.map((city, index) => (
          <div key={index} className={styles.searchChip}>
            <FaClock className={styles.icon} />
            <span>{city}</span>
          </div>
        ))
      ) : (
        <div className={styles.searchChip}>
          <FaClock className={styles.icon} /> No recent searches
        </div>
      )}
    </div>
  );
};

export default RecentSearch;
