import { useEffect, useState } from "react";
import { capitalize } from "../../hooks/useUtils";
import './styles/AddAppointmentForm.css'
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
import { useCustomersContext } from "../../hooks/useCustomersContext";
import { useFetchCustomers } from "../../hooks/api/useFetchCustomers";
import { useCreateAppointment } from "../../hooks/api/useCreateAppointment";

const AddAppointmentForm = ({date, closeForm}) => {
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

    const [selectedCustomer, setSelectedCustomer] = useState(null)
    const [selectedVehicle, setSelectedVehicle] = useState('')

    const {customers} = useCustomersContext()
    const {fetchCustomers} = useFetchCustomers()
    const {submitApp} = useCreateAppointment()

    useEffect(() => {
        if(!customers) fetchCustomers()
        // eslint-disable-next-line
    },[customers])

    const setCustomerInfo = (e) => {
        e.preventDefault()
        setSelectedVehicle('')
        const cust = customers[e.target.value]
        setSelectedCustomer(cust)
        setFirstName(cust.firstName)
        setLastName(cust.lastName)
        setPhoneNumber(cust.phoneNumbers[0])
        if(cust.emailAddress.includes('@')) {
            let displayEmail = cust.emailAddress
            if(displayEmail.includes('SHOP'))
            displayEmail = displayEmail.split(' ')[0]
            setEmailAddress(displayEmail)
        }
    }

    const setVehicleInfo = (e) => {
        e.preventDefault()
        const vehicle = selectedCustomer.vehicles[e.target.value]
        setSelectedVehicle(vehicle)
        setVYear(vehicle.vehicleYear)
        setVMake(vehicle.vehicleMake)
        setVModel(vehicle.vehicleModel)
        if(vehicle.vehicleVIN !== 'Not Stored') setVin(vehicle.vehicleVIN)
    }

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
            description: description,
            reviewed: true
        }

        const {response, json} = await submitApp(newAppt)

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
            
            setSelectedCustomer(null)

            closeForm()
            window.alert("New appointment requested!")
        }
    }

    return (
        <div className="add-app">
            <h2>New Appointment: </h2>
            <h3>{date.toDateString()}</h3>

            
            <div className="cust-select">
                <hr/>
                <h2>Select Customer</h2>
                <select
                defaultValue={''}
                onChange={setCustomerInfo}>
                    <option value="" disabled>--Select Customer By Name--</option>
                    {customers && customers.map((customer, index) => {
                        return(
                            <option
                                key={index}
                                value={index}>
                                    {customer.firstName} {customer.lastName}
                                </option>
                        )
                    })}
                </select>

                {selectedCustomer &&
                    <select
                    value={selectedVehicle}
                    onChange={setVehicleInfo}>
                        <option value="">--Select Customer Vehicle--</option>
                        {selectedCustomer.vehicles && selectedCustomer.vehicles.map((vehicle, index) => {
                            return (
                                <option
                                    key={index}
                                    value={index}>
                                        {vehicle.vehicleYear} {vehicle.vehicleModel}
                                    </option>
                            )
                        })}
                    </select>
                }

                <hr/>
            </div>

            <form id="add-app-form" className="add-appointment" onSubmit={handleSubmit}>
                <div className="entry-column">
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

                <div className="entry-column">
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

                <div className="entry-column">
                    <Description
                        val={description}
                        req={true}
                        error={emptyFields && emptyFields.includes('description')}
                        changeFn={(e)=> setDescription(e.target.value)}
                        />
                </div>

            </form>

            <div className="controls">
                <button form="add-app-form" className="submit">Submit Request</button>
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

export default AddAppointmentForm