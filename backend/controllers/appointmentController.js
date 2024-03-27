const Appointment = require('../models/appointmentModel')
const mongoose = require('mongoose')

const getAppointments = async (req,res) => {
    const appointments = await Appointment.find({}).sort({date:1})
    res.status(200).json(appointments)
}

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

const createAppointment = async (req,res) => {
    const {date, userInformation, vehicle, shortDescription, longDescription} = req.body
    
    // TODO: VALIDATION CHECKS
    
    let appointment = await Appointment.findOne({date, userInformation, vehicle})
    if(appointment) {
        return res.status(409).json({message: "Appointment already exists"})
    }

    try {
        appointment = await Appointment.create({date, userInformation, vehicle, shortDescription, longDescription})
        res.status(200).json(appointment)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

const getMonth = async (req,res) => {
    const currentDate = new Date();
    const nexMonth = new Date()
    nexMonth.setMonth(currentDate.getMonth()+1)
    console.log(currentDate, nexMonth)
    const appointments = await Appointment.find()
        .where('date')
        .gte(currentDate)
        .lte(nexMonth)
        .populate('userInformation')

    if(!appointments){
        res.status(400).json({error: "GET MONTH ERROR"})
    }
    res.status(200).json(appointments)
}

const getAppointmentCounts = async (req,res) => {
    
    const appointments = await Appointment.aggregate([
        { $group: { _id: { day: '$date' }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
        { $project: { _id: 0, day: '$_id.day', count: '$count' } }
    ])
    
    if(!appointments){
        res.status(404).json({error: "No response from DB"})
    }

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
    getMonth,
    getAppointmentCounts
}
