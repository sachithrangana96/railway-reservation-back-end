const express = require('express');
const bookingController = require('../controller/booking');
const  {verifyToken} = require('../middlewares/verifyToken');

const router = express.Router();


router.post('/',verifyToken,bookingController.createBooking);

// Booking routes


router.post('/',verifyToken, bookingController.createBooking);


// Protected routes (authentication required)
// router.use(authenticateToken);
router.get('/getAll', bookingController.getAllBookings)
router.put('/:id', bookingController.updateBookingById);
router.get('/:id', bookingController.getBookingById);
router.delete('/:id', bookingController.deleteBookingById);

// filters
router.get('/train/:id', bookingController.getBookingByTrainId);
router.get('/user/userID',verifyToken, bookingController.getBookingByUserId);

module.exports = router;
