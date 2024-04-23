import { useEffect, useState } from "react";
import './styles/CustomerAppointmentForm.css'

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

const CustomerAppointmentForm = ({date, customer, closeForm}) => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [selectedVehicle, setSelectedVehicle] = useState('')
    const [vYear, setVYear] = useState('')
    const [vMake, setVMake] = useState('')
    const [vModel, setVModel] = useState('')
    const [vin, setVin] = useState('')
    const [description, setDescription] = useState('') 

    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const [enterVehicle, setEnterVehicle] = useState(false)

    useEffect(() => {
        setFirstName(customer.firstName)
        setLastName(customer.lastName)
        setPhoneNumber(customer.phoneNumbers[0])
        setEmailAddress(customer.emailAddress)
        setSelectedVehicle(customer.vehicles[0])
    }, [
        customer.firstName,
        customer.lastName,
        customer.phoneNumbers,
        customer.emailAddress,
        customer.vehicles
    ])

    const toggleEnterVehicle = (e) => {
        e.preventDefault()
        enterVehicle ? setEnterVehicle(false) : setEnterVehicle(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Check for missing fields
        const missing = []
        if(!firstName) missing.push('firstName')
        if(!lastName) missing.push('lastName')
        if(!phoneNumber) missing.push('phoneNumber')
        if(!enterVehicle){
            if(!selectedVehicle) missing.push('selectedVehicle')
        } else {
            if(!vYear) missing.push('vehicleYear')
            if(!vMake) missing.push('vehicleMake')
            if(!vModel) missing.push('vehicleModel')
        }
        if(!description) missing.push('description')
        if(missing.length > 0){
            setError("All required fields must be filled")
            setEmptyFields(missing)
            return
        } else {
            setError(null)
            setEmptyFields([])
        }

        let newAppt = {}
        newAppt['date'] = date.toLocaleDateString()
        newAppt['firstName'] = firstName
        newAppt['lastName'] = lastName
        newAppt['phoneNumber'] = phoneNumber
        newAppt['emailAddress'] = emailAddress
        if(!enterVehicle){
            newAppt['vehicle'] = selectedVehicle
        } else {
            newAppt['vehicle'] = {
                vehicleYear: vYear,
                vehicleMake: vMake,
                vehicleModel: vModel,
                vehicleVIN: vin ? vin : 'Not Stored'
            }
        }
        newAppt['description'] = description

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
            setFirstName(customer.firstName)
            setLastName(customer.lastName)
            setPhoneNumber(customer.phoneNumbers[0])
            setEmailAddress(customer.emailAddress)
            setSelectedVehicle(customer.vehicles[0])
            setVYear('')
            setVMake('')
            setVModel('')
            setVin('')
            setDescription('')

            setError(null)
            setEmptyFields([])

            setEnterVehicle(false)
            closeForm()
            window.alert("New appointment requested!")
        }
    }

    return(
        <div className="cust-app-req">
            <span 
                className="material-symbols-outlined close" 
                onClick={() => closeForm()}
                >close</span>

            <h2>Request Appointment</h2>
            <h3>{date.toDateString()}</h3>
            <form className="cust-request" onSubmit={handleSubmit}>
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
                    {!enterVehicle && <>
                        <label>Select Vehicle:</label>
                        <select
                            onChange={(e)=> {
                                console.log(e.target.value);
                                setSelectedVehicle(customer.vehicles[e.target.value]
                                )}}
                            className={(emptyFields && emptyFields.includes('selectedVehicle')) ? 'error' : ''}>
                            {customer.vehicles.map((vehicle, index) => {
                                return (<option
                                    key={index}
                                    value={index}>
                                        {vehicle.vehicleYear} {vehicle.vehicleModel}
                                    </option>
                                )
                            })}
                        </select>
                    </>}


                    {enterVehicle && <>
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
                    </>}

                    <div className="or"> - OR - </div>

                    <button onClick={toggleEnterVehicle}>
                        {!enterVehicle && <>Enter New Vehicle</>}
                        {enterVehicle && <>Select Existing Vehicle</>}
                    </button>

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
            <button className="submit" onClick={handleSubmit}>Submit Request</button>
            {error && <div className="error">{error}</div>}
        </div>
    )

}

export default CustomerAppointmentForm