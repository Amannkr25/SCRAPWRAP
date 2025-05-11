const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

<<<<<<< HEAD
// Load environment variables
dotenv.config();
=======
const express=require('express')
const {route}=require('../src/routers/signUp')
const {loginRoute}=require('../src/routers/login')
const modelUsers=require("../src/models/user");
const mongoose=require('mongoose')
const app=express();
>>>>>>> 5460c903f5cc187eb27e3c73b6a2abfa8177004b

// Import routes
const authRoutes = require('./routers/auth');
const userRoutes = require('./routers/user');
const pickupRoutes = require('./routers/pickup');
const wasteRoutes = require('./routers/waste');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Database connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/scrapWrap")
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

<<<<<<< HEAD
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/pickups', pickupRoutes);
app.use('/api/waste', wasteRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
=======
app.use(express.json())
app.use('/signup',route);
app.use('/login',loginRoute)
app.listen(8000,()=>{console.log("okk server start")});
>>>>>>> 5460c903f5cc187eb27e3c73b6a2abfa8177004b
