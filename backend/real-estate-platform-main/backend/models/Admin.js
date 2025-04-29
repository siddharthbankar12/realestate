const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    adminId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: { type: String, required: false, default: "" },
    phoneNumber: { type: String, required: false, default: "" },
    email: { type: String, required: false, default: "" },

    buyersId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    sellersId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
