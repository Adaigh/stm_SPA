const mongoose = require('mongoose')
const vehicleSchema = require('./vehicleModel')

const Schema = mongoose.Schema

const customerSchema = new Schema({
    emailAddress: {
        type: String,
        trim: true,
        index: true,
        unique: true,
        sparse: true
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
    phoneNumbers:{
        type: [String],
        validate: [v => Array.isArray(v) && v.length > 0, "One phone number is required"]
    },
    vehicles: {
        type: [vehicleSchema],
    }
})

module.exports = mongoose.model('Customer', customerSchema)