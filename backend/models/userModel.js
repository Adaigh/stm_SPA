const mongoose = require('mongoose')

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
    emailAddress: {
        type: String,
        default: "Not Stored"
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)