const express = require('express')
const verifyAccessLevel = require('../middleware/verifyAccessLevel')
const requireAuth = require('../middleware/requireAuth')
const {
    loginUserAccount,
    signupUserAccount,
    createUserAccount,
    findUserDetails
} = require ('../controllers/userAccountController')

const router = express.Router()

// Login
router.post('/login', loginUserAccount)

// Signup
router.post('/signup', signupUserAccount)

router.post('/create', requireAuth, verifyAccessLevel, createUserAccount)

router.get('/:id', findUserDetails)

module.exports = router