const express = require("express");
const EnquiryRouter = express.Router();
const Enquiry = require("../models/Enquiry");

EnquiryRouter.post("/create", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      messageEn,
      isGuest,
      staffId,
      userId,
      propertyId,
    } = req.body;

    if (!fullName || !email || !phoneNumber || !messageEn || !propertyId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newEnquiry = new Enquiry({
      fullName,
      email,
      phoneNumber,
      messageEn,
      userId: userId || null,
      staffId,
      isGuest: isGuest || false,
      propertyId,
    });

    const savedEnquiry = await newEnquiry.save();

    return res.status(201).json({
      success: true,
      message: "Enquiry created successfully",
      enquiry: savedEnquiry,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = EnquiryRouter;
