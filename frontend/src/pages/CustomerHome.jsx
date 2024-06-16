import { useEffect, useState } from "react"

import CustomerDetails from '../components/ui/CustomerDetails'
import CustomerForm from "../components/forms/CustomerForm"
import AboutPane from "../components/ui/AboutPane"

import { useCustomersContext } from "../hooks/useCustomersContext"
import { useFetchCustomers } from "../hooks/api/useCustomersApi"

import './styles/CustomerHome.css'

const CustomerHome = () => {
    const { customers } = useCustomersContext()
    const [filter, setFilter] = useState('')
    const { fetchCustomers } = useFetchCustomers()

    // Fetch user list on load 
    useEffect(() => {
        if (!customers) fetchCustomers()
        // eslint-disable-next-line
    }, [customers])

    // Refresh (fetch) user list
    const callRefreshCustomers = (e) => {
        setFilter('')
        e.target.classList.toggle("waiting")
        fetchCustomers()
        e.target.classList.toggle("waiting")
    }

    const filterCustomers = (customerInfo) => {
        return (customerInfo.firstName.toUpperCase().includes(filter.toUpperCase()) ||
            customerInfo.lastName.toUpperCase().includes(filter.toUpperCase()) ||
            customerInfo.phoneNumbers[0].toString().includes(filter) ||
            (customerInfo.emailAddress && customerInfo.emailAddress.toUpperCase().includes(filter.toUpperCase())))
    }

    return (

        <>
            <AboutPane header="Customer Account Information" >
                <ul>
                    <li>This page allows you to manage customer details for User Accounts and Shop Records.</li>
                    <li><b>User Accounts</b> are associated with accounts registered to the website.</li>
                    <li><b>Shop Records</b> are for storing customer data without an account.</li>
                    <li>You can create Shop Records using the form on the left.</li>
                </ul>
            </AboutPane>
            <div className="customerHome">

                {/* New User Information form */}
                <div>
                    <h2>Add a New Customer:</h2>
                    <CustomerForm />
                </div>

                <div className="customers">

                    {/* Header including search filter and buttons  */}
                    <div className="customer-header">
                        <h2>Customers</h2>
                        <input
                            type="text"
                            onChange={(e) => setFilter(e.target.value)}
                            value={filter}
                            placeholder="Search by Name, Phone, or Email"
                            size='50'
                        />
                        <span className="material-symbols-outlined close" onClick={() => setFilter('')}>close</span>
                        <span className="material-symbols-outlined refresh" onClick={(e) => callRefreshCustomers(e)}>refresh</span>
                    </div>

                    {/* Filter and map users into CustomerDetail components */}
                    {customers && customers.filter(filterCustomers).map((customerInfo) => (
                        <CustomerDetails key={customerInfo._id} customerInfo={customerInfo} />
                    ))}

                </div>
            </div>
        </>
    )
}

export default CustomerHome