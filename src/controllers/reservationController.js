const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

//Model
const Reservation = require("../models/reservationModel")


exports.createReservation = async (req, res) => {
  const { name, email, phone, date, time, people, message } = req.body;
  // Check if all fields are filled
  if (!name || !email || !phone || !date || !time || !people) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }
  if (!phone.match(/^\d{10}$/)) {
    return res.status(400).json({ message: 'Please enter a valid phone number' });
  }
  // Save reservation
  try {
    const reservation = new Reservation({
      uuid: uuidv4(),
      name,
      email,
      phone,
      date,
      time,
      people,
      message
    });
    await reservation.save();

    // Send email To Coffee Shop
    await nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    }).sendMail({
      to: process.env.EMAIL_USER,
      subject: 'New Reservation',
      text: message
    });

    // Send email To User
    await nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    }).sendMail({
      to: email,
      subject: 'Reservation Confirmation',
      text:'Thank you for your reservation!'
    });
    return res.status(201).json({ message: 'Reservation successfully created', reservation });
  }
  catch (error) {
    return res.status(500).json({ message: 'Serve Error, Try Later!', error });
  }
}
