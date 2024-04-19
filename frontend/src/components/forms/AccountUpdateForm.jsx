import { useState } from "react";
import './styles/AccountUpdateForm.css'

import {
    FirstName,
    LastName,
    VehicleMake,
    VehicleModel,
    VehicleYear,
    VinEntry,
} from './labeledInputs'
import { useAuthContext } from "../../hooks/useAuthContext";

const formatPhone = (num) => {
    return num.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
}

const AccountUpdateForm = ({currentUser, closeForm}) => {

    const [firstName, setFirstName] = useState(currentUser.firstName)
    const [lastName, setLastName] = useState(currentUser.lastName)
    const [phoneNumbers, setPhoneNumbers] = useState([...currentUser.phoneNumbers])
    const [phoneNumber, setPhoneNumber] = useState('')
    const [vehicles, setVehicles] = useState([...currentUser.vehicles])
    const [vYear, setVYear] = useState('')
    const [vMake, setVMake] = useState('')
    const [vModel, setVModel] = useState('')
    const [vin, setVin] = useState('')

    const [emptyFields, setEmptyFields] = useState([])
    const [error, setError] = useState('')

    const [addPhone, setAddPhone] = useState(false)
    const [validPhone, setValidPhone] = useState(true)
    const [addVehicle, setAddVehicle] = useState(false)

    const {user} = useAuthContext()


    const addNewPhoneNumber = (e) => {
        e.preventDefault()

        if(phoneNumber === ''){
            setValidPhone(true)
            setAddPhone(false)
            return
        }

        if(phoneNumbers.includes(phoneNumber)) {
            setValidPhone(true)
            setPhoneNumber('')
            setAddPhone(false)
            setError("Phone number already stored")
            return
        }

        if(/[0-9]{10}/.test(phoneNumber)) {
            setPhoneNumbers([...phoneNumbers, phoneNumber])
            setValidPhone(true)
            setPhoneNumber('')
            setAddPhone(false)
        } else {
            setValidPhone(false)
            setError("Phone number be 10 numbers")
        }
    }

    const removePhoneNumber = (e, num) => {
        e.preventDefault()
        setPhoneNumbers(phoneNumbers.filter((number) => {
            return num !== number
        }))
    }

    const addNewVehicle = (e) => {
        e.preventDefault()

        if(!vYear && !vMake && !vModel){
            setEmptyFields([])
            setAddVehicle(false)
            return
        }

        let missing = []
        if(!vYear) missing.push('vehicleYear')
        if(!vMake) missing.push('vehicleMake')
        if(!vModel) missing.push('vehicleModel')
        if(missing.length > 0) {
            setEmptyFields(missing)
            setError('Missing vehicle data')
            return
        }

        let newVehicle = {
            vehicleYear: parseInt(vYear),
            vehicleMake: vMake,
            vehicleModel: vModel,
            vehicleVIN: vin ? vin : 'Not Stored'
        }

        for(let entry of vehicles){
            if(entry.vehicleYear === newVehicle.vehicleYear &&
                entry.vehicleMake === newVehicle.vehicleMake &&
                entry.vehicleModel === newVehicle.vehicleModel &&
                entry.vehicleVIN === newVehicle.vehicleVIN) {
                    setError("Vehicle already stored")
                    setVYear('')
                    setVMake('')
                    setVModel('')
                    setVin('')
                    setEmptyFields([])
                    setAddVehicle(false)
                    return
                }
        }

        setVehicles([...vehicles, newVehicle])
        setVYear('')
        setVMake('')
        setVModel('')
        setVin('')
        setAddVehicle(false)
        setEmptyFields([])
        setError('')

    }

    const removeVehicle = (e, vehicle) => {
        e.preventDefault()
        setVehicles(vehicles.filter((veh) => {
            return vehicle !== veh
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(addPhone) {
            setError("Please confirm new phone number")
            return
        }
        if(addVehicle) {
            setError("Please confirm new vehicle info")
            return
        }
        
        let updatedInfo = {...currentUser}
        updatedInfo.firstName = firstName
        updatedInfo.lastName = lastName
        updatedInfo.phoneNumbers = phoneNumbers
        updatedInfo.vehicles = vehicles

        if (JSON.stringify(updatedInfo) === JSON.stringify(currentUser)) {
            setError('')
            closeForm()
            return
        }

        let response = await fetch('/api/customers/' + currentUser._id, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.webToken}`},
            body: JSON.stringify(updatedInfo)
        })

        console.log(response)

        if(response.ok){
            window.alert("Updates Successful!")
            setError('')
            return
        } else {
            setError('UPDATES FAILED: Please contact the shop for help.')
        }
        
    }

    return (
        <form className="acct-update-form">
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
            {phoneNumbers.map((num, index)=> {
                return(
                    <div key={index}>
                        {formatPhone(num)}
                        {phoneNumbers.length > 1 && <span className="material-symbols-outlined delete" onClick={(e) => removePhoneNumber(e, num)}>delete</span>}
                    </div>
                )
            })}
            {!addPhone && <button onClick={(e) => {e.preventDefault();setAddPhone(true)}}>Add Phone Number</button>}
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
                    <span className="material-symbols-outlined check" onClick={addNewPhoneNumber}>check</span>
                </div>
            }

            <label>Vehicles:</label>
            {vehicles.map((entry, index)=> {
                return(
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
            {!addVehicle && <button onClick={(e) => {e.preventDefault();setAddVehicle(true)}}>Add New Vehicle</button>}
            {addVehicle && 
                <div className="new-vehicle">

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
                    <button onClick={addNewVehicle}>
                    <span className="material-symbols-outlined check">check</span>
                    </button>
                </div>
            }
            <div className="controls">
                <button onClick={handleSubmit}>Submit Changes</button>
                <button onClick={(e)=> {e.preventDefault(); closeForm()}}>Cancel</button>
            </div>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default AccountUpdateForm