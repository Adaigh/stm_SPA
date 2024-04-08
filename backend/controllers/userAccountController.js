const mongoose = require('mongoose')
const UserAccount = require('../models/userAccountModel')
const jwt = require('jsonwebtoken')

// JWT creator
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '1d'})
}


// Login
const loginUserAccount = async (req, res) => {

    const {user, password} = req.body

    try {
        const userAccount = await UserAccount.login(user, password)

        const webToken = createToken(userAccount._id)
        const access = userAccount.access
        res.status(200).json({user, access, webToken})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Self Signup
const signupUserAccount = async (req, res) =>  {

    console.log(req.body)
    
    const {user, password} = req.body

    try {
        const userAccount = await UserAccount.signup(user, password, access=0)

        const webToken = createToken(userAccount._id)

        res.status(200).json({_id: userAccount._id, user, access: 0, webToken})
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

// Signup elevated access
const createUserAccount = async (req, res) =>  {

    const {user, password, access} = req.body

    try {
        const userAccount = await UserAccount.signup(user, password, access)
        const new_id = userAccount._id
        res.status(200).json({new_id, user, access})
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

// Find customer information associated with account
// const findUserDetails = async (req, res) => {

//     const {emailAddress} = req.body

//     try {
//         const userAccount = await UserAccount.findOne({user: emailAddress})
//         .populate({
//             path: 'user',
//             model: 'Customer',
//             select: ['emailAddress', 'firstName', 'lastName', 'phoneNumbers', 'vehicles'],
//             foreignField: 'emailAddress'
//         }).select('user')

//         if (!userAccount) {
//             return res.status(404).json({ error: 'User Account not found' }); 
//         }

//         return res.status(200).json(userAccount); // Send the complete object

//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ error: 'Failed to fetch user info' }); 
//     }
// }

// Remove a user account
const deleteUserAccount = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "User not found"})
    }

    try {
        const userAccount = await UserAccount.deleteOne({_id: id})

        if (!userAccount) {
            return res.status(404).json({ error: 'User Account not found' }); 
        }

        return res.status(200).json(userAccount);

    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch user info' }); 
    }
}

module.exports = {
    loginUserAccount,
    signupUserAccount,
    // findUserDetails,
    createUserAccount,
    deleteUserAccount}