import { useState } from "react";
import './styles/GuestAppointmentForm.css'

const GuestAppointmentForm = (date) => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [vYear, setVYear] = useState('')
    const [vMake, setVMake] = useState('')
    const [vModel, setVModel] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const missing = []
        
        if(!firstName) missing.push('firstName')
        if(!lastName) missing.push('lastName')

        if(!vYear) missing.push('vehicleYear')
        if(!vMake) missing.push('vehicleMake')
        if(!vModel) missing.push('vehicleModel')
        if(missing.length > 0){
            setError("All required fields must be filled")
            setEmptyFields(missing)
            return
        } else {
            setError(null)
            setEmptyFields([])
            console.log("All fields filled! fetching...")
            console.log(date)
        }
    }

    return (
        <form className="appointment-form" onSubmit={handleSubmit}>
            <h2>TESTING</h2>
            <label>First Name: *</label>
            <input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                className={emptyFields && emptyFields.includes('firstName') ? 'error' : ''}
            />

            <label>Last Name: *</label>
            <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className={emptyFields && emptyFields.includes('lastName') ? 'error' : ''}
            />

            <label>Phone Number: *</label>
            <input
                type="text"
                onInput={(e) => setPhoneNumber(e.target.value)}
                pattern='[0-9]{10}'
                placeholder='xxxxxxxxxx'
                title="xxxxxxxxxx"
                required='required'
                value={phoneNumber}
                className={emptyFields.includes('phoneNumber') ? 'error' : ''}
            />

            <label>Email Address:</label>
            <input
                type="text"
                onChange={(e) => setEmailAddress(e.target.value)}
                value={emailAddress}
            />

            <label>Vehicle Year: *</label>
            <input
                type="number"
                onChange={(e) => setVYear(e.target.value)}
                value={vYear}
                min="1800"
                max="2500"
                className={emptyFields.includes('vehicleYear') ? 'error' : ''}
            />
            
            <label>Vehicle Make: *</label>
            <select 
                defaultValue={''}
                onChange={(e) => setVMake(e.target.value)}
                className={emptyFields.includes('vehicleMake') ? 'error' : ''}>
                <option value="" disabled>--Please choose vehicle make--</option>
                <option value="Audi">Audi</option>
                <option value="VW">VW</option>
                <option value="BMW">BMW</option>
            </select>

            <label>Vehicle Model: *</label>
            <input
                type="text"
                onChange={(e)=> setVModel(e.target.value)}
                value={vModel}
                className={emptyFields.includes('vehicleModel') ? 'error' : ''}
            />
            <button>Submit Request</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default GuestAppointmentForm