const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  date: {
    type: String,
    get: function(val) {
      // Conversion to short-string format mm/dd/yyyy
      return val.toLocaleDateString();
    }
  },
  userInformation: {
    type: String,
    required: true,
    ref: 'Customer'
  },
  vehicle: {
    type: Number,
    required: true
  },
  description: {
    type: String,
  }
});

  module.exports = mongoose.model('Appointment', appointmentSchema)