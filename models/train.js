const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startStation: { type: mongoose.Schema.Types.ObjectId, ref: 'Station', required: true },
  endStation: { type: mongoose.Schema.Types.ObjectId, ref: 'Station', required: true },
  startTime: { type: Number, required: true },
  endTime: { type: Number, required: true },
  status: { type: String, required: true },
  numberOfSeats: { type: Number, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Train', trainSchema);
