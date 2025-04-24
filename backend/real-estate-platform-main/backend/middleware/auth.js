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
    const user = await User.findById(decoded._id || decoded.id); // Check if decoded includes "id"

    if (!user) {
      return res.status(401).send({ error: "User not found." });
    }

    req.user = user; // Store user info in req
    next();
  } catch (e) {
    console.error("Auth error:", e);
    res.status(401).send({ error: "Your authentication failed." });
  }
};

// Admin Authorization Middleware
const authorizeAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      throw new Error();
    }
    next();
  } catch (e) {
    res.status(403).send({ error: "Access denied." });
  }
};

// ✅ Correct Export
module.exports = { authenticate, authorizeAdmin };
