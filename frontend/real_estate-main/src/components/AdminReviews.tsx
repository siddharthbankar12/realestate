import React from "react";
import styles from "./AdminReviews.module.css";
import { FaStar } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";

interface Review {
  _id: string;
  reviewerName: string;
  content: string;
  rating: number;
}

interface AdminReviewsProps {
  reviews: Review[];
}

const AdminReviews: React.FC<AdminReviewsProps> = ({ reviews }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={styles.star}
        color={index < rating ? "#facc15" : "#d1d5db"} // yellow or gray
      />
    ));
  };

  return (
    <div className={styles.grid}>
      {reviews.map((review) => (
        <div key={review._id} className={styles.card}>
          <div className={styles.header}>
            <BiUserCircle className={styles.avatar} />
            <div>
              <h3 className={styles.name}>{review.reviewerName}</h3>
              <div className={styles.stars}>{renderStars(review.rating)}</div>
            </div>
          </div>
          <p className={styles.content}>"{review.content}"</p>
        </div>
      ))}
    </div>
  );
};

export default AdminReviews;
