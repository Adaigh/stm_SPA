const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userAccountSchema = new Schema({
    user: {
        type: String,
        required: true,
        unique: true,
        ref: 'Customer'
    },
    password: {
        type: String,
        required: true
    },
    access: {
        type: String,
        required: true
    }
})

// Static signup method
userAccountSchema.statics.signup = async function(user, password, access) {

    if(!user || !password) {
        throw Error('All fields must be filled')
    }

    if (!validator.isEmail(user)) {
        throw Error('Invalid email address')
    }

    // if (!validator.isStrongPassword(password)){
    //     throw Error('Password not strong enough')
    // }

    // Check email
    const exists = await this.findOne({user})

    if(exists) {
        throw Error("Email already in use.")
    }

    // Password encryption
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // Create new user account
    const userAccount = await this.create({user, password: hash, access})

    return userAccount
}

// Static login method
userAccountSchema.statics.login = async function(user, password) {

    if(!user || !password) {
        throw Error('All fields must be filled')
    }

    const userAccount = await this.findOne({user})

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