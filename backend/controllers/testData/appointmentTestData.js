const {testIDs} = require('./mongooseIDs')
    
// Dates to use for testing data
const currentDate = new Date()
const today = currentDate.toLocaleDateString()
const tomorrow = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1).toLocaleDateString()
const yesterday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1).toLocaleDateString()
const nextWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7).toLocaleDateString()

// Test appointments array
const testAppointments = [{
    date: tomorrow,
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "1234567890",
    emailAddress: "testemail1@email.com",
    vehicle: {
        vehicleYear:2011,
        vehicleMake:"Audi",
        vehicleModel: "A3",
        vehicleVIN: "Not Stored"
    },
    description: "Oil Change",
    reviewed: true,
    __v: 0,
    _id: testIDs[0]
},
{
    date: today,
    firstName: "Jane",
    lastName: "Doe",
    phoneNumber: "9876543210",
    emailAddress: "testemail2@email.com",
    vehicle: {
        vehicleYear:2010,
        vehicleMake:"BMW",
        vehicleModel: "X5",
        vehicleVIN: "Not Stored"
    },
    description: "Inspection",
    reviewed: false,
    __v: 0,
    _id: testIDs[1]
}]

// Single test appointment
const newAppt = {
    date: today,
    firstName: "Dan",
    lastName: "Doughnut",
    phoneNumber: "6549873210",
    emailAddress: "testemail3@email.com",
    vehicle: {
        vehicleYear:2000,
        vehicleMake:"BMW",
        vehicleModel: "330xi",
        vehicleVIN: "Not Stored"
    },
    description: "Brakes"
}

// List of fields required for new appointments
const newApptReqFields = [
    'date',
    'firstName',
    'lastName',
    'phoneNumber',
    'vehicle',
    'description'
]

module.exports = {
    today,
    tomorrow,
    yesterday,
    nextWeek,
    testAppointments,
    newAppt,
    newApptReqFields
}