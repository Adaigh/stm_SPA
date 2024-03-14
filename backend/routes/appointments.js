const express = require('express')

const {
    getAppointments,
    getAppointment,
    createAppointment,
    getMonth
} = require ('../controllers/appointmentController')

const router = express.Router()

// Get appointments
router.get('/', getAppointments)

// Get appointment by ID
router.get('/single/:id', getAppointment)

// Create new appointment
router.post('/', createAppointment)

// Get a month of appointments
router.get('/month', getMonth)

module.exports = router
