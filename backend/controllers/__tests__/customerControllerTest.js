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

// Testing data
const {
    testIDs,
    invalidID,
    badID,
} = require('../testData/mongooseIDs')
const {
    testCustomers
 } = require("../testData/customerTestData")

 // Test suite parameters
let req = {}
let res = {}
let mdb = null
let conn = null

describe('getCustomers', () => {

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
  
    it('should return a list of customers', async () => {
      await getCustomers(req, res);
      const data = res._getJSONData()
      expect(res.statusCode).toBe(200)
      expect(data).toStrictEqual(testCustomers);
    });
  });