const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  building: String,
  city: String,
  street: String,
  floor: Number
});

const Address = mongoose.models.Address || mongoose.model('Address', AddressSchema);

module.exports = {
  Address,
  AddressSchema,
};
