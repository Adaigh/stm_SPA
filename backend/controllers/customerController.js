const Customer = require('../models/customerModel')
const mongoose = require('mongoose')

// GET all Customers
const getCustomers = async (req,res) => {
    const customers = await Customer.find({}).sort({lastName: 1})
    res.status(200).json(customers)
}

// GET single Customer
const getCustomer = async (req, res) => {
    // ID validation check
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Customer not found"})
    }

    const customer = await Customer.findById(id)

    if(!customer){
        return res.status(404).json({error: 'Customer not found'})
    }

    res.status(200).json(customer)
}

// POST a new Customer
const createCustomer = async (req, res) => {
    const {firstName, lastName, phoneNumbers, emailAddresses, vehicles} = req.body

    let emptyFields = []

    if(!firstName){
        emptyFields.push('firstName')
    }
    if(!lastName){
        emptyFields.push('lastName')
    }
    if(!phoneNumbers){
        emptyFields.push('phoneNumbers')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Incomplete Customer details', emptyFields})
    }

    // Check to see if Customer already exists
    let customer = await Customer.findOne({firstName, lastName})
    if(customer) {
        return res.status(409).json({error: "Customer data already exists", CustomerData: customer})
    }

    // ADD new Customer document
    try {
        if(emailAddresses){
            customer = await Customer.create({firstName, lastName, phoneNumbers, emailAddresses, vehicles})
        } else {
            customer = await Customer.create({firstName, lastName, phoneNumbers, vehicles})
        }
        res.status(200).json(customer)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

// DELETE a Customer
const deleteCustomer = async (req,res) => {
    // ID validation check
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Customer not found'})
    }

    const customer = await Customer.findByIdAndDelete(id)

    if(!customer){
        return res.status(400).json({error: 'Customer not found'})
    }
    res.status(200).json(customer)
}

// UPDATE a Customer
const updateCustomer = async (req, res) => {
    // ID validation check
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Customer not found'})
    }

    const customer = await Customer.findByIdAndUpdate(id, {...req.body})

    if(!customer){
        return res.status(400).json({error: 'Customer not found'})
    }
    res.status(200).json({CustomerData: customer, updates: req.body})
}

module.exports = {
    getCustomers,
    getCustomer,
    createCustomer,
    deleteCustomer,
    updateCustomer
}