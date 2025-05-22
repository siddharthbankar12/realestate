const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    staffId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      default: 1234567890,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["appointment_manager", "verifier", "support"],
      default: "appointment_manager",
    },

    appointmentsHandled: [
      {
        appointmentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Appointment",
        },
        date: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
        },
      },
    ],

    verifiedProperties: [
      {
        propertyId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Property",
        },
        verificationDate: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
        },
      },
    ],

    callLogs: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        date: {
          type: Date,
          default: Date.now,
        },
        callType: {
          type: String,
          enum: ["incoming", "outgoing"],
        },
        notes: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Staff = mongoose.model("Staff", staffSchema);
module.exports = Staff;
