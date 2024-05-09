import { useState } from "react";
import { capitalize } from "../../hooks/useUtils";
import './styles/GuestAppointmentForm.css'

import { api_url } from "../../production_variables";
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
        let missing = []
        if(!firstName) missing.push('firstName')
        if(!lastName) missing.push('lastName')
        if(!phoneNumber) missing.push('phoneNumber')
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
        }

        const newVin = vin ? vin.toUpperCase() : "Not Stored"

        // Create new appointment object
        const newAppt = {
            date: date.toLocaleDateString(),
            firstName: capitalize(firstName),
            lastName: capitalize(lastName),
            phoneNumber: phoneNumber,
            emailAddress: emailAddress,
            vehicle: {
                vehicleYear: vYear,
                vehicleMake: vMake,
                vehicleModel: vModel,
                vehicleVIN: newVin
            },
            description: description
        }

        // Fetch new appointment details
        const response = await fetch(`${api_url}/api/appointments`, {
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
            setVin('')
            setDescription('')

            setError(null)
            setEmptyFields([])
            
            closeForm()
            window.alert("New appointment requested!")
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
            <form id="guest-app-req-form" className="guest-request" onSubmit={handleSubmit}>
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

            <div className="controls">
                <button form="guest-app-req-form" className="submit">Submit Request</button>
                <button className="cancel"
                    onClick={(e) => {
                        e.preventDefault()
                        closeForm()
                    }}>Cancel</button>
            </div>

            {error && <div className="error">{error}</div>}
        </div>
    )
}

export default GuestAppointmentForm