const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  saveSearchHistory,
  userPastHistory,
} = require("../controllers/userProfileController.js");
const { upload } = require("../middleware/multer.middleware.js");
const { authenticate } = require("../middleware/auth.js");

router.get("/:id", authenticate, getUserProfile);
router.put("/:id", authenticate, upload.single("image"), updateUserProfile);
router.get("/:userId/past-searches", userPastHistory);
router.post("/search-history", saveSearchHistory);

module.exports = router;
