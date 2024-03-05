const UserAccount = require('../models/userAccountModel')

// Login
const loginUserAccount = async (req, res) => {
    res.json({msg: 'Login'})
}

// Signup
const signupUserAccount = async (req, res) =>  {

    const { email, password, access} = req.body

    try {
        const userAccount = await UserAccount.signup(email, password, access)
        res.status(200).json({email, userAccount})
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

module.exports = { loginUserAccount, signupUserAccount}