const Joi = require('joi');


const createRservationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name cannot be empty',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email cannot be empty',
  }),
  phone: Joi.string().required().messages({
    'string.empty': 'Phone cannot be empty',
  }),
  date: Joi.date().required().messages({
    'date.base': 'Please provide a valid date',
    'date.empty': 'Date cannot be empty',
  }),
  time: Joi.string().required().messages({
    'string.empty': 'Time cannot be empty',
  }),
  people: Joi.number().required().messages({
    'number.base': 'Please provide a valid number',
    'number.empty': 'People cannot be empty',
  }),
  message: Joi.string().messages({
    'string.empty': 'Message cannot be empty',
  })
});



module.exports = {
  createRservationSchema
}