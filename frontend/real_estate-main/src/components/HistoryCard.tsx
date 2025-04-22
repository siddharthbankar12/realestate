// Import necessary libraries
import React from "react";
import styles from "./HistoryCard.module.css"

// Functional component definition
const HistoryCard: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.pic_name}>
        <div className={styles.pic}>K</div>
        <div className={styles.name}>
          K SREEKRUTHI
          <span className={styles.role}>Owner</span>
        </div>
      </div>
      <p className={styles.head}>Your recent activity</p>
      <button className={styles.act_btn}>
        <div className={styles.btn_txt}>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            1<img src="diagonal-right-up-arrow.png" alt="" className={styles.ico} />
          </div>
          <span> Viewed </span>
        </div>
      </button>
      <button className= {styles.activity}>View all activity</button>
    </div>
  );
};

// Export the component
export default HistoryCard;
