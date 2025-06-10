const express = require("express");
const TitleSearchRouter = express.Router();
const TitleSearchRequest = require("../models/TitleSearchRequest");

// Submit a new title search request

TitleSearchRouter.post("/create-request", async (req, res) => {
  try {
    const {
      propertyAddress,
      PropertyCity,
      PropertyState,
      propertyType,
      PropertyRegistrationNumber,
      ContactFullName,
      ContactEmail,
      ContactPhone,
      ContactNotes,
    } = req.body;

    if (
      !propertyAddress ||
      !PropertyCity ||
      !PropertyState ||
      !propertyType ||
      !PropertyRegistrationNumber ||
      !ContactFullName ||
      !ContactEmail ||
      !ContactPhone ||
      !ContactNotes
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields.",
      });
    }

    const newRequest = new TitleSearchRequest({
      propertyAddress,
      PropertyCity,
      PropertyState,
      propertyType,
      PropertyRegistrationNumber,
      ContactFullName,
      ContactEmail,
      ContactPhone,
      ContactNotes,
    });

    await newRequest.save();

    res.status(201).json({
      success: true,
      message: "Request submitted successfully.",
      requestId: newRequest._id,
    });
  } catch (err) {
    console.error("Title search submission error:", err);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
});

// staff list of request
TitleSearchRouter.get("/list", async (req, res) => {
  try {
    const allRequests = await TitleSearchRequest.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      allRequests,
    });
  } catch (err) {
    console.error("Fetching title search requests failed:", err);
    res.status(500).json({
      success: false,
      message: "Could not retrieve requests.",
    });
  }
});

module.exports = TitleSearchRouter;
