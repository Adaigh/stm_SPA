const express = require('express')
const verifyAccessLevel = require('../middleware/verifyAccessLevel')
const requireAuth = require('../middleware/requireAuth')
const {
    loginUserAccount,
    refreshToken,
    signupUserAccount,
    createUserAccount,
    deleteUserAccount,
    getAccounts,
    getAccount,
    updateAccount
} = require ('../controllers/userAccountController')

const router = express.Router()
const adminAccess = 2;

// Login
router.post('/login', loginUserAccount)

// Refresh token
router.get('/refresh', requireAuth, refreshToken)

// Create (Self-Signup)
router.post('/signup', signupUserAccount)

// Create
router.post('/', requireAuth, verifyAccessLevel(adminAccess), createUserAccount)

// Read all
router.get('/', requireAuth, verifyAccessLevel(adminAccess), getAccounts)

// Read one
router.get('/:id', requireAuth, verifyAccessLevel(adminAccess), getAccount)

// Update
router.patch('/:id', requireAuth, verifyAccessLevel(adminAccess), updateAccount)

// Delete
router.delete('/:id', deleteUserAccount)

module.exports = router