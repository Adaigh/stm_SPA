const mongoose = require('mongoose')

const today = new Date()
const dates = [
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4).toLocaleDateString(),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3).toLocaleDateString(),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2).toLocaleDateString(),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toLocaleDateString(),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 0).toLocaleDateString()
]


// IDs to use for testing data
const testIDs = [
    new mongoose.Types.ObjectId().toHexString(),
    new mongoose.Types.ObjectId().toHexString(),
    new mongoose.Types.ObjectId().toHexString(),
    new mongoose.Types.ObjectId().toHexString(),
    new mongoose.Types.ObjectId().toHexString()
]
const invalidID = '6615bc734f633db05275c581Z'

const newID = () => new mongoose.Types.ObjectId().toHexString()

module.exports = {
    dates,
    testIDs,
    invalidID,
    newID
}