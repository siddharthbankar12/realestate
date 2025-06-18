const express = require("express");
const router = express.Router();
const {
  createContractor,
  getVerifiedContractors,
  getVerifiedContractors,
  getContractorById,
  updateContractor,
  getAllContractors,
  deleteContractor,
  verifyContractor,
  addPortfolioProject
} = require("../controllers/ContractorController");

// const { authenticate, isAdmin } = require("../middleware/auth");

// 🏗️ Public routes
router.get("/", getAllContractors);                        // All contractors
router.get("/verified", getVerifiedContractors);           // Only verified contractors
router.get("/:id", getContractorById);                     // View specific contractor

// 🔐 Admin-only routes
router.post("/",  createContractor);           // Add contractor
router.put("/:id", updateContractor);      // Update contractor
router.delete("/:id", deleteContractor);   // Delete contractor
router.put("/verify/:id", verifyContractor); // Verify contractor
router.post("/:id/portfolio",  addPortfolioProject); //add project
module.exports = router;
