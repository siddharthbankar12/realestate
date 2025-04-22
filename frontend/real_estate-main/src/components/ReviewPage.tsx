import React from "react";
import "./ReviewPage.css";

const ReviewPage: React.FC = () => {
  return (
    <div className="review-page">
      {/* Main rating summary section */}
      <div className="rating-summary">
        <h2> Rating Overview </h2>
        <div className="overall-rating">
          <div className="rating-value">4.88</div>
        </div>
        <div className="ratings-detail">
          <div className="rating-item">
            <div><span role="img" aria-label="Excellent" style={{ fontSize: "1.5em" }}>😄</span></div>
            <div className="bar1"></div>
            <span className="rating-score">85%</span>
          </div>
          <div className="rating-item">
            <div><span role="img" aria-label="Good" style={{ fontSize: "1.5em" }}>😊</span></div>
            <div className="bar2"></div>
            <span className="rating-score">60%</span>
          </div>
          <div className="rating-item">
            <div><span role="img" aria-label="Average" style={{ fontSize: "1.5em" }}>😐</span></div>
            <div className="bar3"></div>
            <span className="rating-score">40%</span>
          </div>
          <div className="rating-item">
            <div><span role="img" aria-label="Poor" style={{ fontSize: "1.5em" }}>😕</span></div>
            <div className="bar4"></div>
            <span className="rating-score">20%</span>
          </div>
          <div className="rating-item">
            <div><span role="img" aria-label="Terrible" style={{ fontSize: "1.5em" }}>😭</span></div>
            <div className="bar5"></div>
            <span className="rating-score">10%</span>
          </div>
        </div>
      </div>

      {/* Reviews list section */}
      <div className="reviews-list">
        <h3>Reviews <span className="review-count"></span></h3>

        {/* Example of a review item */}
        <div className="review-item">
          <div className="review-header">
            <span className="review-author">Sitara,Hyderabad</span>
            <span className="review-date">Jul 29</span>
          </div>
          <div className="review-stars">★★★★☆</div>

          <p> 
            We absolutely love our new home! The spacious living areas and modern kitchen are perfect for our family gatherings.
            The neighborhood is friendly and quiet, and the schools nearby are excellent. Highly recommend this property!
          </p>
        </div>

        <div className="review-item">
          <div className="review-header">
            <span className="review-author">Avansh,Bombay</span>
            <span className="review-date">Aug 25</span>
          </div>
          <div className="review-stars">★★★☆☆</div>
          <p>
            We’ve been renting this property for six months, and it’s been a fantastic experience. The house is in great condition, and the landlord has been very attentive to any maintenance requests.
            The location is convenient, and the rent is very reasonable for the area.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
