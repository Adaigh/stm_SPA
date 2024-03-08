const UserAccount = require('../models/userAccountModel')
const jwt = require('jsonwebtoken')

// JWT creator
const createToken = (_id, access) => {
    return jwt.sign({_id, access}, process.env.JWT_SECRET, {expiresIn: '3d'})
}


// Login
const loginUserAccount = async (req, res) => {

    const {email, password} = req.body

    try {
        const userAccount = await UserAccount.login(email, password)

        const webToken = createToken(userAccount._id, userAccount.access)

        res.status(200).json({email, webToken})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Signup
const signupUserAccount = async (req, res) =>  {

    const { email, password, access} = req.body

    try {
        const userAccount = await UserAccount.signup(email, password, access)

        const webToken = createToken(userAccount._id, userAccount.access)

        res.status(200).json({email, userAccount, webToken})
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

module.exports = { loginUserAccount, signupUserAccount}