const mongoose = require("mongoose");

const resourcesEnum = ["food", "shelter", "medicine"];
const roleTypeEnum = ["refugee", "ngo", "donor", "admin"];
const languageEnum = ["en", "ar", "fr"];

const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: 150,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      unique: true,
      trim: true,
      maxlength: 30,
    },
    email: {
      type: String,
      unique: true,
      sparse: true, // بيخلي null مش unique
      trim: true,
      lowercase: true,
      maxlength: 150,
      default: null,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      maxlength: 255,
    },
    family_number: { type: String, default: null }, // refugee only
    need: { type: [String], enum: resourcesEnum, default: [] }, // refugee only
    verification: { type: String, default: null }, // NGO only
    service_area: { type: [String], default: [] }, // NGO & Donor
    role: {
      type: String,
      enum: roleTypeEnum,
      required: [true, "Role is required"],
    },
    profile_url: { type: String, default: null },
    dob: { type: String, default: null },
    selected_language: { type: String, enum: languageEnum, default: "en" },
    device_id: { type: String, default: null },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
);

const User = mongoose.model("User", userSchema);
module.exports = User;
