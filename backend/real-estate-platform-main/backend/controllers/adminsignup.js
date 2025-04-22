const express = require("express");
const bcrypt = require("bcrypt");
const adminsignuprouter = new express.Router();
const Admin = require("../models/Admin");
const { authenticate, authorizeAdmin } = require("../middleware/auth");

adminsignuprouter.post(
  "/signup",
  authenticate,
  authorizeAdmin,
  async (req, res) => {
    const { adminId, password } = req.body;

    if (!adminId || !password) {
      return res
        .status(400)
        .send({ error: "Admin ID and password are required." });
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newAdmin = new Admin({ adminId, password: passwordHash });
    try {
      await newAdmin.save();
      res.status(201).send({ message: "Admin created successfully." });
    } catch (e) {
      res.status(400).send({ error: "Failed to create admin." });
    }
  }
);

adminsignuprouter.get("/", authenticate, authorizeAdmin, async (req, res) => {
  try {
    const admins = await Admin.find({});
    res.json(admins);
  } catch (error) {
    res.status(400).json({ error: "Admins not found ." });
  }
});

adminsignuprouter.delete(
  "/:id",
  authenticate,
  authorizeAdmin,
  async (request, response) => {
    const { id } = request.params;

    try {
      const deletedUser = await Admin.findByIdAndDelete(id);
      if (deletedUser) {
        response.status(204).end();
      } else {
        response.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      response.status(400).json({ error: "Invalid user ID" });
    }
  }
);

module.exports = adminsignuprouter;
