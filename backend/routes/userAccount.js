const express = require('express')

const {
    loginUserAccount,
    signupUserAccount,
    findUserDetails
} = require ('../controllers/userAccountController')

const router = express.Router()

// Login
router.post('/login', loginUserAccount)

// Signup
router.post('/signup', signupUserAccount)

router.get('/:id', findUserDetails)

module.exports = router