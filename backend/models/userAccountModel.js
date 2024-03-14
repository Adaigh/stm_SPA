const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

// Static signup method
userAccountSchema.statics.signup = async function(email, password, access) {

    if(!email || !password) {
        throw Error('All fields must be filled')
    }

    if (!validator.isEmail(email)) {
        throw Error('Invalid email address')
    }

    if (!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }

    // Check email
    const exists = await this.findOne({email})

    if(exists) {
        throw Error("Email already in use.")
    }

    // Password encryption
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // Create new user account
    const userAccount = await this.create({email, password: hash, access})

    return userAccount
}

// Static login method
userAccountSchema.statics.login = async function(email, password) {

    if(!email || !password) {
        throw Error('All fields must be filled')
    }

    const userAccount = await this.findOne({email})

    if(!userAccount){
        throw Error('Email or password incorrect')
    }

    const match = await bcrypt.compare(password, userAccount.password)

    if(!match){
        throw Error('Email or password incorrect')
    }

    return userAccount
}



module.exports = mongoose.model('UserAccount', userAccountSchema)