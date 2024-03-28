import { useState } from "react"
import { useSelfSignup } from "../hooks/useSelfSignup"
import './styles/SelfSignup.css'

const SelfSignup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [vYear, setVYear] = useState('')
    const [vMake, setVMake] = useState('Audi')
    const [vModel, setVModel] = useState('')
    const [emptyFields, setEmptyFields] = useState([])
    const {selfSignup, isLoading, error, setError} = useSelfSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        let newCustomer = {
            firstName,
            lastName,
            emailAddress: email,
            phoneNumbers: [phoneNumber],
            vehicles: []
        }
        
        // Capitalize names
        newCustomer.firstName = newCustomer.firstName.charAt(0).toUpperCase() + newCustomer.firstName.slice(1)
        newCustomer.lastName = newCustomer.lastName.charAt(0).toUpperCase() + newCustomer.lastName.slice(1)
        
        // Check for vehicle details
        if(vYear && vMake && vModel){
            newCustomer.vehicles.push({
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
        await selfSignup(email, password, newCustomer)
    }

    return (
        <form className='self-signup' onSubmit={handleSubmit}>
            <h3>Sign Up:</h3>

            <label className="required">Email: *</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label className="required">Password: *</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <label className="required">First Name: *</label>
            <input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                className={emptyFields && emptyFields.includes('firstName') ? 'error' : ''}
            />

            <label className="required">Last Name: *</label>
            <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className={emptyFields && emptyFields.includes('lastName') ? 'error' : ''}
            />

            <label className="required">Phone Number: *</label>
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

            <button disabled={isLoading}>Submit</button>
            {error && <div className="error">{error}</div>}

        </form>
    )
}

export default SelfSignup