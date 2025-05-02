const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AdminRouter = require("express").Router();
const AdminUpdateRouter = require("express").Router();
const Admin = require("../models/Admin");

const SECRET = "bearer";

// Admin Login Route
AdminRouter.post("/", async (request, response) => {
  try {
    const { adminId, password } = request.body;
    const user = await Admin.findOne({ adminId });

    if (!user) {
      return response
        .status(401)
        .json({ error: "Invalid admin ID or password" });
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect) {
      return response
        .status(401)
        .json({ error: "Invalid admin ID or password" });
    }

    const userForToken = {
      id: user._id,
      adminId: user.adminId,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      email: user.email,
    };

    const token = jwt.sign(userForToken, SECRET, { expiresIn: "1h" });

    response.status(200).send({ token, adminId: user.adminId });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Something went wrong" });
  }
});

// Admin Update Route
AdminUpdateRouter.put("/", async (request, response) => {
  try {
    const { adminId, ...updateFields } = request.body;

    if (!adminId) {
      return response.status(400).json({ error: "adminId is required" });
    }

    const updatedAdmin = await Admin.findOneAndUpdate(
      { adminId },
      { $set: updateFields },
      { new: true } // Return updated document
    );

    if (!updatedAdmin) {
      return response.status(404).json({ error: "Admin not found" });
    }

    const userForToken = {
      id: updatedAdmin._id,
      adminId: updatedAdmin.adminId,
      fullName: updatedAdmin.fullName,
      phoneNumber: updatedAdmin.phoneNumber,
      email: updatedAdmin.email,
    };

    const token = jwt.sign(userForToken, SECRET, { expiresIn: "1h" });

    response.status(200).json({
      message: "Admin details updated successfully",
      adminId: updatedAdmin.adminId,
      token,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = { AdminRouter, AdminUpdateRouter };
