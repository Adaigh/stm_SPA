import { useState } from "react";
import './styles/GuestAppointmentForm.css'

// Form inputs
import {
    FirstName,
    LastName,
    PhoneNumber,
    EmailAddress,
    VehicleYear,
    VehicleMake,
    VehicleModel,
    VinEntry,
    Description
} from "./labeledInputs"

const GuestAppointmentForm = ({date, closeForm}) => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [vYear, setVYear] = useState('')
    const [vMake, setVMake] = useState('')
    const [vModel, setVModel] = useState('')
    const [vin, setVin] = useState('')
    const [description, setDescription] = useState('') 
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Check for missing fields
        const missing = []
        if(!firstName) missing.push('firstName')
        if(!lastName) missing.push('lastName')
        if(!vYear) missing.push('vehicleYear')
        if(!vMake) missing.push('vehicleMake')
        if(!vModel) missing.push('vehicleModel')
        if(!description) missing.push('description')
        if(missing.length > 0){
            setError("All required fields must be filled")
            setEmptyFields(missing)
            return
        } else {
            setError(null)
            setEmptyFields([])
            console.log("All fields filled! fetching...")
        }

        // Create new appointment object
        let newAppt = {
            date: date.toLocaleDateString(),
            firstName,
            lastName,
            phoneNumber,
            emailAddress,
            vehicle: {vehicleYear: vYear, vehicleMake: vMake, vehicleModel: vModel},
            description
        }

        // Fetch new appointment details
        const response = await fetch('/api/appointments', {
            method: 'POST',
            body: JSON.stringify(newAppt),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json()

        // Handle response errors
        if(!response.ok){
            setError(json.error)
        } else {
            setFirstName('')
            setLastName('')
            setPhoneNumber('')
            setEmailAddress('')
            setVYear('')
            setVMake('')
            setVModel('')
            setError(null)
            setEmptyFields([])
            closeForm()
            window.confirm("New appointment requested!")
        }
    }

    return (
        <div className="guest-app-req">
            <span 
                className="material-symbols-outlined close" 
                onClick={() => closeForm()}
                >close</span>

            <h2>Request Appointment: </h2>
            <h3>{date.toDateString()}</h3>
            <form className="guest-request" onSubmit={handleSubmit}>
                <div>
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
                </div>

                <div>
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
                        changeFn={(e)=> setVin(e.target.value)}
                        />
                </div>

                <div>
                    <Description
                        val={description}
                        req={true}
                        error={emptyFields && emptyFields.includes('description')}
                        changeFn={(e)=> setDescription(e.target.value)}
                        />
                </div>

            </form>
            <button onClick={handleSubmit}>Submit Request</button>
            {error && <div className="error">{error}</div>}
        </div>
    )
}

export default GuestAppointmentForm