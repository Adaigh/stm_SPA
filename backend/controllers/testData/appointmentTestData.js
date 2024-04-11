const { dates, testIDs } = require('./testUtils')

// Test appointments array
const testAppointments = [{
    date: dates[0],
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
    date: dates[1],
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
},
{
    date: dates[2],
    firstName: "Michael",
    lastName: "Brown",
    phoneNumber: "0987654321",
    emailAddress: "testemail4@email.com",
    vehicle: {
        vehicleYear:2015,
        vehicleMake:"Ford",
        vehicleModel: "F150",
        vehicleVIN: "Not Stored"
    },
    description: "Tire Rotation",
    reviewed: false,
    __v: 0,
    _id: testIDs[2]
},
{
    date: dates[3],
    firstName: "Michael",
    lastName: "Jackson",
    phoneNumber: "0987654321",
    emailAddress: "testemail3@email.com",
    vehicle: {
        vehicleYear:2015,
        vehicleMake:"Tesla",
        vehicleModel: "Model S",
        vehicleVIN: "Not Stored"
    },
    description: "Alignment Check",
    reviewed: false,
    __v: 0,
    _id: testIDs[3]
},
{
    date: dates[4],
    firstName: "Jennifer",
    lastName: "Aniston",
    phoneNumber: "1112223333",
    emailAddress: "testemail4@email.com",
    vehicle: {
        vehicleYear:2008,
        vehicleMake:"Honda",
        vehicleModel: "Civic",
        vehicleVIN: "Not Stored"
    },
    description: "Brake Fluid Check",
    reviewed: true,
    __v: 0,
    _id: testIDs[4]
}]

// Single test appointment
const newAppt = {
    date: dates[4],
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
    testAppointments,
    newAppt,
    newApptReqFields
}