const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
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
})

module.exports = mongoose.model('Vehicle', vehicleSchema)