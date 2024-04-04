const mongoose = require('mongoose');
const vehicleSchema = require('./vehicleModel')

const appointmentSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  firstName: {
      type: String,
      trim: true,
      required: true
  },
  lastName: {
      type: String,
      trim: true,
      required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
  },
  vehicle: {
    type: vehicleSchema,
    required: true
  },
  description: {
    type: String,
  },
  reviewed: {
    type: Boolean,
    default: false,
    required: true
  }
});

  module.exports = mongoose.model('Appointment', appointmentSchema)