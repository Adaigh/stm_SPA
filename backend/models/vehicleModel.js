const mongoose = require('mongoose')

const Schema = mongoose.Schema

const vehicleSchema = new Schema({
    vehicleYear: {
        type: Number,
        required: true
    },
    vehicleMake: {
        type: String,
        required: true
    },
    vehicleModel: {
        type: String,
        required: true
    },
    vehicleVIN: {
        type: String,
        default: "Not Stored"
    }
}, {_id: false})

module.exports = vehicleSchema