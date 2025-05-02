const express = require("express");
const app = express();
const usersRouter = require("./controllers/newuser");
const loginRouter = require("./controllers/login");
const { AdminRouter, AdminUpdateRouter } = require("./controllers/adminlogin");

const adminsignuprouter = require("./controllers/adminsignup");
const userProfileRoutes = require("./controllers/userProfileRoutes.js");

const mongoDB = require("./db");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const port = process.env.PORT || 8000;

mongoDB();
app.use(cors()); // Enable CORS for all routes

// JSON Parsing Middleware
app.use(express.json());

// API Routes
app.use("/api/users", usersRouter);
app.use("/api/users", loginRouter);
app.use("/api/user-update", userProfileRoutes);
app.use("/api/admin/login", AdminRouter);
app.use("/api/admin/update", AdminUpdateRouter);
app.use("/api/admin", adminsignuprouter);
app.use("/api", require("./controllers/propertyRoutes"));
app.use("/api", require("./controllers/propertyImageRoutes"));
app.use("/api/testimonials", require("./controllers/testimonialRoutes"));
app.use("/api", require("./controllers/emailVerification"));
app.use("/api", require("./controllers/Appointment"));

// Static file access
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded images

// General error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
