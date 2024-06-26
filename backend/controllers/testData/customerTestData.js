const {testIDs, newID} = require('./testUtils')

// Test Customers array
const testCustomers = [
    {
        __v: 0,
        _id: testIDs[0],
        emailAddress: "test1@example.com",
        firstName: "John",
        lastName: "Doe",
        phoneNumbers: ["1234567890"],
        vehicles: [
            {
                vehicleYear: 2020,
                vehicleMake: "BMW",
                vehicleModel: "X5",
                vehicleVIN: "Not Stored"
            }
        ]
    },
    {
        __v: 0,
        _id: testIDs[1],
        emailAddress: "test2@example.com",
        firstName: "Michael",
        lastName: "Jordan",
        phoneNumbers: ["2223334444"],
        vehicles: [
            {
                vehicleYear: 2018,
                vehicleMake: "Audi",
                vehicleModel: "A6",
                vehicleVIN: "Not Stored"
            }
        ]
    },
    {
        __v: 0,
        _id: testIDs[2],
        emailAddress: "test3@example.com",
        firstName: "Sarah",
        lastName: "Palin",
        phoneNumbers: ["3334445555"],
        vehicles: [
            {
                vehicleYear: 2010,
                vehicleMake: "BMW",
                vehicleModel: "320i",
                vehicleVIN: "Not Stored"
            }
        ]
    },
    {
        __v: 0,
        _id: testIDs[3],
        emailAddress: "test4@example.com",
        firstName: "Jane",
        lastName: "Smith",
        phoneNumbers: ["1112223333"],
        vehicles: [
            {
                vehicleYear: 2015,
                vehicleMake: "VW",
                vehicleModel: "Golf",
                vehicleVIN: "Not Stored"
            }
       ]
    },   
    {
        __v: 0,
        _id: testIDs[4],
        emailAddress: "test5@example.com",
        firstName: "Mark",
        lastName: "Twain",
        phoneNumbers: ["4445556666"],
        vehicles: [
            {
                vehicleYear: 2008,
                vehicleMake: "VW",
                vehicleModel: "Jetta",
                vehicleVIN: "Not Stored"
            }
        ]
    }
]
 
 const newCustomer = {
    emailAddress: "test6@example.com",
    firstName: "Steve",
    lastName: "Twain",
    phoneNumbers: ["4445556666"],
    vehicles: [
        {
            vehicleYear: 2009,
            vehicleMake: "VW",
            vehicleModel: "Beetle",
            vehicleVIN: "Not Stored"
        }
    ]
}

const newCustomerDupEmail = {
    emailAddress: "test6@example.com",
    firstName: "Mark",
    lastName: "Cuban",
    phoneNumbers: ["4445556666"],
    vehicles: [
        {
            vehicleYear: 2009,
            vehicleMake: "VW",
            vehicleModel: "Beetle",
            vehicleVIN: "Not Stored"
        }
    ]
}

const newCustomerNoEmail = [
    {
        firstName: "Steve",
        lastName: "Smith",
        phoneNumbers: ["4445556666"],
        vehicles: [
            {
                vehicleYear: 2009,
                vehicleMake: "VW",
                vehicleModel: "Beetle",
                vehicleVIN: "Not Stored"
            }
        ]
    },
    {
        firstName: "Jake",
        lastName: "Smith",
        phoneNumbers: ["4445556666"],
        vehicles: [
            {
                vehicleYear: 2009,
                vehicleMake: "VW",
                vehicleModel: "Beetle",
                vehicleVIN: "Not Stored"
            }
        ]
    }
]

const customerReqFields = [
    "firstName",
    "lastName",
    "phoneNumbers",
    "vehicles"
]

 module.exports = {
    testCustomers,
    newCustomer,
    newCustomerDupEmail,
    newCustomerNoEmail,
    customerReqFields
 }