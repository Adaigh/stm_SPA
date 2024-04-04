import { useState } from "react";
import './styles/GuestAppointmentForm.css'

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        
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

        let newAppt = {
            date: date.toLocaleDateString(),
            firstName,
            lastName,
            phoneNumber,
            emailAddress,
            vehicle: {vehicleYear: vYear, vehicleMake: vMake, vehicleModel: vModel},
            description
        }
        const response = await fetch('/api/appointments', {
            method: 'POST',
            body: JSON.stringify(newAppt),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json()

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
        <div className="app-req">
        <span 
            className="material-symbols-outlined close" 
            onClick={() => closeForm()}
            >close</span>

        <h2>Request Appointment: </h2>
        <h3>{date.toDateString()}</h3>
        <form onSubmit={handleSubmit}>
            <div>
                <label className="required">First Name: <span className="required">*</span></label>
                <input
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    className={emptyFields && emptyFields.includes('firstName') ? 'error' : ''}
                />

                <label className="required">Last Name: <span className="required">*</span></label>
                <input
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    className={emptyFields && emptyFields.includes('lastName') ? 'error' : ''}
                />

                <label className="required">Phone Number: <span className="required">*</span></label>
                <input
                    type="text"
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
            </div>

            <div>
                <label>Vehicle Year: <span className="required">*</span></label>
                <input
                    type="number"
                    onChange={(e) => setVYear(e.target.value)}
                    value={vYear}
                    min="1800"
                    max="2500"
                    className={emptyFields.includes('vehicleYear') ? 'error' : ''}
                />
                
                <label>Vehicle Make: <span className="required">*</span></label>
                <select 
                    defaultValue={''}
                    onChange={(e) => setVMake(e.target.value)}
                    className={emptyFields.includes('vehicleMake') ? 'error' : ''}>
                    <option value="" disabled>--Please choose vehicle make--</option>
                    <option value="Audi">Audi</option>
                    <option value="VW">VW</option>
                    <option value="BMW">BMW</option>
                </select>

                <label>Vehicle Model: <span className="required">*</span></label>
                <input
                    type="text"
                    onChange={(e)=> setVModel(e.target.value)}
                    value={vModel}
                    className={emptyFields.includes('vehicleModel') ? 'error' : ''}
                />

                <label>VIN:</label>
                <input
                    type="text"
                    onChange={(e)=> setVin(e.target.value)}
                    value={vin}
                />
            </div>

            <div>
            <label>Reason for Appointment: <span className="required">*</span></label>
            <textarea
                rows={10}
                cols={50}
                onChange={e => setDescription(e.target.value)}
                value={description}
                maxLength={2000}
                className={emptyFields.includes('description') ? 'error' : ''}
                />
            </div>

        </form>
        <button onClick={handleSubmit}>Submit Request</button>
        {error && <div className="error">{error}</div>}
        </div>
    )
}

export default GuestAppointmentForm