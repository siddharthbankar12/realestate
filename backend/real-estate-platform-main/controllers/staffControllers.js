const express = require("express");
const bcrypt = require("bcrypt");
const staffRouter = express.Router();
const jwt = require("jsonwebtoken");
const Staff = require("../models/Staff");
const { authenticate, authorizeAdmin } = require("../middleware/auth");
const Property = require("../models/property");
const Appointment = require("../models/Appointment");
const mongoose = require("mongoose");
const User = require("../models/User");

const SECRET = "bearer";

// staff signup
staffRouter.post("/signup", authenticate, authorizeAdmin, async (req, res) => {
  const { email, password, fullName, role } = req.body;

  if (!email || !password || !fullName || !role) {
    return res.status(400).send({
      error: "All fields (email, password, fullName, role) are required.",
    });
  }

  try {
    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
      return res
        .status(400)
        .send({ error: "Staff with this email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const staffId = `basil${Date.now()}`;

    const newStaff = new Staff({
      staffId,
      email,
      password: passwordHash,
      fullName,
      role,
    });

    await newStaff.save();
    res.status(201).send({ message: "Staff created successfully." });
  } catch (error) {
    console.error("Error creating staff:", error);
    res.status(500).send({ error: "Failed to create staff." });
  }
});

// get all staff details
staffRouter.get("/all", authenticate, authorizeAdmin, async (req, res) => {
  try {
    const staffList = await Staff.find().select("-password");
    res.status(200).send(staffList);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch staff." });
  }
});

// delete staff account
staffRouter.delete("/:id", authenticate, authorizeAdmin, async (req, res) => {
  const staffId = req.params.id;

  try {
    const deletedStaff = await Staff.findByIdAndDelete(staffId);

    if (!deletedStaff) {
      return res.status(404).send({ error: "Staff not found." });
    }

    res.status(200).send({ message: "Staff deleted successfully." });
  } catch (error) {
    console.error("Error deleting staff:", error);
    res.status(500).send({ error: "Failed to delete staff." });
  }
});

// login staff
staffRouter.post("/login", async (req, res) => {
  const { staffId, password } = req.body;

  if (!staffId || !password) {
    return res
      .status(400)
      .json({ error: "Staff ID and password are required." });
  }

  try {
    const staff = await Staff.findOne({ staffId });

    if (!staff) {
      return res.status(404).json({ error: "Staff not found." });
    }

    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const userForToken = {
      _id: staff._id,
      staffId: staff.staffId,
      fullName: staff.fullName,
      phoneNumber: staff.phoneNumber,
      email: staff.email,
      role: staff.role,
    };

    const token = jwt.sign(userForToken, SECRET || "bearer");

    res.status(200).json({
      message: "Login successful",
      token,
      staff,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login." });
  }
});

//update staff details
staffRouter.put("/update-detail/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { email, fullName } = req.body;

  if (!email || !fullName) {
    return res.status(400).json({ error: "Email and full name are required." });
  }

  try {
    const updatedStaff = await Staff.findByIdAndUpdate(
      id,
      { email, fullName },
      { new: true }
    );

    if (!updatedStaff) {
      return res.status(404).json({ error: "Staff not found." });
    }

    const updatedTokenPayload = {
      _id: updatedStaff._id,
      staffId: updatedStaff.staffId,
      fullName: updatedStaff.fullName,
      phoneNumber: updatedStaff.phoneNumber,
      email: updatedStaff.email,
      role: updatedStaff.role,
    };

    const token = jwt.sign(updatedTokenPayload, SECRET || "bearer");

    res.status(200).json({
      message: "Staff details updated.",
      staff: updatedStaff,
      token,
    });
  } catch (error) {
    console.error("Error updating staff:", error);
    res.status(500).json({ error: "Failed to update staff." });
  }
});

//change staff password
staffRouter.put("/:id/change-password", authenticate, async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res
      .status(400)
      .json({ error: "Both old and new passwords are required." });
  }

  try {
    const staff = await Staff.findById(id);

    if (!staff) {
      return res.status(404).json({ error: "Staff not found." });
    }

    const isMatch = await bcrypt.compare(oldPassword, staff.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Old password is incorrect." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    staff.password = hashedPassword;
    await staff.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Password update error:", error);
    res.status(500).json({ error: "Failed to update password." });
  }
});

// verify property by staff
staffRouter.put("/property/:id/accept/:staffId", async (req, res) => {
  try {
    const propertyId = req.params.id;
    const staffId = req.params.staffId;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    property.verification = "verified";
    await property.save();

    const staff = await Staff.findById(staffId);
    if (!staff) {
      return res.status(404).json({ error: "Staff not found" });
    }

    staff.verifiedProperties.push({
      propertyId: property._id,
      verificationDate: new Date(),
      status: "Verified",
    });

    await staff.save();

    res.json({
      success: true,
      message: "Property accepted and verified",
      verifiedBy: staff.fullName,
    });
  } catch (error) {
    console.error("Error accepting property:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// confirmed appointment by staff
staffRouter.put("/appointment/confirmed/:appointmentId", async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { staffId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({ error: "Invalid appointment ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(staffId)) {
      return res.status(400).json({ error: "Invalid staff ID" });
    }

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    const staff = await Staff.findById(staffId);
    if (!staff) {
      return res.status(404).json({ error: "Staff not found" });
    }

    appointment.status = "Confirmed";
    appointment.staffId = staffId;
    await appointment.save();

    staff.appointmentsHandled.push({
      appointmentId: appointment._id,
      date: new Date(),
      status: "Confirmed",
    });
    await staff.save();

    res.json({
      success: true,
      message: "Appointment confirmed successfully",
    });
  } catch (error) {
    console.error("Error confirming appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// cancel appointment by staff
staffRouter.put("/appointment/Cancelled/:appointmentId", async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { staffId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({ error: "Invalid appointment ID" });
    }

    if (!mongoose.Types.ObjectId.isValid(staffId)) {
      return res.status(400).json({ error: "Invalid staff ID" });
    }

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    const staff = await Staff.findById(staffId);
    if (!staff) {
      return res.status(404).json({ error: "Staff not found" });
    }

    appointment.status = "Cancelled";
    appointment.staffId = staffId;
    await appointment.save();

    staff.appointmentsHandled.push({
      appointmentId: appointment._id,
      date: new Date(),
      status: "Cancelled",
    });
    await staff.save();

    res.json({
      success: true,
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    console.error("Error confirming appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// fetch all user data for staff
staffRouter.get("/users-details", async (req, res) => {
  try {
    const data = await User.find();

    return res.json({
      success: true,
      message: "Users data fetch successfully",
      usersData: data,
    });
  } catch (error) {
    console.error("Error fetching users detail:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = staffRouter;
