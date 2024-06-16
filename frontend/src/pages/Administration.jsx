import { useEffect, useState } from "react"
import Modal from 'react-modal';

import AccountsDetails from "../components/ui/AccountsDetails"
import AboutPane from "../components/ui/AboutPane"
import AccountForm from "../components/forms/AccountForm";

import { useAccountsContext } from "../hooks/useAccountsContext"
import { useFetchAccounts } from "../hooks/api/useAccountsApi"
import { standardStyle } from "../hooks/useUtils"

import './styles/Administration.css'
import { useCustomersContext } from "../hooks/useCustomersContext";
import { useFetchCustomers } from "../hooks/api/useCustomersApi";

const Administration = () => {

    const [filter, setFilter] = useState('')
    const [addUser, setAddUser] = useState(false)

    const { accounts } = useAccountsContext()
    const { fetchAccounts } = useFetchAccounts()

    const { customers } = useCustomersContext()
    const { fetchCustomers } = useFetchCustomers()

    // Fetch account.user list on load 
    useEffect(() => {
        if (!accounts) fetchAccounts()
        if (!customers) fetchCustomers()
        // eslint-disable-next-line
    }, [accounts])

    // Refresh (fetch) user list
    const callRefreshAccounts = (e) => {
        setFilter('')
        e.target.classList.toggle("waiting")
        fetchAccounts()
        fetchCustomers()
        e.target.classList.toggle("waiting")
    }

    const filterAccounts = (account) => {
        return (account.user.firstName.toUpperCase().includes(filter.toUpperCase()) ||
            account.user.lastName.toUpperCase().includes(filter.toUpperCase()) ||
            account.user.phoneNumbers[0].toString().includes(filter) ||
            (account.user.emailAddress && account.user.emailAddress.toUpperCase().includes(filter.toUpperCase())))
    }

    const filterCustomers = (account) => {
        return (account.access === 0)
    }

    const filterStaff = (account) => {
        return (account.access === 1)
    }

    const filterAdmin = (account) => {
        return (account.access === 2)
    }

    return (
        <>
            <div className="accounts">

                <AboutPane
                    header="Account Administration"
                >
                    <ul>
                        <li>This page allow you to grant elevated privileges to registered accounts</li>
                        <li>There are three classifications: <b>Customer, Staff, Administrator</b></li>
                        <li>Customers can only access the "Home" and "Calendar" tabs</li>
                        <li>Staff can access all tabs except "Admin"</li>
                    </ul>
                </AboutPane>

                <div className="accounts-container">
                    <div className="accounts-customers">
                        {/* Header including search filter and buttons  */}
                        <div className="accounts-header">
                            <h2>Registered Accounts</h2>
                            <input
                                type="text"
                                onChange={(e) => setFilter(e.target.value)}
                                value={filter}
                                placeholder="Search by Name, Phone, or Email"
                                size='50'
                            />
                            <span className="material-symbols-outlined close" onClick={() => setFilter('')}>close</span>
                            <span className="material-symbols-outlined refresh" onClick={(e) => callRefreshAccounts(e)}>refresh</span>
                            <button className="submit" onClick={() => setAddUser(true)}>Add New Account</button>
                        </div>
                        <hr />

                        {/* Filter and map accounts.users into AccountsDetails components */}
                        {accounts && accounts.filter(filterAccounts).filter(filterCustomers).map((account) => (
                            <AccountsDetails key={account.user._id} info={account} />
                        ))}
                    </div>

                    <div className='accounts-staff'>
                        <div>
                            <h2>Administrators</h2>
                            <hr />
                            {accounts && accounts.filter(filterAdmin).map((account) => (
                                <AccountsDetails key={account.user._id} info={account} />
                            ))}
                        </div>
                        <div>
                            <h2>Staff</h2>
                            <hr />
                            {accounts && accounts.filter(filterStaff).map((account) => (
                                <AccountsDetails key={account.user._id} info={account} />
                            ))}
                        </div>
                    </div>

                </div>
                <Modal
                    isOpen={addUser}
                    onRequestClose={() => setAddUser(false)}
                    style={standardStyle}
                    contentLabel='Edit Account Details'
                    className="modal"
                    overlayClassName="overlay"
                >
                    <AccountForm
                        closeForm={() => setAddUser(false)} />
                </Modal>

            </div>
        </>
    )
}

export default Administration