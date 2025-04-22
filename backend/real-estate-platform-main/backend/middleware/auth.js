const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const SECRET = "bearer"; // kindly put this inside the .env file , for now kept it here only .

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send({ error: " Your Authentication failed ." });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.admin = decoded;
    next();
  } catch (e) {
    res.status(401).send({ error: " Your Authentication failed ." });
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
