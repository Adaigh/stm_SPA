const mongoose = require('mongoose');
const vehicleSchema = require('./vehicleModel')

const appointmentSchema = new mongoose.Schema({
  date: {
    type: String,
    get: function(val) {
      // Conversion to short-string format mm/dd/yyyy
      return val.toLocaleDateString();
    }
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
    default: false
  }
});

  module.exports = mongoose.model('Appointment', appointmentSchema)