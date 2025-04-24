const express = require("express");
const router = express.Router();
const Appointments = require("../models/Appointment.js");
const { authenticate, authorizeAdmin } = require("../middleware/auth.js");

// Guest route - no authentication required
router.post("/appointments/admin", async (req, res) => {
  const { firstName, lastName, email, phone } = req.body;

  if (!firstName || !lastName || !email || !phone) {
    return res.status(400).json({
      success: false,
      message:
        "Please provide all required fields: firstName, lastName, email, and phone",
    });
  }

  const appointment = new Appointments({
    firstName,
    lastName,
    email,
    PhoneNumber: phone,
    isGuest: true, // Mark as guest
  });

  try {
    await appointment.save();
    return res.status(200).json({
      success: true,
      message: "Guest appointment sent to admin!",
    });
  } catch (error) {
    console.error("Error saving guest appointment:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// Logged-in user route (appointments for logged-in users)
router.post("/appointments/user", authenticate, async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;

    // Access user id directly from req.user
    const userId = req.user._id; // Corrected to use req.user._id

    console.log("User ID from token:", userId); // Log the user ID for debugging
    console.log("User from token:", req.user); // Log the user object for debugging

    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required fields: firstName, lastName, email, and phone",
      });
    }

    const appointment = new Appointments({
      firstName,
      lastName,
      email,
      PhoneNumber: phone,
      userId: userId, // Store userId to track which user booked the appointment
      isGuest: false, // Mark as a registered user
    });

    await appointment.save();
    return res.status(200).json({
      success: true,
      message: "User appointment booked successfully!",
    });
  } catch (error) {
    console.error("Error booking appointment:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// Get all appointments (can be used for admin to see all appointments)
// Get appointments - Admin gets all, user gets only theirs
router.get("/appointments", authenticate, async (req, res) => {
  try {
    let appointments;

    // If user is admin, show all appointments
    if (req.user.isAdmin) {
      appointments = await Appointments.find();
    } else {
      // If user is normal, show only their own appointments
      appointments = await Appointments.find({ userId: req.user._id });
    }

    return res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Error fetching appointments:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// Delete an appointment by ID
router.delete("/appointments/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointments.findById(id);
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    await Appointments.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "Appointment deleted successfully" });
  } catch (err) {
    console.error("Error deleting appointment:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

module.exports = router;
