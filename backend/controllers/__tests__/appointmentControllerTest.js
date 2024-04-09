// Testing Tools
require('jest')
const httpMocks = require('node-mocks-http')
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')

// Modules under test
const {
    getAppointments,
    getAppointment,
    createAppointment,
    getAppointmentCounts
} = require('../appointmentController')
const Appointment = require('../../models/appointmentModel')


// IDs to use for testing data
const testIDs = [
    new mongoose.Types.ObjectId().toHexString(),
    new mongoose.Types.ObjectId().toHexString()
]
const invalidID = '6615bc734f633db05275c581Z'
const badID = new mongoose.Types.ObjectId().toHexString()
    
// Dates to use for testing data
const currentDate = new Date()
const today = currentDate.toLocaleDateString()
const tomorrow = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1).toLocaleDateString()
const yesterday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1).toLocaleDateString()
const nextWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7).toLocaleDateString()
const testAppointments = [{
    date: today,
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
    date: tomorrow,
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

// Test suite parameters
let req = {}
let res = {}
let mdb = null
let conn = null

describe('APPOINTMENT TESTS', () => {

    // Connect to mock DB and insert test appointments
    beforeAll( async () => {
        mdb = await MongoMemoryServer.create()
        conn = await mongoose.connect(mdb.getUri())
        await Appointment.insertMany(testAppointments)
    })
    
    // Shut down mock DB
    afterAll( async () => {
        mongoose.connection.close()
        .then(() => mdb.stop())
    })
    
    // Set up empty req and res objects
    beforeEach(() => {
        req = httpMocks.createRequest()
        res = httpMocks.createResponse()
    })
    
    // GET multiple Appointments
    describe('getAppointments', () => {
        it('Should get all appointments', async () => {
            await getAppointments(req,res)
            const data = res._getJSONData()
            expect(data).toStrictEqual(testAppointments)
        })
    })

    // Get single Appointment
    describe('getAppointment', () => {
        it("Should get the first appointment", async () => {
            req.params = {id: testIDs[0]}
            await getAppointment(req, res)
            const data = res._getJSONData()
            expect(data).toStrictEqual(testAppointments[0])
        })
        it("Should get the second appointment", async () => {
            req.params = {id: testIDs[1]}
            await getAppointment(req, res)
            const data = res._getJSONData()
            expect(data).toStrictEqual(testAppointments[1])
        })
        it("Should fail if no ID", async () => {
            await getAppointment(req, res)
            const data = res._getJSONData()
            expect(data).toStrictEqual({"error":"Appointment not found"})
        })
        it("Should fail if invalid ID ", async () => {
            req.params = {id: invalidID}
            await getAppointment(req, res)
            const data = res._getJSONData()
            expect(data).toStrictEqual({"error":"Appointment not found"})
        })
        it("Should fail if ID does not exist ", async () => {
            req.params = {id: badID}
            await getAppointment(req, res)
            const data = res._getJSONData()
            expect(data).toStrictEqual({"error":"Appointment not found"})
        })
    })

    // Create an appointment
    describe('createAppointment', () => {
        it('Should create a new appointment', async () => {
            req.body = newAppt
            await createAppointment(req,res)
            const data = res._getJSONData()
            
            // Verify and remove auto-generated data
            expect(mongoose.Types.ObjectId.isValid(data._id)).toBe(true)
            expect(data.__v).toBe(0)
            expect(data.reviewed).toBe(false)
            delete data._id
            delete data.__v
            delete data.reviewed

            expect(data).toStrictEqual(newAppt)
        })
        it("Should fail for missing fields", async () => {
            for (let k of newApptReqFields) {
                const appt = structuredClone(newAppt)
                delete appt[k]
                req.body = appt
                res = httpMocks.createResponse()
                await createAppointment(req, res)
                expect(res.statusCode).toBe(400)
                const data = res._getJSONData()
                expect(data).toStrictEqual({"error": "Missing required fields"})
            }
        })
        it("Should fail for existing appointments", async () => {
            req.body = testAppointments[0]
            await createAppointment(req, res)
            expect(res.statusCode).toBe(409)
            const data = res._getJSONData()
            expect(data).toStrictEqual({"error": "Appointment already exists"})
        })
    })

    describe('getAppointmentCounts', () => {
        it("Should return reviewed counts", async () => {
            await getAppointmentCounts(req, res)
            const data = res._getJSONData()
            let expected = {}
            expected[today] = 1
            expect(data).toStrictEqual(expected)
        })
    })
})
