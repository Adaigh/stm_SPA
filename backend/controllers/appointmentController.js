const Appointment = require('../models/appointmentModel')
const val = require('./validation')
const mongoose = require('mongoose')


// Get all appointments with user information
const getAppointments = async (req,res) => {
    const this_month = new Date().getMonth()+1
    const appointments = await Appointment.find({date: {$gte: this_month}})
    res.status(200).json(appointments)
}

// Get a specific appointment
const getAppointment = async (req,res) => {

    // ID validation check
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "Invalid request data"})
    }

    const appointment = await Appointment.findById(id)

    if(!appointment){
        return res.status(404).json({error: "Appointment not found"})
    }

    res.status(200).json(appointment)
}

// Create a new appointment
const createAppointment = async (req,res) => {
    const {date, firstName, lastName, phoneNumber, emailAddress, vehicle, description, reviewed} = req.body
    
    // VALIDATION CHECKS

    if(!date || !firstName || !lastName || !phoneNumber || !vehicle || !description) {
        return res.status(400).json({error: "Missing required fields"})
    }

    let errors = []
    if(!val.isValidDate(date)) errors.push('date')
    if(!val.isValidName(firstName)) errors.push('firstName')
    if(!val.isValidName(lastName)) errors.push('lastName')
    if(!val.isValidPhoneNumber(phoneNumber)) errors.push('phoneNumber')
    if(!val.isValidYear(vehicle.vehicleYear)) errors.push('vehicleYear')
    if(!val.isValidName(vehicle.vehicleMake)) errors.push('vehicleMake')
    if(vehicle.vehicleModel.length > 30) rrors.push('vehicleModel')
    if(!val.isValidVIN(vehicle.vehicleVIN)) errors.push('vehicleVIN')
    if(!val.isValidDescription(description)) errors.push('description')
    if(errors.length>0){
        const message = `Errors in parameters: ${errors.join(', ')}`
        return res.status(400).json({error: message})
    }
    
    let appointment = await Appointment.findOne({date, firstName, lastName, vehicle})
    if(appointment) {
        return res.status(409).json({error: "Appointment already exists"})
    }

    alreadyReviewed = reviewed ? true : false

    try {
        appointment = await Appointment.create({
            date, firstName, lastName, phoneNumber, emailAddress, vehicle, description, reviewed: alreadyReviewed
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
        return res.status(500).json({error: "Server Error"})
    }

    // Reformat server-side
    let results = {}
    for (let item of appointments){
        results[item.day] = item.count
    }
    
    res.status(200).json(results)
}

// UPDATE an Appointment
const updateAppointment = async (req, res) => {

    // ID validation check
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'Invalid request data'})
    }

    const appt = await Appointment.findByIdAndUpdate(id, {...req.body})

    if(!appt){
        return res.status(404).json({error: 'Appointment not found'})
    }
    res.status(200).json({AppointmentData: appt, updates: {...req.body}})
}

// DELETE an Appointment
const deleteAppointment = async (req,res) => {

    // ID validation check
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'Invalid request data'})
    }

    const appt = await Appointment.findByIdAndDelete(id)

    if(!appt){
        return res.status(404).json({error: 'Appointment not found'})
    }
    res.status(200).json(appt)
}

module.exports = {
    getAppointments,
    getAppointment,
    createAppointment,
    getAppointmentCounts,
    updateAppointment,
    deleteAppointment
}
