const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  date: {
    type: Date,
    get: function(val) { // Convert the date to ISODate format when retrieving it
      return val.toISOString();
    }
  },
  userInformation: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  vehicle: {
    type: Number,
    required: true,
    index: true
  },
  shortDescription: {
    type: String,
    required: false
  },
  longDescription: {
    type: String,
    required: false
  }
});

  module.exports = mongoose.model('Appointment', appointmentSchema)