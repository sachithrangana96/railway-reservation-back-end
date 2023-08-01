const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, default:'active' },
  isAdmin:{type:Boolean, default:true}
});

module.exports = mongoose.model('Admin', adminSchema);
