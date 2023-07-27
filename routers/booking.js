const express = require('express');
const bookingController = require('../controller/booking');
const  {verifyToken} = require('../middlewares/verifyToken');

const router = express.Router();


router.post('/',verifyToken,bookingController.createBooking);
router.put('/:id', bookingController.updateBookingById);
router.get('/:id', bookingController.getBookingById);
router.delete('/:id', bookingController.deleteBookingById);


// filters
router.get('/train/:id', bookingController.getBookingByTrainId);
router.get('/user/:id', bookingController.getBookingByUserId);

module.exports = router;
