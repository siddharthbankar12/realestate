const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userProfileController.js");
const { upload } = require("../middleware/multer.middleware.js");
const { authenticate } = require("../middleware/auth.js");

router.get("/:id", authenticate, getUserProfile);
router.put("/:id", authenticate, upload.single("image"), updateUserProfile);
module.exports = router;
