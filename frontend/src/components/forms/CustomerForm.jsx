import './styles/CustomerForm.css'
import { useState } from "react"

// Context
import { useCustomersContext } from "../../hooks/useCustomersContext"
import { useAuthContext } from "../../hooks/useAuthContext"

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

const CustomerForm = () => {

    const {dispatch} = useCustomersContext()
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
    const {user} = useAuthContext()

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Check for missing fields
        let missing = []
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

        // Create new customer object
        let newCustomer = {
            firstName,
            lastName,
            phoneNumbers: [phoneNumber],
            emailAddress: emailAddress ? emailAddress+' (SHOP)' : null,
            vehicles: [{
                vehicleYear: vYear,
                vehicleMake: vMake,
                vehicleModel: vModel,
                vehicleVIN: vin ? vin : "Not Stored"
            }]
        }
        
        // Capitalize names
        newCustomer.firstName = newCustomer.firstName.charAt(0).toUpperCase() + newCustomer.firstName.slice(1)
        newCustomer.lastName = newCustomer.lastName.charAt(0).toUpperCase() + newCustomer.lastName.slice(1)

        // Fetch the new user details
        const response = await fetch('/api/customers', {
            method: 'POST',
            body: JSON.stringify(newCustomer),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.webToken}`
            }
        })
        const json = await response.json()

        // Handle response errors
        if(!response.ok) {
            setError(json.error)
        }
        if(response.ok) {
            setFirstName('')
            setLastName('')
            setPhoneNumber('')
            setEmailAddress('')
            setVYear('')
            setVMake('')
            setVModel('')
            setVin('')
            setError(null)
            setEmptyFields([])
            dispatch({type: 'CREATE_CUSTOMER', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
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
                    changeFn={(e)=> setVin(e.target.value)}
                    />

            <button> Add User </button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default CustomerForm