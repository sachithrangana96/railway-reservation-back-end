const express = require('express');
const cors = require("cors");
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv");


const userRoutes = require('./routers/user');
const bookingRoutes = require('./routers/booking');
const authRoutes = require('./routers/auth');
const trainRoutes = require('./routers/train');
const stationRoutes = require('./routers/station');
const adminRoutes = require('./routers/admin');

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
dotenv.config();



app.use((err,req,res,next)=>{
  if(err.name==='UnauthorizedError'){
   return res.status(401).json({message:'The User is not Authorized!.'})
  }
  if(err.name==='ValidationError'){
    return res.status(401).json({message:err})
  }
  return res.status(500).json(err);

});

// Middleware and other configurations...

// Use the user routes
app.use('/users', userRoutes);

// Use the booking routes
app.use('/bookings', bookingRoutes);

// Use the authentication routes
app.use('/auth', authRoutes);

// Use the train routes
app.use('/trains', trainRoutes);

//Use the Station routes

app.use('/station',stationRoutes);

// Use the admin routes
app.use('/admin', adminRoutes);



mongoose.connect('mongodb://localhost:27017/railway')
.then(() => console.log('Connected to MongoDB...'))
.catch( err => console.error('Could not connect to MongoDB...',err))

// Start the server
app.listen(4000, () => {
  console.log('Server is running on port 3000');
});
