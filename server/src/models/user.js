const mongoose = require("mongoose");
const {
  RoleTypes,
  ResourceTitles,
  LanguageCodes,
} = require("../constant/enum");

const UserSchema = new mongoose.Schema(
  {
    full_name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: RoleTypes, required: true },

    // Refugee Specific
    family_number: { type: String },
    need: { type: [String], enum: ResourceTitles },
    location: {
      type: { type: String},
      coordinates: { type: [Number] }, // [longitude, latitude] (order is important for geospatial queries)
    },

    // NGO Specific
    verification_pdf_url: { type: String }, // URL to uploaded PDF
    service_area: [String], // Array of regions/cities

    // Donor Specific
    donations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donation", // This is the string name of the other model
      },
    ],

    profile_url: { type: String },
    dob: { type: Date }, // NGO founding date or Person DOB
    selected_language: { type: String, enum: LanguageCodes, default: "en" },
    device_id: { type: String }, // For socket/push notifications
  },
  { timestamps: true },
);

UserSchema.index({ location: "2dsphere" }); // Enable proximity search

const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = {
  User,
  UserSchema,
};
