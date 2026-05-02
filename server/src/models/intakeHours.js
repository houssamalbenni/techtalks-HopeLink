const mongoose = require('mongoose');

const IntakeHoursSchema = new mongoose.Schema({
  startTime: String,
  endTime: String,
  emergency_interval: String
});

const IntakeHours = mongoose.models.IntakeHours || mongoose.model('IntakeHours', IntakeHoursSchema);

module.exports = {
  IntakeHours,
  IntakeHoursSchema,
};
