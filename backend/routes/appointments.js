const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const verifyAccessLevel = require('../middleware/verifyAccessLevel')
const {
    getAppointments,
    getAppointment,
    createAppointment,
    getMonth,
    getAppointmentCounts
} = require ('../controllers/appointmentController')

const router = express.Router()
const staffAccess = 2;

// Get appointments
router.get('/', requireAuth, verifyAccessLevel(staffAccess), getAppointments)

// Get appointment by ID
router.get('/single/:id', requireAuth, verifyAccessLevel(staffAccess), getAppointment)

// Create new appointment
router.post('/', requireAuth, verifyAccessLevel(staffAccess), createAppointment)

// Get a month of appointments
router.get('/month', requireAuth, verifyAccessLevel(staffAccess), getMonth)

// Get appointment counts
router.get('/counts', getAppointmentCounts)

module.exports = router
