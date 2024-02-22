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
    phoneNumbers: {
        type: [ {
            phoneNumber:{
                type: String,
                required: true
            }
        }],
        validate: [(val) => val.length>0, 'At least one phone number is required.']
    }
})