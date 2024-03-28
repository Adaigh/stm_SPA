import './styles/CustomerDetails.css'
import { useCustomersContext } from '../hooks/useCustomersContext'
import { useAuthContext } from "../hooks/useAuthContext"

const CustomerDetails = ({customerInfo}) => {
    const {dispatch} = useCustomersContext()
    const {user} = useAuthContext()

    const handleSubmit = async () => {
        if(!user){
            return
        }

        if(!window.confirm("Are you sure you want to delete user " + customerInfo.firstName + " " + customerInfo.lastName + "?")){
            return;
        }
        const response = await fetch('/api/customers/' + customerInfo._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.webToken}`
            }
        })
        const json = await response.json()

        if(response.ok) {
            dispatch({type: 'DELETE_CUSTOMER', payload: json})
        }
    }

    return (
        <div className="customer-details">
            <div className='customer-details-header'>
                <h3>{customerInfo.lastName}, {customerInfo.firstName}</h3>
                <span className='material-symbols-outlined delete' onClick={handleSubmit}>delete</span>
            </div>
            <div className='info-columns'>
                {/* Listing phone number */}
                <ul>
                    <li><u>Phone Numbers</u>:&emsp;</li>
                    {customerInfo.phoneNumbers.map((number, index) => {
                        return <li key={index}>{number.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}</li>
                    })}
                </ul>
                <ul>
                    <li><u>Email Addresses</u>:&emsp;</li>
                    <li>{customerInfo.emailAddress}</li>
                </ul>
                <ul>
                    {/* List vehicles */}
                    <li><u>Vehicles</u>:&emsp;</li>
                    {customerInfo.vehicles.map((vehicle, index) => {
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

export default CustomerDetails