 const express = require('express');
 const stationController = require('../controller/station');
 const router = express.Router();



 router.post('/',stationController.createStation);
 router.get('/',stationController.getAllStations);
 router.get('/:id',stationController.getStationById);
 router.put('/:id',stationController.updateStationById);
 router.delete('/:id',stationController.deleteStation);

 module.exports = router;
 