import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext"

const AppointmentForm = (date) => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [vYear, setVYear] = useState('')
    const [vMake, setVMake] = useState('Audi')
    const [vModel, setVModel] = useState('')
    const [emptyFields, setEmptyFields] = useState([])
    const {user} = useAuthContext()

    useEffect(() => {

        const fetchUserData = async () => {
            if(user) {
                const response = await fetch(`/api/customers/details`, {
                    headers: {
                        'Authorization': `Bearer ${user.webToken}`
                    }                })
                const json = await response.json()
                const userInfo = json.user
                if(response.ok){
                    setFirstName(userInfo.firstName)
                    setLastName(userInfo.lastName)
                    setEmailAddress(userInfo.emailAddress)
                    setPhoneNumber(userInfo.phoneNumbers[0])
                    if(userInfo.vehicles[0]){
                        setVYear(userInfo.vehicles[0].vehicleYear)
                        setVMake(userInfo.vehicles[0].vehicleMake)
                        setVModel(userInfo.vehicles[0].vehicleModel)
                    }
                    
                }
            }
        }
        fetchUserData()
    }, [])

    return (
        <form className="appointment-form">
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
                className={emptyFields.includes('phoneNumbers') ? 'error' : ''}
            />

            <label>Email Address:</label>
            <input
                type="text"
                onChange={(e) => setEmailAddress(e.target.value)}
                value={emailAddress}
            />

            <label>Vehicle Year:</label>
            <input
                type="number"
                onChange={(e) => setVYear(e.target.value)}
                value={vYear}
                min="1800"
                max="2500"
                className={emptyFields.includes('vehicleYear') ? 'error' : ''}
            />
            
            <label>Vehicle Make:</label>
            <select 
                onChange={(e) => setVMake(e.target.value)}
                className={emptyFields.includes('vehicleMake') ? 'error' : ''}>
                <option value="Audi">Audi</option>
                <option value="VW">VW</option>
                <option value="BMW">BMW</option>
            </select>

            <label>Vehicle Model:</label>
            <input
                type="text"
                onChange={(e)=> setVModel(e.target.value)}
                value={vModel}
                className={emptyFields.includes('vehicleModel') ? 'error' : ''}
            />
        </form>
    )
}

export default AppointmentForm