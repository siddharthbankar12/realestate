import React, { useState } from "react";
import styles from "./AdminReviews.module.css";
import { FaStar } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

interface PropertyDetail {
  _id: string;
  title: string;
  Bhk: number;
  area: number;
  status: string;
  price: number;
  address: string;
  purpose: string;
  type: string;
  floors: string;
  Propreiter_name: string;
  Propreiter_email: string;
  Propreiter_contact: string;
  availabilityStatus: string;
  description: string;
  images: string[];
  amenities: string[];
  balconies: number;
  bathrooms: number;
  created_at: string;
  verification: string;
  landmark: string;
}

interface SingleReview {
  _id: string;
  name: string;
  comment: string;
  rating: number;
  timestamp: string;
}

interface PropertyReview {
  _id: string;
  propertyId: PropertyDetail;
  reviews: SingleReview[];
}

interface AdminReviewsProps {
  reviews: PropertyReview[];
  adminId: string;
}

const AdminReviews: React.FC<AdminReviewsProps> = ({ reviews }) => {
  const [selectedProperty, setSelectedProperty] =
    useState<PropertyDetail | null>(null);

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={styles.star}
        color={index < rating ? "#facc15" : "#d1d5db"}
      />
    ));

  const flattenedReviews =
    reviews?.flatMap((propertyReview) =>
      propertyReview.reviews.map((review) => ({
        ...review,
        property: propertyReview.propertyId,
      }))
    ) || [];

  return (
    <div className={styles.tableWrapper}>
      <h1 style={{ margin: "0 0 50px 0", textAlign: "center" }}>Reviews</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Reviewer Name</th>
            <th>Review</th>
            <th>Rating</th>
            <th>Property</th>
          </tr>
        </thead>
        <tbody>
          {flattenedReviews.reverse().map((review) => (
            <tr key={review._id}>
              <td className={styles.reviewer}>
                <BiUserCircle className={styles.avatar} />
                {review.name}
              </td>
              <td>{review.comment}</td>
              <td>{renderStars(review.rating)}</td>
              <td>
                <p
                  className={styles.propertyLink}
                  onClick={() => setSelectedProperty(review.property)}
                  style={{ textAlign: "left" }}
                >
                  {review.property?.title}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProperty && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedProperty(null)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedProperty(null)}
              className={styles.closeBtn}
            >
              <IoClose size={24} />
            </button>
            <h2 className={styles.modalTitle}>{selectedProperty.title}</h2>
            <div className={styles.detailsGrid}>
              <p>
                <strong>BHK :</strong> {selectedProperty.Bhk}
              </p>
              <p>
                <strong>Area :</strong> {selectedProperty.area} sq.ft
              </p>
              <p>
                <strong>Address :</strong> {selectedProperty.address}
              </p>
              <p>
                <strong>Price :</strong> ₹{selectedProperty.price}
              </p>
              <p>
                <strong>Status :</strong> {selectedProperty.status}
              </p>
              <p>
                <strong>Owner :</strong> {selectedProperty.Propreiter_name}
              </p>
              <p>
                <strong>Email :</strong> {selectedProperty.Propreiter_email}
              </p>
              <p>
                <strong>Contact :</strong> {selectedProperty.Propreiter_contact}
              </p>
            </div>
            {selectedProperty.images?.length > 0 && (
              <div className={styles.imageGrid}>
                {selectedProperty.images.map((url, idx) => (
                  <img key={idx} src={url} alt={`Property ${idx}`} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
