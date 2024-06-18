const express = require('express')
const {
    addtoMailerList,
    retrieveMailerList,
    removefromMailerList,
    sendApprovalEmail
} = require('../controllers/mailerController')

const requireAuth = require('../middleware/requireAuth')
const verifyAccessLevel = require('../middleware/verifyAccessLevel')

const router = express.Router()

//Middleware
// router.use(requireAuth)

// Create
router.post('/list', addtoMailerList)

// Read
router.get('/list', retrieveMailerList)

// Delete
router.delete('/list/:id', removefromMailerList)

// Approval email route
router.post('/approve',verifyAccessLevel(1), sendApprovalEmail)

module.exports = router
