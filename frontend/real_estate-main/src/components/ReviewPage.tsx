import React, { useState, useRef, useEffect } from "react";
import "./ReviewPage.css";

type Review = {
  _id: string;
  name: string;
  comment: string;
  rating: number;
  timestamp: string;
};

type ReviewPageProps = {
  reviewsProperty?: Review[];
};

const ReviewPage: React.FC<ReviewPageProps> = ({ reviewsProperty = [] }) => {
  const totalReviews = reviewsProperty.length;
  const sortedReviews = [...reviewsProperty].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const averageRating = (
    sortedReviews.reduce((sum, review) => sum + review.rating, 0) /
    (totalReviews || 1)
  ).toFixed(2);

  const ratingCounts = [0, 0, 0, 0, 0];
  sortedReviews.forEach((r) => {
    if (r.rating >= 1 && r.rating <= 5) {
      ratingCounts[r.rating - 1]++;
    }
  });

  const getRatingPercentage = (count: number) =>
    ((count / (totalReviews || 1)) * 100).toFixed(0);

  const [visibleCount, setVisibleCount] = useState(3);
  const reviewListRef = useRef<HTMLDivElement>(null);

  const handleReadMore = () => {
    setVisibleCount((prev) => {
      const newCount = prev + 4;
      return newCount > totalReviews ? totalReviews : newCount;
    });

    setTimeout(() => {
      reviewListRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="review-page">
      <div className="rating-summary">
        <h2>Rating Overview</h2>
        <div className="overall-rating">
          <div className="rating-value">{averageRating}</div>
        </div>

        <div className="ratings-detail">
          {[5, 4, 3, 2, 1].map((star) => {
            const percent = Number(getRatingPercentage(ratingCounts[star - 1]));
            const emoji = ["😄", "😊", "😐", "😕", "😭"][5 - star];

            return (
              <div className="rating-item" key={star}>
                <span
                  role="img"
                  aria-label={`Rating ${star}`}
                  className="rating-emoji"
                >
                  {emoji}
                </span>
                <div className="bar-container">
                  <div
                    className="bar-fill"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <span className="rating-score">{percent}%</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="reviews-list" ref={reviewListRef}>
        <h3>
          Reviews <span className="review-count">({totalReviews})</span>
        </h3>

        {totalReviews === 0 ? (
          <p className="no-reviews">No reviews yet.</p>
        ) : (
          <div className="reviews-list-container">
            {sortedReviews.slice(0, visibleCount).map((review) => (
              <div className="review-item" key={review._id}>
                <div className="review-header">
                  <span className="review-author">{review.name}</span>
                  <span className="review-date">
                    {new Date(review.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <div className="review-stars">
                  {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                </div>
                <p>{review.comment}</p>
              </div>
            ))}
            {visibleCount < totalReviews && (
              <button className="read-more-button" onClick={handleReadMore}>
                Read More
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
