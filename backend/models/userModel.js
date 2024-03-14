const mongoose = require('mongoose')
const vehicleSchema = require('./vehicleModel')


const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumbers:{
        type: [String],
        validate: [v => Array.isArray(v) && v.length > 0, "One phone number is required"]
    },
    emailAddresses: {
        type: [String],
        default: ["Not Stored"]
    },
    vehicles: {
        type: [vehicleSchema],
    }
})

module.exports = mongoose.model('User', userSchema)