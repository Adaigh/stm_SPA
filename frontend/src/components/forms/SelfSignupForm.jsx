import { useState } from 'react'
import { useSelfSignup } from '../../hooks/useSelfSignup'
import { capitalize } from '../../hooks/useUtils'
import './styles/SelfSignupForm.css'

// Form inputs
import {
    EmailAddress,
    Password,
    FirstName,
    LastName,
    PhoneNumber,
    VehicleMake,
    VehicleModel,
    VehicleYear,
    VinEntry,
} from './labeledInputs'

const SelfSignupForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [vYear, setVYear] = useState('')
    const [vMake, setVMake] = useState('Audi')
    const [vModel, setVModel] = useState('')
    const [emptyFields, setEmptyFields] = useState([])
    const [vin, setVin] = useState('')

    const {selfSignup, isLoading, error, setError} = useSelfSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        let missing = []
        if(!email) missing.push('emailAddress')
        if(!password) missing.push('password')
        if(!firstName) missing.push('firstName')
        if(!lastName) missing.push('lastName')
        if(!phoneNumber) missing.push('phoneNumber')
        if(!vYear) missing.push('vehicleYear')
        if(!vMake) missing.push('vehicleMake')
        if(!vModel) missing.push('vehicleModel')
        if(missing.length > 0){
            setError("All (*) fields are required")
            setEmptyFields(missing)
            return
        } else {
            setError(null)
            setEmptyFields([])
        }

        const newVin = vin ? vin.toUpperCase() : "Not Stored"

        const newCustomer = {
            firstName: capitalize(firstName),
            lastName: capitalize(lastName),
            emailAddress: email,
            phoneNumbers: [phoneNumber],
            vehicles: [{
                vehicleYear: vYear,
                vehicleMake: vMake,
                vehicleModel: vModel,
                vehicleVIN: newVin
            }]
        }

        await selfSignup(email, password, newCustomer)
    }

    return (
        <form className="self-signup" onSubmit={handleSubmit}>
            <h3>Sign Up:</h3>

            <EmailAddress
                val={email}
                req={true}
                error={emptyFields && emptyFields.includes('emailAddress')}
                changeFn={(e) => setEmail(e.target.value)}
                />

            <Password
                val={password}
                req={true}
                error={emptyFields && emptyFields.includes('password')}
                changeFn={(e) => setPassword(e.target.value)}
                />

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

            <VehicleYear
                val={vYear}
                req={true}
                error={emptyFields && emptyFields.includes('vehicleYear')}
                changeFn={(e) => setVYear(e.target.value)}
                />
            
            <VehicleMake
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

            <button disabled={isLoading}>Submit</button>
            {error && <div className="error">{error}</div>}

        </form>
    )
}

export default SelfSignupForm