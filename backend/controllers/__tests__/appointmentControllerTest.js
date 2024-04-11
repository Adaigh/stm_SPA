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

// Testing data
const {
    dates,
    testIDs,
    invalidID,
    newID
} = require('../testData/testUtils')

const {
    testAppointments,
    newAppt,
    newApptReqFields
} = require('../testData/appointmentTestData')

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
            // Execute
            await getAppointments(req,res)

            // Verify Data
            expect(res.statusCode).toBe(200)
            const data = res._getJSONData()
            expect(data).toEqual(testAppointments)
        })
    })

    // Get single Appointment
    describe('getAppointment', () => {
        it("Should get the first appointment", async () => {
            // Setup
            req.params = {id: testIDs[0]}
            
            // Execute
            await getAppointment(req, res)

            // Verify Data
            expect(res.statusCode).toBe(200)
            const data = res._getJSONData()
            expect(data).toEqual(testAppointments[0])
        })
        it("Should get the second appointment", async () => {
            // Setup
            req.params = {id: testIDs[1]}
            
            // Execute
            await getAppointment(req, res)

            // Verify Data
            expect(res.statusCode).toBe(200)
            const data = res._getJSONData()
            expect(data).toEqual(testAppointments[1])
        })
        it("Should fail if no ID", async () => {
            // Execute
            await getAppointment(req, res)

            // Verify Data
            expect(res.statusCode).toBe(400)
            const data = res._getJSONData()
            expect(data.error).toEqual("Invalid request data")
        })
        it("Should fail if invalid ID ", async () => {
            // Setup
            req.params = {id: invalidID}
            
            // Execute
            await getAppointment(req, res)

            // Verify Data
            expect(res.statusCode).toBe(400)
            const data = res._getJSONData()
            expect(data.error).toEqual("Invalid request data")
        })
        it("Should fail if ID does not exist ", async () => {
            // Setup
            req.params = {id: newID()}
            
            // Execute
            await getAppointment(req, res)

            // Verify Data
            expect(res.statusCode).toBe(404)
            const data = res._getJSONData()
            expect(data.error).toEqual("Appointment not found")
        })
    })

    // Create an appointment
    describe('createAppointment', () => {
        it('Should create a new appointment', async () => {
            // Setup
            req.body = newAppt
            
            // Execute
            await createAppointment(req,res)

            // Verify Data
            expect(res.statusCode).toBe(200)
            const data = res._getJSONData()
            
            // Verify and remove auto-generated data
            expect(mongoose.Types.ObjectId.isValid(data._id)).toBe(true)
            expect(data.__v).toBe(0)
            expect(data.reviewed).toBe(false)
            delete data._id
            delete data.__v
            delete data.reviewed

            expect(data).toEqual(newAppt)
        })
        it("Should fail for missing fields", async () => {
            for (let k of newApptReqFields) {
                // Setup
                const appt = structuredClone(newAppt)
                delete appt[k]
                req.body = appt
                res = httpMocks.createResponse()
            
                // Execute
                await createAppointment(req, res)

                // Verify Data
                expect(res.statusCode).toBe(400)
                const data = res._getJSONData()
                expect(data.error).toEqual("Missing required fields")
            }
        })
        it("Should fail for existing appointments", async () => {
            // Setup
            req.body = testAppointments[0]
            
            // Execute
            await createAppointment(req, res)

            // Verify Data
            expect(res.statusCode).toBe(409)
            const data = res._getJSONData()
            expect(data.error).toEqual("Appointment already exists")
        })
    })

    describe('getAppointmentCounts', () => {
        it("Should return reviewed counts", async () => {
            // Setup
            let expected = {[dates[0]]:1, [dates[4]]: 1}
            
            // Execute
            await getAppointmentCounts(req, res)

            // Verify Data
            expect(res.statusCode).toBe(200)
            const data = res._getJSONData()
            expect(data).toEqual(expected)
        })
    })
})
