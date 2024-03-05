const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userAccountSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    access: {
        type: String,
        required: true
    },
    userInfo: {
        type: String,
        default: "No user info"
    }
})

// Static signup method
userAccountSchema.statics.signup = async function(email, password, access) {

    // Check email
    const exists = await this.findOne({email})

    if(exists) {
        throw Error("Email already in use.")
    }

    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(password, salt)

    const userAccount = await this.create({email, password: hash, access})

    return userAccount
}

module.exports = mongoose.model('UserAccount', userAccountSchema)