const express = require('express');
const cors = require("cors");
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const {verifyToken} = require('./middlewares/verifyToken')

const userRoutes = require('./routers/user');
const bookingRoutes = require('./routers/booking');
const authRoutes = require('./routers/auth');
const trainRoutes = require('./routers/train');
const stationRoutes = require('./routers/station');
const adminRoutes = require('./routers/admin');
const couponRoutes = require('./routers/coupon')
const cookieParser = require('cookie-parser')

const app = express();
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan('tiny'));
app.use(cookieParser());
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

app.use('/coupon', couponRoutes);



mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB...'))
.catch( err => console.error('Could not connect to MongoDB...',err))

// Start the server
app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
