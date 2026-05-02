const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
}, { timestamps: true });

const Donation = mongoose.models.Donation || mongoose.model('Donation', DonationSchema);

module.exports = {
  Donation,
  DonationSchema,
};
