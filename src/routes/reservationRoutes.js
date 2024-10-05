const express = require('express');
const validate = require('../middlewares/validateMiddleware');
const { createRservationSchema } = require('../validations/reservationValidation');
const { createReservation } = require('../controllers/reservationController');
const { reservationMiddleware } = require('../middlewares/reservationMiddleware');


const router = express.Router();


router.get('/', (req, res) => {
  res.status(200).send('Server is using v1.0 of the API.');
});
router.post('/save', validate(createRservationSchema),  reservationMiddleware, createReservation);



module.exports = router;