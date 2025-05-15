const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
require("dotenv").config();

const cookieParser = require('cookie-parser');

const {route}=require('../src/routers/signUp')
const {loginRoute}=require('../src/routers/login')
const admin=require('../src/routers/admin');
const modelUsers=require("../src/models/user");
const {isAdmin}=require("../src/middleware/auth");

// Import routes
const authRoutes = require('./routers/auth');
const userRoutes = require('./routers/user');
const pickupRoutes = require('./routers/pickup');
const wasteRoutes = require('./routers/waste');

const app = express();
//http://127.0.0.1:5500
// Middleware
app.use(cors({
    origin: 'http://localhost:5500', // Frontend URL
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Database connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/scrapWrap")
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

app.use(express.json())
app.use('/signup',route);
app.use('/login',loginRoute)
app.use('/admin',isAdmin,admin)
app.listen(8000,()=>{console.log("okk server start")});
