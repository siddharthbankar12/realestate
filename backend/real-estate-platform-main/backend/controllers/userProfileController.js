const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

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

module.exports = { getUserProfile, updateUserProfile };
