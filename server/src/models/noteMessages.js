const mongoose = require('mongoose');

const NoteMessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  body: { type: String, required: true },
  image: { type: String }, // Proof/Verification image
}, { timestamps: true });

const NoteMessage = mongoose.models.NoteMessage || mongoose.model('NoteMessage', NoteMessageSchema);

module.exports = {
  NoteMessage,
  NoteMessageSchema,
};
