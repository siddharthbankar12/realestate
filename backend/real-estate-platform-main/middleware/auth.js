const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");

const SECRET = "bearer"; // Ideally use process.env.JWT_SECRET

// User Authentication Middleware
const authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log("TOKEN:", token);

  if (!token) {
    return res.status(401).send({ error: "Your authentication failed." });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    console.log("Decoded Token:", decoded); // Check the decoded token

    // First, check if the token corresponds to a User
    const user = await User.findById(decoded._id || decoded.id);

    if (user) {
      req.user = user; // Store user info in req
      // If the user is an admin, attach admin info
      if (user.isAdmin) {
        req.admin = user;
      }
    } else {
      // If not found as User, check if the token corresponds to an Admin
      const admin = await Admin.findOne({ adminId: decoded.adminId });
      if (admin) {
        req.admin = admin; // Store admin info in req
      } else {
        return res.status(401).send({ error: "User or Admin not found." });
      }
    }

    next();
  } catch (e) {
    console.error("Auth error:", e);
    res.status(401).send({ error: "Your authentication failed." });
  }
};

// Admin Authorization Middleware
const authorizeAdmin = async (req, res, next) => {
  // If no admin info is present, access is denied
  if (!req.admin) {
    return res.status(403).send({ error: "Access denied. Admins only." });
  }

  next();
};

// ✅ Correct Export
module.exports = { authenticate, authorizeAdmin };
