import React from "react";
import { useSelector } from "react-redux";
import { FaClock } from "react-icons/fa";
import styles from "./RecentSearch.module.css";

const RecentSearch = () => {
  const recentSearchCities = useSelector(
    (state) => state.search.recentSearchCities
  );

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
