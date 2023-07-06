const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startStation: { type: String, required: true },
  endStation: { type: String, required: true },
  startTime: { type: Number, required: true },
  endTime: { type: Number, required: true },
  status: { type: String, required: true },
  numberOfSeats: { type: Number, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Train', trainSchema);
