import { useState } from "react";

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

import { capitalize } from "../../hooks/useUtils";
import { useRequestAppointment } from "../../hooks/api/useAppointmentsApi";

import './styles/CustomerAppointmentForm.css'

const CustomerAppointmentForm = ({ date, customer, closeForm }) => {

    const [firstName, setFirstName] = useState(customer.firstName)
    const [lastName, setLastName] = useState(customer.lastName)
    const [phoneNumber, setPhoneNumber] = useState(customer.phoneNumbers[0])
    const [emailAddress, setEmailAddress] = useState(customer.emailAddress)
    const [selectedVehicle, setSelectedVehicle] = useState(customer.vehicles[0])
    const [vYear, setVYear] = useState('')
    const [vMake, setVMake] = useState('')
    const [vModel, setVModel] = useState('')
    const [vin, setVin] = useState('')
    const [description, setDescription] = useState('')

    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const [enterVehicle, setEnterVehicle] = useState(false)
    const { requestApp } = useRequestAppointment()

    const toggleEnterVehicle = (e) => {
        e.preventDefault()
        enterVehicle ? setEnterVehicle(false) : setEnterVehicle(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Check for missing fields
        const missing = []
        if (!firstName) missing.push('firstName')
        if (!lastName) missing.push('lastName')
        if (!phoneNumber) missing.push('phoneNumber')
        if (!enterVehicle) {
            if (!selectedVehicle) missing.push('selectedVehicle')
        } else {
            if (!vYear) missing.push('vehicleYear')
            if (!vMake) missing.push('vehicleMake')
            if (!vModel) missing.push('vehicleModel')
        }
        if (!description) missing.push('description')
        if (missing.length > 0) {
            setError("All required fields must be filled")
            setEmptyFields(missing)
            return
        } else {
            setError(null)
            setEmptyFields([])
        }

        const newVin = vin ? vin.toUpperCase() : "Not Stored"

        let newVehicle = selectedVehicle
        if (enterVehicle) {
            newVehicle = {
                vehicleYear: vYear,
                vehicleMake: vMake,
                vehicleModel: vModel,
                vehicleVIN: newVin
            }
        }

        let newAppt = {
            date: date.toLocaleDateString(),
            firstName: capitalize(firstName),
            lastName: capitalize(lastName),
            phoneNumber: phoneNumber,
            emailAddress: emailAddress,
            vehicle: newVehicle,
            description: description
        }

        const { response, json } = await requestApp(newAppt)

        // Handle response errors
        if (!response.ok) {
            setError(json.error)
        } else {
            closeForm(true)
        }
    }

    return (
        <div className="cust-app-req">
            <span
                className="material-symbols-outlined close"
                onClick={() => closeForm(false)}
            >close</span>

            <h2>Request Appointment</h2>
            <h3>{date.toDateString()}</h3>
            <form id="customer-appointment-form" className="cust-request" onSubmit={handleSubmit}>
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
                            onChange={(e) => {
                                setSelectedVehicle(customer.vehicles[e.target.value]
                                )
                            }}
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
                            changeFn={(e) => setVin(e.target.value)}
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
                        changeFn={(e) => setDescription(e.target.value)}
                    />
                </div>
            </form>
            <div className="controls">
                <button form="customer-appointment-form" className="submit">Submit Request</button>
                <button className="cancel"
                    onClick={(e) => {
                        e.preventDefault()
                        closeForm(false)
                    }}>Cancel</button>
            </div>
            {error && <div className="error">{error}</div>}
        </div>
    )

}

export default CustomerAppointmentForm