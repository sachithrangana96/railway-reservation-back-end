const express = require('express');
const bookingController = require('../controller/booking');
// const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Booking routes


router.post('/', bookingController.createBooking);


// Protected routes (authentication required)
// router.use(authenticateToken);

router.put('/:id', bookingController.updateBookingById);
router.get('/:id', bookingController.getBookingById);
router.delete('/:id', bookingController.deleteBookingById);



// filters
router.get('/train/:id', bookingController.getBookingByTrainId);
router.get('/user/userID', bookingController.getBookingByUserId);

module.exports = router;
