const Appointment = require('../models/appointmentModel')
const mongoose = require('mongoose')


// Get all appointments with user information 
// ********************
// TODO: FILTER ONLY FOR CURRENT APPOINTMENTS
// ********************
const getAppointments = async (req,res) => {
    const appointments = await Appointment.find()
    .sort({date:-1})
    res.status(200).json(appointments)
}

// Get a specific appointment
const getAppointment = async (req,res) => {

    // ID validation check
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Appointment not found"})
    }

    const appointment = await Appointment.findById(id)

    if(!appointment){
        return res.status(404).json({error: "Appointment not found"})
    }

    res.status(200).json(appointment)
}

// Create a new appointment
const createAppointment = async (req,res) => {
    const {date, firstName, lastName, phoneNumber, emailAddress, vehicle, description} = req.body
    
    if(!date || !firstName || !lastName || !phoneNumber || !vehicle || !description) {
        return res.status(400).json({error: "Missing required fields"})
    }

    // ********************
    // TODO: VALIDATION CHECKS
    // ********************
    
    let appointment = await Appointment.findOne({date, firstName, lastName, vehicle})
    if(appointment) {
        return res.status(409).json({error: "Appointment already exists"})
    }

    try {
        appointment = await Appointment.create({
            date, firstName, lastName, phoneNumber, emailAddress, vehicle, description, reviewed: false
        })
        res.status(200).json(appointment)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

// Get all appointments for calendar display
const getAppointmentCounts = async (req,res) => {

    const appointments = await Appointment.aggregate([
        { $match: {reviewed: true}},
        { $group: { _id: { day: '$date' }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
        { $project: { _id: 0, day: '$_id.day', count: '$count' } }
    ])
    
    if(!appointments){
        res.status(500).json({error: "Server Error"})
    }

    // Reformat server-side
    let results = {}
    for (let item of appointments){
        results[item.day] = item.count
    }
    
    res.status(200).json(results)
}

module.exports = {
    getAppointments,
    getAppointment,
    createAppointment,
    getAppointmentCounts
}