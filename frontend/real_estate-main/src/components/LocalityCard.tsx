import React from "react";
import styles from "./LocalityCard.module.css";

interface LocalityCardProps {
  name: string;
  rating: number;
  projects: number;
  imageUrl: string;
}

const LocalityCard: React.FC<LocalityCardProps> = ({
  name,
  rating,
  projects,
  imageUrl,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <img src={imageUrl} alt={name} className={styles.profilePic} />
        <div className={styles.info}>
          <div className={styles.titleRow}>
            <span className={styles.title}>{name}</span>
            <span className={styles.rating}>
              {rating} <span className={styles.star}>★</span>
            </span>
          </div>
          <span className={styles.subtitle}>{projects} New Projects</span>
        </div>
      </div>
      <div className={styles.cardFooter}>
        <span className={styles.link}>Insights</span>
        <span className={styles.divider}></span>
        <span className={styles.link}>Projects</span>
      </div>
    </div>
  );
};

export default LocalityCard;
