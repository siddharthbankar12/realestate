const express = require("express");
const app = express();

const usersRouter = require("./controllers/newuser");
const loginRouter = require("./controllers/login");
const {
  AdminRouter,
  AdminUpdateRouter,
  AdminDashUsersDetail,
} = require("./controllers/adminlogin");
const adminSignupRouter = require("./controllers/adminsignup");
const staffRouter = require("./controllers/staffControllers.js");
const userProfileRoutes = require("./controllers/userProfileRoutes.js");
const propertyRoutes = require("./controllers/propertyRoutes");
const propertyImageRoutes = require("./controllers/propertyImageRoutes");
const testimonialRoutes = require("./controllers/testimonialRoutes");
const emailVerification = require("./controllers/emailVerification");
const Appointment = require("./controllers/Appointment");
const PropertyReviewRouter = require("./controllers/PropertyReviewsControllers.js");

require("dotenv").config();
const mongoDB = require("./db");
const cors = require("cors");
const path = require("path");
const EnquiryRouter = require("./controllers/EnquiryControllers.js");

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
app.use("/api/admin/users-details", AdminDashUsersDetail);
app.use("/api/admin", adminSignupRouter);
app.use("/api", propertyRoutes);
app.use("/api", propertyImageRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api", emailVerification);
app.use("/api", Appointment);
app.use("/api/staff", staffRouter);
app.use("/api/reviews", PropertyReviewRouter);
app.use("/api/enquiry", EnquiryRouter);

// Static file access
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// General error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
