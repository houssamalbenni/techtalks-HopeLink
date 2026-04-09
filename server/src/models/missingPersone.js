const mongoose = require('mongoose');
const { MissingStatus,FamilyRelations } =require("../constant/enum");
const { NoteMessageSchema } = require('./noteMessages');

const MissingPersonSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Who reported it
  name: { type: String, required: true },
  relation: { type: String, enum: FamilyRelations },
  last_known_location: { type: String },
  last_known_date: { type: Date },
  photo: { type: String }, // Main photo of the person
  status: { type: String, enum: MissingStatus, default: 'inProgress' },
  notes: [NoteMessageSchema] // Messages for conversation
}, { timestamps: true });

const MissingPerson = mongoose.models.MissingPerson || mongoose.model('MissingPerson', MissingPersonSchema);

module.exports = {
  MissingPerson,
  MissingPersonSchema,
};
