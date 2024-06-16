const express = require('express')
const {
    sendApprovalEmail
} = require('../controllers/mailerController')

const requireAuth = require('../middleware/requireAuth')
const verifyAccessLevel = require('../middleware/verifyAccessLevel')

const router = express.Router()

//Middleware
router.use(requireAuth)
router.use(verifyAccessLevel(1))

// Approval email route
router.post('/approve', sendApprovalEmail)

module.exports = router
