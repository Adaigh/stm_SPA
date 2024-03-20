const UserAccount = require('../models/userAccountModel')
const jwt = require('jsonwebtoken')

// JWT creator
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '1d'})
}


// Login
const loginUserAccount = async (req, res) => {

    const {email, password} = req.body

    try {
        const userAccount = await UserAccount.login(email, password)

        const webToken = createToken(userAccount._id)
        const access = userAccount.access
        res.status(200).json({email, access, webToken})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Self Signup
const signupUserAccount = async (req, res) =>  {

    const {email, password} = req.body

    try {
        const userAccount = await UserAccount.signup(email, password, access=0)

        const webToken = createToken(userAccount._id)

        res.status(200).json({email, access: 0, webToken})
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

// Signup
const createUserAccount = async (req, res) =>  {

    const {email, password, access} = req.body

    try {
        const userAccount = await UserAccount.signup(email, password, access)
        const new_id = userAccount._id
        res.status(200).json({new_id, email, access})
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {loginUserAccount, signupUserAccount, createUserAccount}