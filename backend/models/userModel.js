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
        type: [Number],
        validate: [v => Array.isArray(v) && v.length > 0, "One phone number is required"]
    },
    emailAddresses: {
        type: [String],
        default: ["Not Stored"]
    },
    vehicles: {
        type: [vehicleSchema],
        validate: [v => Array.isArray(v) && v.length > 0, "One vehicle is required"]
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)