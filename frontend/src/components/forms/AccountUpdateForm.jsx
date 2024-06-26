import { useState } from "react";

import {
    FirstName,
    LastName,
    VehicleMake,
    VehicleModel,
    VehicleYear,
    VinEntry,
} from './labeledInputs'

import { formatPhone } from "../../hooks/useUtils";
import { useDetailsContext } from "../../hooks/useDetailsContext";
import { useUpdateCustomer } from "../../hooks/api/useCustomersApi";

import './styles/AccountUpdateForm.css'

const AccountUpdateForm = ({ closeForm }) => {

    const { details, dispatch } = useDetailsContext()

    const [firstName, setFirstName] = useState(details.user.firstName)
    const [lastName, setLastName] = useState(details.user.lastName)
    const [phoneNumbers, setPhoneNumbers] = useState([...details.user.phoneNumbers])
    const [phoneNumber, setPhoneNumber] = useState('')
    const [vehicles, setVehicles] = useState([...details.user.vehicles])
    const [vYear, setVYear] = useState('')
    const [vMake, setVMake] = useState('')
    const [vModel, setVModel] = useState('')
    const [vin, setVin] = useState('')

    const [emptyFields, setEmptyFields] = useState([])
    const [error, setError] = useState('')

    const [addPhone, setAddPhone] = useState(false)
    const [validPhone, setValidPhone] = useState(true)
    const [addVehicle, setAddVehicle] = useState(false)

    const { updateCustomer } = useUpdateCustomer()

    const vehicleFieldsToReset = [
        setVYear,
        setVMake,
        setVModel,
        setVin
    ]


    const addNewPhoneNumber = (e) => {
        e.preventDefault()

        if (phoneNumber === '') {
            setValidPhone(true)
            setAddPhone(false)
            return
        }

        if (phoneNumbers.includes(phoneNumber)) {
            setValidPhone(true)
            setPhoneNumber('')
            setAddPhone(false)
            setError("Phone number already stored")
            return
        }

        if (/[0-9]{10}/.test(phoneNumber)) {
            setPhoneNumbers([...phoneNumbers, phoneNumber])
            setValidPhone(true)
            setPhoneNumber('')
            setAddPhone(false)
        } else {
            setValidPhone(false)
            setError("Phone number be 10 numbers")
        }
    }

    const cancelPhone = (e) => {
        e.preventDefault()
        setPhoneNumber('')
        setAddPhone(false)
    }

    const removePhoneNumber = (e, num) => {
        e.preventDefault()
        setPhoneNumbers(phoneNumbers.filter((number) => {
            return num !== number
        }))
    }

    const addNewVehicle = (e) => {
        e.preventDefault()

        if (!vYear && !vMake && !vModel) {
            setEmptyFields([])
            setAddVehicle(false)
            return
        }

        let missing = []
        if (!vYear) missing.push('vehicleYear')
        if (!vMake) missing.push('vehicleMake')
        if (!vModel) missing.push('vehicleModel')
        if (missing.length > 0) {
            setEmptyFields(missing)
            setError('Missing vehicle data')
            return
        }

        const newVin = vin ? vin.toUpperCase() : "Not Stored"

        const newVehicle = {
            vehicleYear: parseInt(vYear),
            vehicleMake: vMake,
            vehicleModel: vModel,
            vehicleVIN: newVin
        }

        for (let entry of vehicles) {
            if (JSON.stringify(entry) === JSON.stringify(newVehicle)) {
                setError("Vehicle already stored")
                vehicleFieldsToReset.forEach(fn => fn(''))
                setEmptyFields([])
                setAddVehicle(false)
                return
            }
        }

        setVehicles([...vehicles, newVehicle])
        vehicleFieldsToReset.forEach(fn => fn(''))
        setAddVehicle(false)
        setEmptyFields([])
        setError('')

    }

    const cancelVehicle = (e) => {
        e.preventDefault()
        vehicleFieldsToReset.forEach(fn => fn(''))
        setAddVehicle(false)
    }

    const removeVehicle = (e, vehicle) => {
        e.preventDefault()
        setVehicles(vehicles.filter((veh) => {
            return vehicle !== veh
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (addPhone) {
            setError("Please confirm new phone number")
            return
        }
        if (addVehicle) {
            setError("Please confirm new vehicle info")
            return
        }

        let missing = []
        if (!firstName) missing.push('firstName')
        if (!lastName) missing.push('lastName')
        if (missing.length > 0) {
            setError("Fields cannot be empty")
            setEmptyFields(missing)
            return
        }

        let updatedInfo = { ...details.user }
        updatedInfo.firstName = firstName
        updatedInfo.lastName = lastName
        updatedInfo.phoneNumbers = phoneNumbers
        updatedInfo.vehicles = vehicles

        if (JSON.stringify(updatedInfo) === JSON.stringify(details.user)) {
            setError('')
            closeForm()
            return
        }

        const { response, json } = await updateCustomer(updatedInfo, details.user)

        if (response.ok) {
            dispatch({ type: 'UPDATE_DETAILS', payload: updatedInfo })
            closeForm()
            return
        } else {
            setError(json.error)
        }

    }

    return (
        <form id="customer-account-update-form" className="acct-update-form" onSubmit={handleSubmit}>
            <h1>Edit Account Information:</h1>
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
            <label>Phone Numbers:</label>
            {phoneNumbers.map((num, index) => {
                return (
                    <div key={index}>
                        {formatPhone(num)}
                        {phoneNumbers.length > 1 && <span className="material-symbols-outlined delete" onClick={(e) => removePhoneNumber(e, num)}>delete</span>}
                    </div>
                )
            })}
            {!addPhone && <button className='edit' onClick={(e) => { e.preventDefault(); setAddPhone(true) }}>Add Phone Number</button>}
            {addPhone &&
                <div className="new-phone">
                    <input
                        type="text"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        pattern='[0-9]{10}'
                        placeholder='xxxxxxxxxx'
                        title="xxxxxxxxxx"
                        value={phoneNumber}
                        className={validPhone ? '' : 'error'}
                    />
                    <div>
                        <button className="submit" onClick={addNewPhoneNumber}>Confirm</button>
                        <button className="cancel" onClick={cancelPhone}>Cancel</button>
                    </div>
                </div>
            }

            <label>Vehicles:</label>
            {vehicles.map((entry, index) => {
                return (
                    <div key={index}>
                        {entry.vehicleYear} {entry.vehicleMake} {entry.vehicleModel}&emsp;(VIN: {entry.vehicleVIN})
                        {vehicles.length > 1 &&
                            <span
                                className="material-symbols-outlined delete"
                                onClick={(e) => removeVehicle(e, entry)}>delete</span>
                        }
                    </div>
                )
            })}
            {!addVehicle && <button className='edit' onClick={(e) => { e.preventDefault(); setAddVehicle(true) }}>Add New Vehicle</button>}
            {addVehicle &&
                <div className="new-vehicle">

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
                    <div />
                    <div>
                        <button className="submit" onClick={addNewVehicle}>Confirm</button>
                        <button className="cancel" onClick={cancelVehicle}>Cancel</button>
                    </div>
                </div>
            }
            {!addPhone && !addVehicle && <div className="controls">
                <button className="submit"
                    form="customer-account-update-form">Submit Changes</button>
                <button className="cancel"
                    onClick={(e) => { e.preventDefault(); closeForm() }}>Cancel</button>
            </div>}
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default AccountUpdateForm