const mongoose = require('mongoose')
const UserAccount = require('../models/userAccountModel')
const jwt = require('jsonwebtoken')

// JWT creator
const createToken = (_id) => {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        throw new TypeError('ID invalid for token creation')
    }
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}


// LOGIN account
const loginUserAccount = async (req, res) => {

    const { user, password } = req.body

    try {
        const userAccount = await UserAccount.login(user, password)

        const webToken = createToken(userAccount._id)
        const access = userAccount.access
        res.status(200).json({ user, access, webToken })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// POST self-signup customer
const signupUserAccount = async (req, res) => {

    const { user, password } = req.body

    try {
        const userAccount = await UserAccount.signup(user, password, access = 0)

        const webToken = createToken(userAccount._id)

        res.status(200).json({ _id: userAccount._id, user, access: 0, webToken })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// POST a new account
const createUserAccount = async (req, res) => {
    
    const { user, password, access } = req.body

    try {
        const account = await UserAccount.signup(user, password, access)

        res.status(200).json({_id: account._id, user, access })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// GET all accounts
const getAccounts = async (req, res) => {
    const accounts = await UserAccount.find().populate({
        path: 'user',
        model: 'Customer',
        foreignField: 'emailAddress'
    }).select({ _id: 1, user: 1, access: 1 }).sort({ access: -1 })
    res.status(200).json(accounts)
}

// GET a single account
const getAccount = async (req, res) => {

    const {id} = req.params

    const account = await UserAccount.findById(id).populate({
        path: 'user',
        model: 'Customer',
        foreignField: 'emailAddress'
    }).select({ _id: 1, user: 1, access: 1 }).sort({ access: -1 })
    res.status(200).json(account)
}

// PATCH an account
const updateAccount = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'Invalid request data'})
    }

    const account = await UserAccount.findByIdAndUpdate(id, {...req.body})

    if(!account){
        return res.status(404).json({error: 'Account not found'})

    }
    res.status(200).json({data: account})
}

// DELETE an account
const deleteUserAccount = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "User not found" })
    }

    try {
        const userAccount = await UserAccount.deleteOne({ _id: id })

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
    createUserAccount,
    getAccounts,
    getAccount,
    updateAccount,
    deleteUserAccount,
    createToken
}