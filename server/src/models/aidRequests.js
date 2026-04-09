const mongoose = require('mongoose');
const {RequestStatus,PriorityLevels} =require("../constant/enum");

const AidRequestSchema = new mongoose.Schema({
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The Refugee
  priority: { type: String, enum: PriorityLevels, default: 'standard' },
  description: { type: String },
  status: { type: String, enum: RequestStatus, default: 'pending' }
}, { timestamps: true });

const AidRequest = mongoose.models.AidRequest || mongoose.model('AidRequest', AidRequestSchema);

module.exports = {
  AidRequest,
  AidRequestSchema,
};
