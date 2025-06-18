const Contractor = require("../models/Contractor.js");

// Create a new contractor
const createContractor = async (req, res) => {
  try {
    const contractor = new Contractor(req.body);
    const savedContractor = await contractor.save();
    res.status(201).json(savedContractor);
  } catch (error) {
    res.status(400).json({ error: "Failed to create contractor" });
  }
};
const getAllContractors = async (req, res) => {
  try {
    const contractors = await Contractor.find();
    res.status(200).json(contractors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contractors" });
  }
};
// Get all contractors (verified)
const getVerifiedContractors = async (req, res) => {
  try {
    const filter = {};
    filter.verified = true;
    const contractors = await Contractor.find(filter);
    res.status(200).json(contractors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contractors" });
  }
};

// Get a single contractor by ID
const getContractorById = async (req, res) => {
  try {
    const contractor = await Contractor.findById(req.params.id);
    if (!contractor)
      return res.status(404).json({ error: "Contractor not found" });
    res.status(200).json(contractor);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contractor" });
  }
};

// Update contractor details
const updateContractor = async (req, res) => {
  try {
    const updated = await Contractor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ error: "Contractor not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: "Failed to update contractor" });
  }
};

// Delete a contractor
const deleteContractor = async (req, res) => {
  try {
    const deleted = await Contractor.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Contractor not found" });
    res.status(200).json({ message: "Contractor deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete contractor" });
  }
};

// Add a new project to contractor's portfolio
const addPortfolioProject = async (req, res) => {
  try {
    const contractor = await Contractor.findById(req.params.id);
    if (!contractor)
      return res.status(404).json({ error: "Contractor not found" });

    contractor.portfolio.push(req.body);
    await contractor.save();
    res.status(201).json(contractor);
  } catch (error) {
    res.status(400).json({ error: "Failed to add portfolio project" });
  }
};
//verify
const verifyContractor = async (req, res) => {
  try {
    const contractor = await Contractor.findByIdAndUpdate(
      req.params.id,
      { verified: true },
      { new: true }
    );
    if (!contractor) {
      return res.status(404).json({ error: "Contractor not found" });
    }
    res.status(200).json({ message: "Contractor verified", contractor });
  } catch (error) {
    res.status(500).json({ error: "Verification failed" });
  }
};
module.exports = {
  createContractor,
  getVerifiedContractors,
  getContractorById,
  updateContractor,
  deleteContractor,
  addPortfolioProject,
  verifyContractor,
  getAllContractors,
};
