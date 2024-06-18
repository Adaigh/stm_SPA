const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recipientSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    }
}, {_v: 0})

module.exports = mongoose.model('Recipient', recipientSchema)