import './styles/UserFormStyle.css'
import { useState } from "react"


const UserForm = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = {firstName, lastName, phoneNumbers: [phoneNumber], emailAddresses: [emailAddress]}

        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
        }
        if(response.ok) {
            setFirstName('')
            setLastName('')
            setPhoneNumber('')
            setEmailAddress('')
            setError(null)
            console.log('New user added!')
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New User</h3>

            <label>First Name:</label>
            <input
                type="text"
                onChange={(e)=> setFirstName(e.target.value)}
                value={firstName}
            />

            <label>Last Name:</label>
            <input
                type="text"
                onChange={(e)=> setLastName(e.target.value)}
                value={lastName}
            />

            <label>Phone Number:</label>
            <input
                type="text"
                onInput={(e)=> setPhoneNumber(e.target.value)}
                pattern='[0-9]{10}'
                placeholder='xxxxxxxxxx'
                title="xxxxxxxxxx"
                required='required'
                value={phoneNumber}
            />

            <label>Email Address:</label>
            <input
                type="text"
                onChange={(e)=> setEmailAddress(e.target.value)}
                value={emailAddress}
            />

            <button> Add User </button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default UserForm