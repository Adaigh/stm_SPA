const mongoose = require('mongoose')

const Schema = mongoose.Schema

const vehicleSchema = new Schema({
    vehicleYear: {
        type: String,
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
        type: String
    }
})

module.exports = mongoose.model('User', userSchema)