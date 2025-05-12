const express = require("express");
const bcrypt = require("bcrypt");
const staffSignupRouter = express.Router();

const Staff = require("../models/Staff");
const { authenticate, authorizeAdmin } = require("../middleware/auth");

// Create new staff
staffSignupRouter.post(
  "/signup",
  authenticate,
  authorizeAdmin,
  async (req, res) => {
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
  }
);

// Get all staff
staffSignupRouter.get(
  "/all",
  authenticate,
  authorizeAdmin,
  async (req, res) => {
    try {
      const staffList = await Staff.find().select("-password");
      res.status(200).send(staffList);
    } catch (error) {
      res.status(500).send({ error: "Failed to fetch staff." });
    }
  }
);

// Delete a staff by ID
staffSignupRouter.delete(
  "/:id",
  authenticate,
  authorizeAdmin,
  async (req, res) => {
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
  }
);

module.exports = staffSignupRouter;
