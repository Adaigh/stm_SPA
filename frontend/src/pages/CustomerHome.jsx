import { useCallback, useEffect, useState } from "react"
import { useCustomersContext } from "../hooks/useCustomersContext"
import { useAuthContext } from "../hooks/useAuthContext"
import './styles/CustomerHome.css'

// Components
import CustomerDetails from '../components/ui/CustomerDetails'
import CustomerForm from "../components/forms/CustomerForm"

const CustomerHome = () => {
    const {customers, dispatch} = useCustomersContext()
    const [filter, setFilter] = useState('')
    const {user} = useAuthContext()

    // GET user data from server
    const fetchCustomers = useCallback(async () => {
        const response = await fetch('/api/customers/', {
            headers: {
                'Authorization': `Bearer ${user.webToken}`
            }
        })
        const json = await response.json()
        if(response.ok) {
            dispatch({type:'SET_CUSTOMERS', payload: json})
        }
    }, [dispatch, user.webToken])

    // Fetch user list on load 
    useEffect(() =>{
        fetchCustomers()
    }, [dispatch, user, fetchCustomers])

    // Refresh (fetch) user list
    const callRefreshCustomers = (e) => {
        setFilter('')
        e.target.classList.toggle("waiting")
        fetchCustomers()
        e.target.classList.toggle("waiting")
    }

    return (
        <div className="customerHome">

            {/* New User Information form */}
            <div className="customer-form">
                <h2 className="add-customer-title">Add a New Customer:</h2>
                <CustomerForm />
            </div>

            <div className="customers">

                {/* Header including search filter and buttons  */}
                <div className="customer-header">
                    <h2 className="customer-title">Customers</h2> 
                    <input
                        className="customer-filter"
                        type="text"
                        onChange={(e) => setFilter(e.target.value)}
                        value={filter}
                        placeholder="Search by Name, Phone, or Email"
                        size='50'
                    />
                    <span className="material-symbols-outlined close" onClick={() => setFilter('')}>close</span>
                    <span className="material-symbols-outlined refresh" onClick={(e) => callRefreshCustomers(e)}>refresh</span>
                </div>

                {/* Filter and map users into userDetail components */}
                {customers && customers.filter((customerInfo) => {
                    return (customerInfo.firstName.toUpperCase().includes(filter.toUpperCase()) ||
                    customerInfo.lastName.toUpperCase().includes(filter.toUpperCase()) || 
                    customerInfo.phoneNumbers[0].toString().includes(filter) || 
                    (customerInfo.emailAddress && customerInfo.emailAddress.toUpperCase().includes(filter.toUpperCase())))
                }).map((customerInfo) => (
                    <CustomerDetails key={customerInfo._id} customerInfo={customerInfo} />
                ))}

            </div>            
        </div>
    )
}

export default CustomerHome