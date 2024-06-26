const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const verifyAccessLevel = require('../middleware/verifyAccessLevel')
const {
    getAppointments,
    getAppointment,
    createAppointment,
    getAppointmentCounts,
    updateAppointment,
    deleteAppointment
} = require ('../controllers/appointmentController')

const router = express.Router()
const staffAccess = 2;

// Get appointments
router.get('/', requireAuth, verifyAccessLevel(staffAccess), getAppointments)

// Get appointment by ID
router.get('/single/:id', requireAuth, verifyAccessLevel(staffAccess), getAppointment)

// Create new appointment
router.post('/', createAppointment)

// Get appointment counts
router.get('/counts', getAppointmentCounts)

// Update an appointment record
router.patch('/:id', requireAuth, verifyAccessLevel(staffAccess), updateAppointment)

// Delete an appointment record
router.delete('/:id', requireAuth, verifyAccessLevel(staffAccess), deleteAppointment)

module.exports = router
