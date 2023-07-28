const Train = require("../models/train");
const booking = require("../models/booking");
// const booking = require('../models/booking');

// Create a new train
exports.createTrain = async (req, res) => {
  try {
    const newTrain = await Train.create(req.body);
    res.status(201).json(newTrain);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Read all trains
exports.getAllTrains = async (req, res) => {
  const { startStation, endStation, date } = req.query;
  const query = {};

  console.log(req.query)

  if (startStation && endStation) {
    query.startStation = startStation;
    query.endStation = endStation;
  }

  try {
    let trains = await Train.find(query)
    .populate('startStation')
    .populate('endStation');
    
    for (let i = 0; i < trains.length; i++) {
      const { _id } = trains[i];
      const bookings = await booking.find({ train: _id, date });
      const trainObj = JSON.parse(JSON.stringify(trains[i]));

      console.log(bookings)

      //booking sit count
      const tot = bookings.reduce((total, booking) => {
        return total + booking.quantity;
      }, 0);

      //booking status
      let bookingstatus = {
        bookingSeats: tot,
        availableSeats: trains[i].numberOfSeats - tot,
        numberOfSeats: trains[i].numberOfSeats,
      };
      trainObj.bookingStatus = bookingstatus;
      trains[i] = trainObj;

      console.log("bookings", bookings[i]);
    }
    console.log(trains)
    res.status(200).json(trains);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to retrieve trains" });
  }
};

// Read a single train by ID
exports.getTrainById = async (req, res) => {
  try {
    const train = await Train.findById(req.params.id);
    if (!train) {
      res.status(404).json({ error: "Train not found" });
    } else {
      res.status(200).json(train);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve train" });
  }
};

// Update a train
exports.updateTrainById = async (req, res) => {
  try {
    const updatedTrain = await Train.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedTrain) {
      res.status(404).json({ error: "Train not found" });
    } else {
      res.status(200).json(updatedTrain);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update train" });
  }
};

// Delete a user by ID
exports.deleteTrainById = async (req, res) => {
  try {
    const deletedTrain = await Train.findByIdAndDelete(req.params.id);
    if (!deletedTrain) {
      res.status(404).json({ error: "Train not found" });
    } else {
      res.status(200).json({ message: "Train deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete train" });
  }
};
