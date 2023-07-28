const express = require('express');
const trainController = require('../controller/train');


const router = express.Router();

// Train routes
router.post('/', trainController.createTrain);
router.get('/', trainController.getAllTrains);
router.get('/:id', trainController.getTrainById);
router.put('/:id', trainController.updateTrainById);
router.delete('/:id', trainController.deleteTrainById);

module.exports = router;
