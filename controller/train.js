const Train = require('../models/train');

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
  try {
    const trains = await Train.find();
    res.status(200).json(trains);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve trains' });
  }
};

// Read a single train by ID
exports.getTrainById = async (req, res) => {
  try {
    const train = await Train.findById(req.params.id);
    if (!train) {
      res.status(404).json({ error: 'Train not found' });
    } else {
      res.status(200).json(train);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve train' });
  }
};

// Update a train 
exports.updateTrainById = async (req, res) => {
  try {
    const updatedTrain= await Train.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTrain) {
      res.status(404).json({ error: 'Train not found' });
    } else {
      res.status(200).json(updatedTrain);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update train' });
  }
};



// Delete a user by ID
exports.deleteTrainById = async (req, res) => {
  try {
    const deletedTrain = await Train.findByIdAndDelete(req.params.id);
    if (!deletedTrain) {
      res.status(404).json({ error: 'Train not found' });
    } else {
      res.status(200).json({ message: 'Train deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete train' });
  }
};
