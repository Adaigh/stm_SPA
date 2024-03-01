import './styles/UserDetailStyle.css'

const UserDetails = ({user}) => {
    return (
        <div className="user-details">
            <h4>{user.lastName}, {user.firstName}</h4>
            <div className='info-columns'>
                {/* Listing phone number */}
                <ul>
                    <li><u>Phone Numbers</u>:&emsp;</li>
                    {user.phoneNumbers.map((number, index) => {
                        return <li key={index}>{number.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}</li>
                    })}
                </ul>
                <ul>
                    <li><u>Email Addresses</u>:&emsp;</li>
                    {/* List available emails */}
                    {user.emailAddresses.map((email, index) => {
                        return <li key={index}>{email}</li>
                    })}
                </ul>
                <ul>
                    {/* List vehicles */}
                    <li><u>Vehicles</u>:&emsp;</li>
                    {user.vehicles.map((vehicle, index) => {
                        return  <li key={index}>
                                    {vehicle.vehicleYear}&nbsp;
                                    {vehicle.vehicleMake}&nbsp;
                                    {vehicle.vehicleModel} &nbsp;
                                    VIN: {vehicle.vehicleVIN}</li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default UserDetails