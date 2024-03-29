const express = require('express')
const { 
    createCustomer,
    getCustomers,
    getCustomer, 
    deleteCustomer,
    updateCustomer
} = require('../controllers/customerController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// GET all Customers
router.get('/', getCustomers)

// GET single Customer
router.get('/details', getCustomer)

// POST a new Customer
router.post('/', createCustomer)

// DELETE a Customer
router.delete('/:id', deleteCustomer)

// UPDATE a Customer
router.patch('/:id', updateCustomer)

module.exports = router