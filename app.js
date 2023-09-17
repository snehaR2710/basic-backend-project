require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDb = require('./config/db');

const app = express();

// Express middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//cors
app.use(cors())

//  Init database connection
connectToDb();

// user routes import
const userRoutes = require("./routes/userRoutes")

app.use('/', userRoutes);

module.exports = app;