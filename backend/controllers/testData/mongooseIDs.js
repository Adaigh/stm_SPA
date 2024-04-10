const mongoose = require('mongoose')

// IDs to use for testing data
const testIDs = [
    new mongoose.Types.ObjectId().toHexString(),
    new mongoose.Types.ObjectId().toHexString(),
    new mongoose.Types.ObjectId().toHexString(),
    new mongoose.Types.ObjectId().toHexString(),
    new mongoose.Types.ObjectId().toHexString()
]
const invalidID = '6615bc734f633db05275c581Z'
const badID = new mongoose.Types.ObjectId().toHexString()

module.exports = {
    testIDs,
    invalidID,
    badID
}