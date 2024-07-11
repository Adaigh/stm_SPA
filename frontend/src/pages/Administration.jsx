import { useEffect, useState } from "react"
import Modal from 'react-modal';

import AccountsDetails from "../components/ui/AccountsDetails"
import AboutPane from "../components/ui/AboutPane"
import AccountForm from "../components/forms/AccountForm";

import { useAccountsContext } from "../hooks/useAccountsContext"
import { useFetchAccounts } from "../hooks/api/useAccountsApi"
import { useRecipientsContext } from "../hooks/useRecipientsContext";
import { standardStyle } from "../hooks/useUtils"

import './styles/Administration.css'
import { useCustomersContext } from "../hooks/useCustomersContext";
import { useFetchCustomers } from "../hooks/api/useCustomersApi";
import { useDeleteMailerRecipient, useRetrieveMailerList } from "../hooks/api/useMailerApi";

const Administration = () => {

    const [filter, setFilter] = useState('')
    const [addUser, setAddUser] = useState(false)

    const { accounts } = useAccountsContext()
    const { fetchAccounts } = useFetchAccounts()

    const { customers } = useCustomersContext()
    const { fetchCustomers } = useFetchCustomers()

    const { recipients } = useRecipientsContext()
    const { getMailerList } = useRetrieveMailerList()
    const { deleteRecipient } = useDeleteMailerRecipient()

    // Fetch account.user list on load 
    useEffect(() => {
        if (!accounts) fetchAccounts()
        if (!customers) fetchCustomers()
        if (!recipients) getMailerList()
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

    const removeFromMailerList = async (email) => {
        const { response } = await deleteRecipient(email)

        if (!response.ok) {
            window.alert("Email not removed, could not contact server.")
        }
    }

    return (
        <>
            <div className="accounts">

                <AboutPane header="Account Administration" >
                    <ul>
                        <li>This page allows you to grant elevated privileges to registered accounts.</li>
                        <li>There are three classifications: <b>Customer, Staff, Administrator</b>.</li>
                        <li>Customers can only access the "Home" and "Calendar" tabs.</li>
                        <li>Staff can access all tabs except "Admin".</li>
                    </ul>
                </AboutPane>

                <div className="accounts-container">
                    <div>
                        {/* Header including search filter and buttons  */}
                        <div className="accounts-header">
                            <h2>Customer Accounts</h2>
                            <div className="filter-bar">
                                <input
                                    className="large-bar"
                                    type="text"
                                    onChange={(e) => setFilter(e.target.value)}
                                    value={filter}
                                    placeholder="Search by Name, Phone, or Email"
                                    size='50'
                                />
                                <input
                                    className="small-bar"
                                    type="text"
                                    onChange={(e) => setFilter(e.target.value)}
                                    value={filter}
                                    placeholder="Name, Phone, or Email"
                                    size='20'
                                />
                                <span
                                    className="material-symbols-outlined close"
                                    onClick={() => setFilter('')}
                                    title="Clear the filter."
                                >
                                    close
                                </span>
                                <span
                                    className="material-symbols-outlined refresh"
                                    onClick={(e) => callRefreshAccounts(e)}
                                    title="Refresh accounts list."
                                >
                                    refresh
                                </span>
                            </div>
                            <button className="submit" onClick={() => setAddUser(true)}>Add New Account</button>
                        </div>
                        <hr />

                        {/* Filter and map accounts.users into AccountsDetails components */}
                        {accounts && accounts.filter(filterAccounts).filter(filterCustomers).map((account) => (
                            <AccountsDetails key={account.user._id} info={account} />
                        ))}
                    </div>

                    <div className="accounts-staff">
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

                    <div className="email notifications">

                        <h2>Updates Mailer List</h2>
                        <hr />
                        {recipients && recipients.sort().map((r, index) => {
                            return (
                                <div className="recipient-container" key={index}>
                                    {r}
                                    <span
                                        className='material-symbols-outlined delete'
                                        onClick={() => removeFromMailerList(r)}
                                        title='Remove email from mailer list.'
                                    >
                                        delete
                                    </span>
                                </div>
                            )
                        })}
                    </div>

                </div>
                <Modal
                    isOpen={addUser}
                    onRequestClose={() => setAddUser(false)}
                    style={standardStyle}
                    contentLabel='Edit Account Details'
                    className="modal"
                    overlayClassName="overlay"
                    appElement={document.getElementById('root') || undefined}
                >
                    <AccountForm
                        closeForm={() => setAddUser(false)} />
                </Modal>

            </div>
        </>
    )
}

export default Administration