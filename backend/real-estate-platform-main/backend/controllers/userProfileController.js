const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const Search = require("../models/SearchHistory.js");

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const cloudinary = require("../util/cloudinary");

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      name,
      mail,
      phoneNumber,
      landlineNumber,
      city,
      state,
      address,
      removeImage,
    } = req.body;

    // Handle image upload to Cloudinary
    let imageURL = null;
    if (req.file) {
      // Upload the image to Cloudinary and get the URL and public_id
      const uploadedImage = await cloudinary.uploadOnCloudinary(req.file.path);
      imageURL = uploadedImage?.secure_url; // Cloudinary image URL
    }

    // If user wants to remove image, delete the image from Cloudinary
    if (removeImage === "true" && req.body.imagePublicId) {
      await cloudinary.deleteFromCloudinary(req.body.imagePublicId);
      imageURL = null; // Remove image URL from the user's profile
    }

    const updatedData = {
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1] || "",
      email: mail,
      phoneNumber,
      landlineNumber,
      city,
      state,
      address,
      image: imageURL,
    };

    // Update the user profile in the database
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const token = jwt.sign(
      {
        id: updatedUser._id,
        firstname: updatedUser.firstName,
        lastname: updatedUser.lastName,
        email: updatedUser.email,
        role: updatedUser.role,
        phoneNumber: updatedUser.phoneNumber,
        city: updatedUser.city,
        state: updatedUser.state,
        address: updatedUser.address,
        landlineNumber: updatedUser.landlineNumber,
        image: updatedUser.image,
      },
      "bearer",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
      token,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const userPastHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    const userSearchHistory = await Search.findOne({ user_id: userId });

    if (!userSearchHistory) {
      return res
        .status(404)
        .json({ message: "No search history found for this user" });
    }

    res.status(200).json(userSearchHistory.searches);
  } catch (error) {
    console.error("Error fetching user search history:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = userPastHistory;

const saveSearchHistory = async (req, res) => {
  try {
    const { search_text, userId } = req.body;

    if (!search_text || !userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const now = new Date();

    const roundedNow = new Date(now);
    roundedNow.setSeconds(0, 0);

    let userSearchDoc = await Search.findOne({ user_id: userId });

    if (!userSearchDoc) {
      userSearchDoc = new Search({
        user_id: userId,
        searches: [{ search_text, search_datetime: roundedNow }],
      });
      await userSearchDoc.save();
      return res.status(200).json({ message: "Search saved (first)" });
    }

    const isDuplicate = userSearchDoc.searches.some((entry) => {
      const entryTime = new Date(entry.search_datetime);
      entryTime.setSeconds(0, 0); // Round to minute
      return (
        entry.search_text.toLowerCase() === search_text.toLowerCase() &&
        entryTime.getTime() === roundedNow.getTime()
      );
    });

    if (isDuplicate) {
      return res.status(200).json({ message: "Duplicate search ignored" });
    }

    userSearchDoc.searches.push({
      search_text,
      search_datetime: roundedNow,
    });
    await userSearchDoc.save();

    return res.status(200).json({ message: "Search saved" });
  } catch (error) {
    console.error("Error saving search history:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  saveSearchHistory,
  userPastHistory,
};
