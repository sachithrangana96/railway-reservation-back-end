const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
