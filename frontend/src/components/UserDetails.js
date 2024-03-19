import './styles/UserDetailStyle.css'
import { useUsersContext } from '../hooks/useUsersContext'
import { useAuthContext } from "../hooks/useAuthContext"

const UserDetails = ({userInfo}) => {
    const {dispatch} = useUsersContext()
    const {user} = useAuthContext()

    const handleSubmit = async () => {
        if(!user){
            return
        }

        if(!window.confirm("Are you sure you want to delete user " + userInfo.firstName + " " + userInfo.lastName + "?")){
            return;
        }
        const response = await fetch('/api/users/' + userInfo._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.webToken}`
            }
        })
        const json = await response.json()

        if(response.ok) {
            dispatch({type: 'DELETE_USER', payload: json})
        }
    }

    return (
        <div className="user-details">
            <div className='user-details-header'>
                <h4>{userInfo.lastName}, {userInfo.firstName}</h4>
                <span className='material-symbols-outlined delete' onClick={handleSubmit}>delete</span>
            </div>
            <div className='info-columns'>
                {/* Listing phone number */}
                <ul>
                    <li><u>Phone Numbers</u>:&emsp;</li>
                    {userInfo.phoneNumbers.map((number, index) => {
                        return <li key={index}>{number.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}</li>
                    })}
                </ul>
                <ul>
                    <li><u>Email Addresses</u>:&emsp;</li>
                    {/* List available emails */}
                    {userInfo.emailAddresses.map((email, index) => {
                        return <li key={index}>{email}</li>
                    })}
                </ul>
                <ul>
                    {/* List vehicles */}
                    <li><u>Vehicles</u>:&emsp;</li>
                    {userInfo.vehicles.map((vehicle, index) => {
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