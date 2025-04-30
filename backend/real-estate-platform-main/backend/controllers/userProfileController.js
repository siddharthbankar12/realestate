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

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, mail, phoneNumber, landlineNumber, city, state, address } =
      req.body;

    console.log("Request Body: ", req.body);

    // Split the name into first and last name if provided
    const [firstName, lastName] = name ? name.split(" ") : ["", ""];

    // Set up the updated user data
    const updatedData = {
      firstName,
      lastName,
      email: mail,
      phoneNumber,
      landlineNumber,
      city,
      state,
      address,
    };

    // If there is a file uploaded, update the image field
    if (req.file) {
      console.log("Uploaded file: ", req.file);
      updatedData.image = req.file.filename;
    }

    // Check if the removeImage flag is set to 'true' and remove the image if so
    if (req.body.removeImage === "true") {
      updatedData.image = null; // Remove the image from the database
    }

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedUser) {
      console.log("User not updated. Check if the document exists.");
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User updated successfully:", updatedUser);

    // Generate a new JWT token for the updated user
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

    // Respond with the updated user and token
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
