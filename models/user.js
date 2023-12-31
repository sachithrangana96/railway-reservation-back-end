const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  address: { type: String, required: false},
  loyality: { type: Number, required: false,default:0},
  password: { type: String, required: true },
  status: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
