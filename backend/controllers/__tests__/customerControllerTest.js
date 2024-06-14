// Testing Tools
require('jest')
const httpMocks = require('node-mocks-http')
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')

// Modules under test
const {
    getCustomers,
    getCustomer,
    createCustomer,
    deleteCustomer,
    updateCustomer
} = require('../customerController')

const Customer = require('../../models/customerModel')
const UserAccount = require('../../models/userAccountModel')

// Testing data
const {
    invalidID,
    newID
} = require('../testData/testUtils')

const {
    testCustomers,
    newCustomer,
    newCustomerDupEmail,
    newCustomerNoEmail,
    customerReqFields,
 } = require("../testData/customerTestData")

const {newAccount} = require('../testData/userAccountTestData')


 // Test suite parameters
let req = {}
let res = {}
let mdb = null
let conn = null

describe('CUSTOMERS TESTS', () => {

    // Connect to mock DB and insert test appointments
    beforeAll( async () => {
        mdb = await MongoMemoryServer.create()
        conn = await mongoose.connect(mdb.getUri())
        await Customer.insertMany(testCustomers)
    })
  
   // Shut down mock DB
    afterAll( async () => {
        mongoose.disconnect()
        .then(() => mdb.stop())
    })

    // Set up empty req and res objects
    beforeEach(() => {
        req = httpMocks.createRequest()
        res = httpMocks.createResponse()
    })
  
    describe('getCustomers', () => {
        it('Should return a list of customers', async () => {
            // Execute
            await getCustomers(req, res);
            
            // Verify Data
            expect(res.statusCode).toBe(200)
            const data = res._getJSONData()
            expect(data).toEqual(testCustomers);
          })
    })

    describe('getCustomer', () => {
        // Setup a single test account
        const testAccount = structuredClone(newAccount)
        testAccount.user = testCustomers[0].emailAddress
        testAccount.__v = 0
        testAccount._id = newID()
        UserAccount.create(testAccount)

        it('Should fail without an ID', async() => {
            // Setup
            req.user = {}

            // Execute
            await getCustomer(req, res)
            
            // Verify Data
            expect(res.statusCode).toBe(400)
            const data = res._getJSONData()
            expect(data.error).toEqual("Invalid request data")
        })
        it('Should fail with an invalid ID', async () => {
            // Setup
            req.user = {_id: invalidID}
            
            // Execute
            await getCustomer(req, res)
            
            // Verify Data
            expect(res.statusCode).toBe(400)
            const data = res._getJSONData()
            expect(data.error).toEqual("Invalid request ID")
        })
        it('Should fail with a bad ID', async() => {
            // Setup
            req.user = {_id: newID()}
            
            // Execute
            await getCustomer(req, res)
            
            // Verify Data
            expect(res.statusCode).toBe(404)
            const data = res._getJSONData()
            expect(data.error).toEqual("Customer not found")
        })
        it('Should get the full details of a customer', async () => {
            // Setup
            const populatedAccount = structuredClone(testAccount)
            populatedAccount.user = testCustomers[0]
            req.user = {_id: testAccount._id}
            
            // Execute
            await getCustomer(req, res)
            
            // Verify Data
            expect(res.statusCode).toBe(200)
            const data = res._getJSONData()
            expect(data).toEqual(populatedAccount)
        })
    })

    describe('createCustomer', () => {
        it('Should store a customer', async () => {
            // Setup
            req.body = newCustomer
            
            // Execute
            await createCustomer(req, res);
            
            // Verify Data
            expect(res.statusCode).toBe(200)
            const data = res._getJSONData()

            // Verify and remove auto-generated data
            expect(mongoose.Types.ObjectId.isValid(data._id)).toBe(true)
            expect(data.__v).toBe(0)
            delete data._id
            delete data.__v
            
            expect(data).toEqual(newCustomer)
        })
        it('Should fail for missing fields', async () => {
            for(let f of customerReqFields) {
                // Setup
                const cust = structuredClone(newCustomer)
                delete cust[f]
                req.body = cust
                res = httpMocks.createResponse()
            
                // Execute
                await createCustomer(req, res)
                
                // Verify Data
                expect(res.statusCode).toBe(400)
                const data = res._getJSONData()
                expect(data).toEqual({"error": "Missing required data"})
            }
        })
        it('Should fail for duplicated emails', async () => {
            // Setup
            req.body = newCustomerDupEmail
            
            // Execute
            await createCustomer(req,res)
            
            // Verify Data
            expect(res.statusCode).toBe(409)
            const data = res._getJSONData()
            expect(data.error).toEqual("Customer data already exists")
        })
        it('Should store a customer without an email address', async () => {
            // Setup
            let cust = structuredClone(newCustomerNoEmail[0])
            req.body = cust
            cust['emailAddress'] = `${cust.firstName} ${cust.lastName} - (SHOP)`
            
            // Execute
            await createCustomer(req, res);
            
            // Verify Data
            expect(res.statusCode).toBe(200)
            const data = res._getJSONData()
            
            // Verify and remove auto-generated data
            expect(mongoose.Types.ObjectId.isValid(data._id)).toBe(true)
            expect(data.__v).toBe(0)
            delete data._id
            delete data.__v

            expect(data).toEqual(cust)

        })
        it('Should store a second customer without an email address', async () => {
            // Setup
            let cust = structuredClone(newCustomerNoEmail[1])
            req.body = cust
            cust['emailAddress'] = `${cust.firstName} ${cust.lastName} - (SHOP)`
            
            // Execute
            await createCustomer(req, res);
            
            // Verify Data
            expect(res.statusCode).toBe(200)
            const data = res._getJSONData()
            
            // Verify and remove auto-generated data
            expect(mongoose.Types.ObjectId.isValid(data._id)).toBe(true)
            expect(data.__v).toBe(0)
            delete data._id
            delete data.__v

            expect(data).toEqual(cust)

        })
        it('Should fail for duplicated names, no email', async () => {
            // Setup
            req.body = structuredClone(newCustomerNoEmail[0])
            
            // Execute
            await createCustomer(req,res)
            
            // Verify Data
            expect(res.statusCode).toBe(409)
            const data = res._getJSONData()
            expect(data.error).toEqual("Customer data already exists")
        })
    })
    describe('deleteCustomer', () => {
        it('Should delete a customer', async () => {
            // Setup
            req.params = {id: testCustomers[4]._id}

            // Execute
            await deleteCustomer(req, res)

            // Verify Data
            expect(res.statusCode).toBe(200)
            const data = res._getJSONData()
            expect(data).toEqual(testCustomers[4])

        })
        it('Should fail for no ID', async () => {
            // Execute
            await deleteCustomer(req, res)

            // Verify Data
            expect(res.statusCode).toBe(400)
            const data = res._getJSONData()
            expect(data.error).toEqual("Invalid request data")
        })
        it('Should fail for invalid ID', async () => {
            // Setup
            req.params = {id: invalidID}

            // Execute
            await deleteCustomer(req, res)

            // Verify Data
            expect(res.statusCode).toBe(400)
            const data = res._getJSONData()
            expect(data.error).toEqual("Invalid request data")
        })
        it('Should fail for a bad ID', async () => {
            // Setup
            req.params = {id: newID()}

            // Execute
            await deleteCustomer(req, res)

            // Verify Data
            expect(res.statusCode).toBe(404)
            const data = res._getJSONData()
            expect(data.error).toEqual("Customer not found")
        })
    })

    describe('updateCustomer', () => {
        it('Should update a customer', async () => {
            // Setup
            let updatedCustomer = structuredClone(testCustomers[3])
            updatedCustomer['emailAddress'] = 'updated@example.com'
            updatedCustomer['phoneNumbers'] = ['9876543210']
            updatedCustomer['vehicles'].push({
                vehicleYear: 2020,
                vehicleMake: "VW",
                vehicleModel: "Atlas",
                vehicleVin: "Not Stored"
            })
            req.params = {id: updatedCustomer._id}
            req.body = updatedCustomer

            // Execute
            await updateCustomer(req, res)
            
            // Verify data
            expect(res.statusCode).toBe(200)
            const data = res._getJSONData()
            expect(data.CustomerData).toEqual(testCustomers[3])
            expect(data.updates).toEqual(updatedCustomer)
        })
        it('Should fail for no ID', async () => {
            // Execute
            await updateCustomer(req, res)

            // Verify Data
            expect(res.statusCode).toBe(400)
            const data = res._getJSONData()
            expect(data.error).toEqual("Invalid request data")
        })
        it('Should fail for invalid ID', async () => {
            // Setup
            req.params = {id: invalidID}

            // Execute
            await updateCustomer(req, res)

            // Verify Data
            expect(res.statusCode).toBe(400)
            const data = res._getJSONData()
            expect(data.error).toEqual("Invalid request data")
        })
        it('Should fail for a bad ID', async () => {
            // Setup
            req.params = {id: newID()}

            // Execute
            await updateCustomer(req, res)

            // Verify Data
            expect(res.statusCode).toBe(404)
            const data = res._getJSONData()
            expect(data.error).toEqual("Customer not found")
        })
    })
  })