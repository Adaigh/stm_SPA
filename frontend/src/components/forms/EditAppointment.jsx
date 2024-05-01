import { useEffect, useState } from "react"
import {
    FirstName,
    LastName,
    PhoneNumber,
    VehicleYear,
    VehicleMake,
    VehicleModel,
    VinEntry,
    Description
} from "./labeledInputs"

import './styles/EditAppointment.css'
import { capitalize } from "../../hooks/useUtils"
import { useUpdateAppointment } from "../../hooks/api/useUpdateAppointment"

const EditAppointmentForm = ({appointment, closeForm}) => {
    
    const [date,setDate] = useState(appointment.date)
    const [firstName, setFirstName] = useState(appointment.firstName)
    const [lastName, setLastName] = useState(appointment.lastName)
    const [phone, setPhone] = useState(appointment.phoneNumber)
    const [vYear, setVYear] = useState(appointment.vehicle.vehicleYear)
    const [vMake, setVMake] = useState(appointment.vehicle.vehicleMake)
    const [vModel, setVModel] = useState(appointment.vehicle.vehicleModel)
    const [vin, setVin] = useState(appointment.vehicle.vehicleVIN)
    const [description, setDescription] = useState(appointment.description) 
    
    const [formattedDate, setFormattedDate] = useState([])
    const [emptyFields, setEmptyFields] = useState([])
    
    const {updateApp, error, setError} = useUpdateAppointment()

    const changeDate = (e) => {
        e.preventDefault()
        let selected = new Date(e.target.value)
        selected.setDate(selected.getDate()+1)
        setDate(selected.toLocaleDateString())
    }

    useEffect(() => {
        if(vin === "Not Stored") setVin('')
    },[vin])

    useEffect(()=> {
        const reformat = () => {
            let reformatted = new Date(date)
            setFormattedDate(reformatted.toISOString().split('T')[0])
        }
        reformat()
    }, [date])

    const handleSubmit = async (e) => {
        e.preventDefault()

        let missing = [];
        if(!firstName) missing.push('firstName')
        if(!lastName) missing.push('lastName')
        if(!phone) missing.push('phoneNumber')
        if(!vYear) missing.push('vehicleYear')
        if(!vMake) missing.push('vehicleMake')
        if(!vModel) missing.push('vehicleModel')
        if(!description) missing.push('description')
        if(missing.length > 0){
            setError("Fields cannot be empty")
            setEmptyFields(missing)
            return
        }

        let updatedAppointment = {...appointment}
        updatedAppointment.date = date
        updatedAppointment.firstName = capitalize(firstName)
        updatedAppointment.lastName = capitalize(lastName)
        updatedAppointment.phoneNumber = phone
        updatedAppointment.vehicle = {
            vehicleYear: vYear,
            vehicleMake: vMake,
            vehicleModel: vModel,
            vehicleVIN: vin
        }
        updatedAppointment.description = description

        if (JSON.stringify(updatedAppointment) === JSON.stringify(appointment)) {
            setError('')
            closeForm()
            return
        }
        
        await updateApp(appointment, updatedAppointment, closeForm)
        
    }

    return (
        <div className="edit-appt-form">

            <h1>Test Form</h1>
            <form id="edit-appointment-form" className="edit-appt" onSubmit={handleSubmit}>

                <div>
                    <label>Date: </label>
                    <input
                        type="date"
                        defaultValue={formattedDate}
                        onChange={changeDate}></input>

                    <FirstName
                        val={firstName}
                        error={emptyFields && emptyFields.includes('firstName')}
                        changeFn={(e) => setFirstName(e.target.value)}
                        />

                    <LastName
                        val={lastName}
                        error={emptyFields && emptyFields.includes('lastName')}
                        changeFn={(e) => setLastName(e.target.value)}
                        />

                    <PhoneNumber
                        val={phone}
                        error={emptyFields && emptyFields.includes('phoneNumber')}
                        changeFn={(e) => setPhone(e.target.value)}
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
                <button className="submit"
                    form="edit-appointment-form">Submit Changes</button>
                <button className="cancel"
                    onClick={(e)=> {
                        e.preventDefault()
                        closeForm()
                    }}>Cancel</button>
            </div>
            {error && <div className="error">{error}</div>}
        </div>
    )
}

export default EditAppointmentForm