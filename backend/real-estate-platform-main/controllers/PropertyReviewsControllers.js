const express = require("express");
const PropertyReviewRouter = express.Router();
const PropertyReview = require("../models/PropertyReviews.js");
const Admin = require("../models/Admin.js");

PropertyReviewRouter.post("/add-property-review", async (req, res) => {
  try {
    const { name, review, rating, propertyId } = req.body;

    if (
      !name ||
      !review ||
      !propertyId ||
      typeof rating !== "number" ||
      rating < 1 ||
      rating > 5
    ) {
      return res.status(400).json({
        success: false,
        error: "All fields including a valid rating (1-5) are required.",
      });
    }

    let propertyReview = await PropertyReview.findOne({ propertyId });

    if (propertyReview) {
      propertyReview.reviews.unshift({
        name,
        comment: review,
        rating,
        timestamp: new Date(),
      });

      await propertyReview.save();
    } else {
      propertyReview = new PropertyReview({
        propertyId,
        reviews: [
          {
            name,
            comment: review,
            rating,
            timestamp: new Date(),
          },
        ],
      });

      await propertyReview.save();
    }

    res
      .status(201)
      .json({ success: true, message: "Review added successfully." });
  } catch (error) {
    console.error("Error creating property review:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

PropertyReviewRouter.get("/get-all-reviews", async (req, res) => {
  try {
    const reviews = await PropertyReview.find().populate("propertyId");

    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      reviews,
    });
  } catch (error) {
    console.error("Error fetching all property reviews:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = PropertyReviewRouter;
