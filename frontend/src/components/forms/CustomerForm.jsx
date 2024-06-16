import { useState } from "react"

// Form inputs
import {
    EmailAddress,
    FirstName,
    LastName,
    PhoneNumber,
    VehicleMake,
    VehicleModel,
    VehicleYear,
    VinEntry,
} from './labeledInputs'

import { capitalize } from '../../hooks/useUtils'
import { useCreateCustomer } from '../../hooks/api/useCustomersApi'

import './styles/CustomerForm.css'

const CustomerForm = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [vYear, setVYear] = useState('')
    const [vMake, setVMake] = useState('')
    const [vModel, setVModel] = useState('')
    const [vin, setVin] = useState('')

    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const { createCustomer } = useCreateCustomer()

    const fieldsToReset = [
        setFirstName,
        setLastName,
        setPhoneNumber,
        setEmailAddress,
        setVYear,
        setVMake,
        setVModel,
        setVin
    ]

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Check for missing fields
        let missing = []
        if (!firstName) missing.push('firstName')
        if (!lastName) missing.push('lastName')
        if (!phoneNumber) missing.push('phoneNumber')
        if (!vYear) missing.push('vehicleYear')
        if (!vMake) missing.push('vehicleMake')
        if (!vModel) missing.push('vehicleModel')
        if (missing.length > 0) {
            setError("All (*) fields are required")
            setEmptyFields(missing)
            return
        } else {
            setError(null)
            setEmptyFields([])
        }

        const newEmail = emailAddress ? emailAddress + ' (SHOP)' : null
        const newVin = vin ? vin.toUpperCase() : "Not Stored"

        // Create new customer object
        const newCustomer = {
            firstName: capitalize(firstName),
            lastName: capitalize(lastName),
            phoneNumbers: [phoneNumber],
            emailAddress: newEmail,
            vehicles: [{
                vehicleYear: vYear,
                vehicleMake: vMake,
                vehicleModel: vModel,
                vehicleVIN: newVin
            }]
        }

        const { response, json } = await createCustomer(newCustomer)

        // Handle response errors
        if (!response.ok) {
            setError(json.error)
        } else {
            fieldsToReset.forEach(fn => fn(''))
            setError(null)
            setEmptyFields([])
        }
    }

    return (
        <form className="customer" onSubmit={handleSubmit}>
            <FirstName
                val={firstName}
                req={true}
                error={emptyFields && emptyFields.includes('firstName')}
                changeFn={(e) => setFirstName(e.target.value)}
            />

            <LastName
                val={lastName}
                req={true}
                error={emptyFields && emptyFields.includes('lastName')}
                changeFn={(e) => setLastName(e.target.value)}
            />

            <PhoneNumber
                val={phoneNumber}
                req={true}
                error={emptyFields && emptyFields.includes('phoneNumber')}
                changeFn={(e) => setPhoneNumber(e.target.value)}
            />

            <EmailAddress
                val={emailAddress}
                req={false}
                changeFn={(e) => setEmailAddress(e.target.value)}
            />

            <VehicleYear
                val={vYear}
                req={true}
                error={emptyFields && emptyFields.includes('vehicleYear')}
                changeFn={(e) => setVYear(e.target.value)}
            />

            <VehicleMake
                val={vMake}
                req={true}
                error={emptyFields && emptyFields.includes('vehicleMake')}
                changeFn={(e) => setVMake(e.target.value)}
            />

            <VehicleModel
                val={vModel}
                req={true}
                error={emptyFields && emptyFields.includes('vehicleModel')}
                changeFn={(e) => setVModel(e.target.value)}
            />

            <VinEntry
                val={vin}
                changeFn={(e) => setVin(e.target.value)}
            />

            <button> Add User </button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default CustomerForm