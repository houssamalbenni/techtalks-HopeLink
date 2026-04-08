const mongoose = require('mongoose');
const {ResourceTitles,Facilities } =require( '../constant/enum');
const { IntakeHoursSchema } = require('./intakeHours');
const { AddressSchema } = require('./address');

const ServiceSchema = new mongoose.Schema({
  title: { type: String, enum: ResourceTitles, required: true },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  capacity: { type: Number, required: true }, // Total capacity
  availability: { type: Number, required: true }, // Current available
  images: [String],
  phone_number: { type: String },
  address: AddressSchema,
  requirements: { type: String }, // Documents or conditions needed
  intake_hours: IntakeHoursSchema,
  facilities: [{ type: String, enum: Facilities }],
  owner_ngo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
}, { timestamps: true });

ServiceSchema.index({ location: '2dsphere' });

/* 
  Note on Status (Frontend Logic):
  - Limited: if (availability / capacity) < 50% 
  - Open/Available: if (availability / capacity) >= 50%
  - Closed: if availability == 0 (Shelter)
  - Consumed: if availability == 0 (Food/Medicine)
*/

const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);

module.exports = {
  Service,
  ServiceSchema,
};
