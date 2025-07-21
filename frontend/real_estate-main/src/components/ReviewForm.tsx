import React, { useState, ChangeEvent } from "react";
import styles from "./ReviewForm.module.css";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";

interface ReviewFormProps {
  propertyId: string;
}

interface FormData {
  name: string;
  review: string;
  rating: number;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ propertyId }) => {
  const [data, setData] = useState<FormData>({
    name: "",
    review: "",
    rating: 0,
  });

  const [hover, setHover] = useState<number | null>(null);

  const handleOnchange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (data.rating === 0) {
      toast.error("Please select a star rating.");
      return;
    }

    try {
      const baseURL = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(
        `${baseURL}/api/reviews/add-property-review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            propertyId,
            name: data.name,
            review: data.review,
            rating: data.rating,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        toast.error(result.error || "Failed to submit review");
        return;
      }

      setData({ name: "", review: "", rating: 0 });
      toast.success("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.reviewFormContainer}>
        <h2 className={styles.heading}>Leave a Review</h2>
        <form onSubmit={handleSubmit} className={styles.reviewForm}>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={data.name}
            onChange={handleOnchange}
            required
            className={styles.input}
          />
          <textarea
            name="review"
            placeholder="Your review"
            value={data.review}
            onChange={handleOnchange}
            required
            className={styles.textarea}
          />

          <div className={styles.starRating}>
            {[1, 2, 3, 4, 5].map((star) => (
              <p
                key={star}
                className={styles.starButton}
                onClick={() => setData((prev) => ({ ...prev, rating: star }))}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(null)}
              >
                <FaStar
                  color={star <= (hover ?? data.rating) ? "#ffc107" : "#e4e5e9"}
                  size={24}
                />
              </p>
            ))}
          </div>

          <button type="submit" className={styles.submitButton}>
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
