const express = require('express')

const {
    loginUserAccount,
    signupUserAccount
} = require ('../controllers/userAccountController')

const router = express.Router()

// Login
router.post('/login', loginUserAccount)

// Signup
router.post('/signup', signupUserAccount)

module.exports = router