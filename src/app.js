const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const reservationRoutes = require('./routes/reservationRoutes');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// home
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/views/index.html'));
});

app.use('/api/v1/reservation', reservationRoutes);




// Conditionally connect to MongoDB unless in test mode
if (process.env.NODE_ENV !== 'test') {
  // mongoose.connect('mongodb://localhost:27017/coffeeshop')
  mongoose.connect(process.env.NODE_ENV === "production" ? process.env.MONGO_URI : 'mongodb://localhost:27017/coffeeshop')
    .then(() => {
      console.log('MongoDB connected: ', mongoose.connection.host);
    }).catch((error) => {
      console.error('MongoDB connection error:', error);
    });
}

module.exports = app;
