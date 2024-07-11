const validator = require('validator')

const isValidDate = (date) => {
    numbers = date.split('/')
    if (numbers.length !== 3) return false
    for (let num of numbers) {
        if (num.length > 4 || num.length < 1) return false
        if (!validator.isNumeric(num)) return false
    }
    return true
}

const isValidName = (name) => {
    if (name.length > 50) return false
    if (!validator.isAlpha(name)) return false
    return true
}

const isValidPhoneNumber = (phoneNumber) => {
    if (phoneNumber.length !== 10) return false
    if (!validator.isNumeric(phoneNumber)) return false
    return true
}

const isValidEmail = (email) => {
    return validator.isEmail(email)
}

const isValidDescription = (desc) => {
    return desc.length < 3000
}

const isValidYear = (year) => {
    if (typeof year !== 'number') return false
    if (year < 1800) return false
    if (year > 2500) return false
    return true
}

const isValidVIN = (vin) => {
    if(vin.length > 17) return false
    let testString = vin.replace(' ', '')
    if(!validator.isAlphanumeric(testString)) return false
    return true
}

module.exports = {
    isValidDate,
    isValidName,
    isValidPhoneNumber,
    isValidEmail,
    isValidDescription,
    isValidYear,
    isValidVIN
}
