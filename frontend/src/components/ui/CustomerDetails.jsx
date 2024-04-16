import { useState } from 'react'
import './styles/CustomerDetails.css'
import { useCustomersContext } from '../../hooks/useCustomersContext'
import { useAuthContext } from "../../hooks/useAuthContext"

const CustomerDetails = ({customerInfo}) => {
    const [expanded, setExpanded] = useState(false)
    const {dispatch} = useCustomersContext()
    const {user} = useAuthContext()

    const toggleExpand = () => {
        expanded ? setExpanded(false) : setExpanded(true)
    }

    const formatPhone = (num) => {
        return num.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
    }
    
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
        <div className="customer-details" >
            <div className='customer-details-header'>
                <div className='expandable' onClick={toggleExpand}>
                    {!expanded && <span className='material-symbols-outlined expand-more'>expand_more</span>}
                    {expanded && <span className='material-symbols-outlined expand-less'>expand_less</span>}
                    <h3>
                        {customerInfo.lastName}, {customerInfo.firstName}
                        {!expanded && <span> &emsp; {formatPhone(customerInfo.phoneNumbers[0])}</span>}
                    </h3>
                </div>
                <span className='material-symbols-outlined delete' onClick={handleSubmit}>delete</span>
            </div>
            {expanded && <div className='info-columns'>
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
            </div>}
        </div>
    )
}

export default CustomerDetails