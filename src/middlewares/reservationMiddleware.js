
function reservationMiddleware(req, res, next) {
  const { date, time } = req.body;
  const reservationDate = new Date(`${date} ${time}`);
  const currentDate = new Date();
  
  if (reservationDate < currentDate) {
    return res.status(400).json({ message: 'Date and time not valid' });
  }

  next();
}

module.exports = {
  reservationMiddleware
};