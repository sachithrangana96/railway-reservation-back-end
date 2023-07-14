const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  train: { type: mongoose.Schema.Types.ObjectId, ref: 'Train', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  payment_status: { type: String, enum: ['PAID', 'UNPAID'],},
  status: { type: String, required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);
