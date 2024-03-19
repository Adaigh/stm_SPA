import './styles/UserFormStyle.css'
import { useState } from "react"
import { useUsersContext } from "../hooks/useUsersContext"
import { useAuthContext } from "../hooks/useAuthContext"

const UserForm = () => {

    const {dispatch} = useUsersContext()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [vYear, setVYear] = useState('')
    const [vMake, setVMake] = useState('Audi')
    const [vModel, setVModel] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const {user} = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError('You must be logged in')
            setEmptyFields([])
            return
        }

        // Create new User Object
        let newUser = {
            firstName,
            lastName,
            phoneNumbers: [phoneNumber],
            emailAddresses: [emailAddress],
            vehicles: []
        }
        
        // Capitalize names
        newUser.firstName = newUser.firstName.charAt(0).toUpperCase() + newUser.firstName.slice(1)
        newUser.lastName = newUser.lastName.charAt(0).toUpperCase() + newUser.lastName.slice(1)
        
        // Check for vehicle details
        if(vYear && vMake && vModel){
            newUser.vehicles.push({
                vehicleYear: vYear,
                vehicleMake: vMake,
                vehicleModel: vModel
            })
        } else if (!vYear && !vModel){
            // Do Nothing
        } else if(!vYear || !vModel){
            setError("Incomplete vehicle details")
            if(!vYear) setEmptyFields(['vehicleYear'])
            if(!vModel) setEmptyFields([...emptyFields, 'vehicleModel'])
            return
        }

        // Fetch the new user details
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.webToken}`
            }
        })
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            if(json.emptyFields){
                setEmptyFields(json.emptyFields)
            }
        }
        if(response.ok) {
            setFirstName('')
            setLastName('')
            setPhoneNumber('')
            setEmailAddress('')
            setVYear('')
            setVMake('Audi')
            setVModel('')
            setError(null)
            setEmptyFields([])
            console.log('New user added!')
            dispatch({type: 'CREATE_USER', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>

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

            <button> Add User </button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default UserForm