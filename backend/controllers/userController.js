const User = require('../models/userModel')
const mongoose = require('mongoose')

// GET all users
const getUsers = async (req,res) => {
    const users = await User.find({}).sort({lastName: 1})
    res.status(200).json(users)
}

// GET single user
const getUser = async (req, res) => {
    // ID validation check
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "User not found"})
    }

    const user = await User.findById(id)

    if(!user){
        return res.status(404).json({error: 'User not found'})
    }

    res.status(200).json(user)
}

// POST a new user
const createUser = async (req, res) => {
    const {firstName, lastName, phoneNumbers, emailAddresses, vehicles} = req.body

    // Check to see if user already exists
    let user = await User.findOne({firstName, lastName})
    if(user) {
        return res.status(409).json({message: "User data already exists", userData: user._doc})
    }

    console.log(vehicles)

    // ADD new user document
    try {
        if(emailAddresses){
            user = await User.create({firstName, lastName, phoneNumbers, emailAddresses, vehicles})
        } else {
            user = await User.create({firstName, lastName, phoneNumbers, vehicles})
        }
        res.status(200).json(user)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

// DELETE a user
const deleteUser = async (req,res) => {
    // ID validation check
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'User not found'})
    }

    const user = await User.findByIdAndDelete(id)

    if(!user){
        return res.status(400).json({error: 'User not found'})
    }
    res.status(200).json(user)
}

// UPDATE a user
const updateUser = async (req, res) => {
    // ID validation check
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'User not found'})
    }

    const user = await User.findByIdAndUpdate(id, {...req.body})

    if(!user){
        return res.status(400).json({error: 'User not found'})
    }
    res.status(200).json({userData: user, updates: req.body})
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
}