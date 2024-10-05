const mongoose = require('mongoose');


const reservationSchema = new mongoose.Schema({
  uuid: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  people: { type: Number, required: true },
  message: { type: String }
});


const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;