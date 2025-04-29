// const { v2 } = require("cloudinary");
// const fs = require("fs");
// const cloudinary = v2;

const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: "dsrbflu0a",
  api_key: "425673899486623",
  api_secret: "Xp4012GXyXc3NEawuQnqOUx_SfM",
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File uploaded to Cloudinary:", response.url);

    try {
      if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
    } catch (err) {
      console.error("Failed to delete local file:", err);
    }

    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    try {
      if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
    } catch (err) {
      console.error("Failed to delete local file after error:", err);
    }
    return null;
  }
};

module.exports = { uploadOnCloudinary };
