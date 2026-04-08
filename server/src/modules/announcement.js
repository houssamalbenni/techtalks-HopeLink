const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Must be NGO
  title: { type: String, required: true },
  message: { type: String, required: true }
}, { timestamps: true });

const Announcement = mongoose.models.Announcement || mongoose.model('Announcement', AnnouncementSchema);

module.exports = {
  Announcement,
  AnnouncementSchema,
};
