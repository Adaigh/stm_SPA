const Customer = require('../models/customerModel')
const UserAccount = require('../models/userAccountModel')
const mongoose = require('mongoose')

// GET all Customers
const getCustomers = async (req,res) => {
    const customers = await Customer.find().sort({lastName: 1})
    res.status(200).json(customers)
}

// GET single Customer details using account email
const getCustomer = async (req, res) => {
    const {_id} = req.user
    
    if(typeof(_id) == 'undefined'){
        return res.status(400).json({error: 'Invalid request data'})
    }
    

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json({error: 'Invalid request ID'})
    }

    try{
        const customer = await UserAccount.findById({_id})
        .populate({
            path: 'user',
            model: 'Customer',
            foreignField: 'emailAddress'
        })

        if(!customer){
            return res.status(404).json({error: 'Customer not found'})
        }
        res.status(200).json(customer)

    } catch(error) {
        return res.status(500).json({error: 'Failed to fetch data'})
    }

    

}

// POST a new Customer
const createCustomer = async (req, res) => {
    let {firstName, lastName, phoneNumbers, emailAddress, vehicles} = req.body

    // Validation
    if(!firstName || !lastName || !phoneNumbers || !vehicles){
        return res.status(400).json({error: "Missing required data"})
    }

    // If email is not provided, create placeholder string
    if(!emailAddress){
        emailAddress = `PLACEHOLDER - ${firstName} ${lastName}`
    }

    // Check to see if Customer already exists
    let customer = await Customer.findOne({emailAddress})
    if(customer) {
        return res.status(409).json({error: "Customer data already exists", CustomerData: customer})
    }

    // ADD new Customer document
    try {
        customer = await Customer.create({firstName, lastName, phoneNumbers, emailAddress, vehicles})
        res.status(200).json(customer)
    } catch (error){
        res.status(500).json({error: error.message})
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