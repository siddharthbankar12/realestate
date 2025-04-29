import React from "react";

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
  return (
    <div>
      {reviews.map((review) => (
        <div key={review._id}>
          <h3>{review.reviewerName}</h3>
          <p>{review.content}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminReviews;
