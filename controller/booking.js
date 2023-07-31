const Booking = require('../models/booking');
const User = require('../models/user');

// Create a new booking
exports.createBooking = async (req, res) => {
  req.body.user = req.userId
  try {
    const newBooking = await Booking.create({...req.body,user:req.userId});
    if(newBooking){
      const user = await User.findById(req.userId)
      console.log(user)
      await User.findByIdAndUpdate(req.userId,{loyality : user.loyality + 1});
      res.status(201).json(newBooking);
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error });
  }
};

// Read all bookings
exports.getAllBookings = async (req, res) => {
  console.log("working")
  try {
    const bookings = await Booking.find().populate('user').populate('train', 'name startStation endStation') // Populate user fields; // Populate train fields;
    console.log(bookings)
    res.status(200).json(bookings);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to retrieve bookings' });
  }
};

// Read a single booking by ID
exports.getBookingById = async (req, res) => {

  try {
    const booking = await Booking.findById(req.params.id)
                  .populate('user', 'full_name email') // Populate user fields
                  .populate('train', 'name startStation endStation'); // Populate train fields;
    if (!booking) {
      res.status(404).json({ error: 'Booking not found' });
    } else {
      res.status(200).json(booking);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve booking' });
  }
};


exports.getBookingByTrainId = async (req, res) => {
  const trainId = req.params.id;
  const {date} = req.query;
 

  let query = {};
  if (trainId) {
    query.train = trainId;
  }

  if (date) {
    const startDate = new Date(date);
    const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);

    console.log(startDate)

    query.date = {
      $gte: startDate,
      $lt: endDate
    };

  }



  try {
    const bookings = await Booking.find({...query})
      .populate('user', 'first_name last_name email')
      .populate('train', 'name start_station end_station');
  
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    res.status(500).json({ error: 'Failed to retrieve bookings' });
  }
};


exports.getBookingByUserId = async (req, res) => {
  
  const userId = req.userId;
  const {date} = req.query;
 

  let query = {};
  if (userId) {
    query.user = userId;
  }

console.log(userId, "user ID")

  if (date) {
    const startDate = new Date(date);
    const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);

    query.date = {
      $gte: startDate,
      $lt: endDate
    };

  }



  try {
    const bookings = await Booking.find({ ...query })
  .populate('user', 'first_name last_name email')
  .populate({
    path: 'train',
    select: 'name startTime endTime', // Include startTime and endTime directly
    populate: [
      {
        path: 'startStation',
        select: 'name', // Assuming you want to populate only the name field of the startStation
      },
      {
        path: 'endStation',
        select: 'name', // Assuming you want to populate only the name field of the endStation
      },
    ],
  });

    console.log(bookings)
  
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    res.status(500).json({ error: 'Failed to retrieve bookings' });
  }
};


// Update a booking by ID
exports.updateBookingById = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBooking) {
      res.status(404).json({ error: 'Booking not found' });
    } else {
      res.status(200).json(updatedBooking);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update booking' });
  }
};

// Delete a booking by ID
exports.deleteBookingById = async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      res.status(404).json({ error: 'Booking not found' });
    } else {
      res.status(200).json({ message: 'Booking deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete booking' });
  }
};
