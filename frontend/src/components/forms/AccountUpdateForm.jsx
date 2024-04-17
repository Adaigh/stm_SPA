import { useEffect, useState } from "react";
import './styles/AccountUpdateForm.css'

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

const formatPhone = (num) => {
    return num.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
}

const AccountUpdateForm = ({currentUser}) => {

    const [firstName, setFirstName] = useState(currentUser.firstName)
    const [lastName, setLastName] = useState(currentUser.lastName)
    const [phoneNumbers, setPhoneNumbers] = useState(currentUser.phoneNumbers)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [vehicles, setVehicles] = useState(currentUser.vehicles)
    const [vYear, setVYear] = useState('')
    const [vMake, setVMake] = useState('Audi')
    const [vModel, setVModel] = useState('')
    const [vin, setVin] = useState('')
    const [emptyFields, setEmptyFields] = useState([])

    const [addPhone, setAddPhone] = useState(false)
    const [addVehicle, setAddVehicle] = useState(false)

    return (
        <form className="acct-update-form">
            <FirstName
                val={firstName}
                error={emptyFields && emptyFields.includes('firstName')}
                changeFn={(e) => setFirstName(e.target.value)}
                />
            <LastName
                val={lastName}
                error={emptyFields && emptyFields.includes('lastName')}
                changeFn={(e) => setFirstName(e.target.value)}
                />
            <label>Phone Numbers:</label>
            {phoneNumbers.map((num, index)=> {
                return(
                    <div key={index}>
                        {formatPhone(num)}
                        <span className="material-symbols-outlined delete">delete</span>
                    </div>
                )
            })}
            {!addPhone && <button onClick={() => setAddPhone(true)}>Add Phone Number</button>}
            {addPhone && 
                <div className="new-phone">
                    <input
                        type="text"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        pattern='[0-9]{10}'
                        placeholder='xxxxxxxxxx'
                        title="xxxxxxxxxx"
                        value={phoneNumber}
                        className={emptyFields && emptyFields.includes('phoneNumber') ? 'error' : ''}
                    />
                    <span className="material-symbols-outlined check" onClick={() => setAddPhone(false)}>check</span>
                </div>
            }

            <label>Vehicles:</label>
            {vehicles.map((entry, index)=> {
                return(
                    <div key={index}>
                        {entry.vehicleYear} {entry.vehicleMake} {entry.vehicleModel}
                        <span className="material-symbols-outlined delete">delete</span>
                    </div>
                )
            })}
            {!addVehicle && <button onClick={(e) => {e.preventDefault();setAddVehicle(true)}}>Add New Vehicle</button>}
            {addVehicle && 
                <div className="new-vehicle">

                    <VehicleYear
                        val={vYear}
                        error={emptyFields && emptyFields.includes('vehicleYear')}
                        changeFn={(e) => setVYear(e.target.value)}
                        />

                    <VehicleMake
                        error={emptyFields && emptyFields.includes('vehicleMake')}
                        changeFn={(e) => setVMake(e.target.value)}
                        />

                    <VehicleModel 
                        val={vModel}
                        error={emptyFields && emptyFields.includes('vehicleModel')}
                        changeFn={(e) => setVModel(e.target.value)}
                        />

                    <VinEntry
                        val={vin}
                        changeFn={(e)=> setVin(e.target.value)}
                        />
                    <button onClick={(e) => {e.preventDefault(); setAddVehicle(false)}}>
                    <span className="material-symbols-outlined check">check</span>
                    </button>
                </div>
            }
        </form>
    )
}

export default AccountUpdateForm