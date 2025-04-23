const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// Fetch the secret key from the environment variables
const SECRET = "bearer";

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send({ error: "Your authentication failed." });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.admin = decoded; // Store decoded admin data in request
    next();
  } catch (e) {
    res.status(401).send({ error: "Your authentication failed." });
  }
};

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

module.exports = { authenticate, authorizeAdmin };
