const {testIDs} = require('./testUtils')

const testAccounts = [
    {
        user: "user1@example.com",
        password: "password123",
        access: 1,
        __v: 0,
        _id: testIDs[0]
    },
    {
        user: "user2@example.com",
        password: "password456",
        access: 2,
        __v: 0,
        _id: testIDs[1]
    },
    {
        user: "user3@example.com",
        password: "password789",
        access: 3,
        __v: 0,
        _id: testIDs[2]
    },
    {
        user: "user4@example.com",
        password: "password101112",
        access: 0,
        __v: 0,
        _id: testIDs[3]
    },
    {
        user: "user5@example.com",
        password: "password131415",
        access: 1,
        __v: 0,
        _id: testIDs[4]
    }
]

const newAccount = {
    user: "user6@example.com",
    password: "password131415",
    access: 1
}


module.exports = {
    testAccounts,
    newAccount
 }