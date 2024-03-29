const express = require('express')
const verifyAccessLevel = require('../middleware/verifyAccessLevel')
const requireAuth = require('../middleware/requireAuth')
const {
    loginUserAccount,
    signupUserAccount,
    createUserAccount,
    // findUserDetails,
    deleteUserAccount
} = require ('../controllers/userAccountController')

const router = express.Router()
const adminAccess = 3;

// Login
router.post('/login', loginUserAccount)

// Signup
router.post('/signup', signupUserAccount)

router.post('/create', requireAuth, verifyAccessLevel(adminAccess), createUserAccount)

// router.get('/', findUserDetails)

router.delete('/:id', deleteUserAccount)

module.exports = router