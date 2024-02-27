const UserForm = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [emailAddress, setEmailAddress] = useState('')

    return (
        <form className="create">
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
                type="number"
                onChange={(e)=> setPhoneNumber(e.target.value)}
                value={phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
            />

            <label>Email Address:</label>
            <input
                type="text"
                onChange={(e)=> setEmailAddress(e.target.value)}
                value={emailAddress}
            />

        </form>
    )
}