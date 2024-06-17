import { useEffect, useState } from 'react'

import {
    EmailAddress,
    Password,
    FirstName,
    LastName,
    PhoneNumber,
    AccessLevel
} from './labeledInputs'

import { formatPhone, capitalize } from "../../hooks/useUtils";
import { useCreateAccount, useUpdateAccount } from '../../hooks/api/useAccountsApi';

import './styles/AccountForm.css'
import { useUpdateCustomer } from '../../hooks/api/useCustomersApi';

const AccountForm = ({ account, closeForm }) => {

    const [emailAddress, setEmailAddress] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumbers, setPhoneNumbers] = useState([])

    const [phoneNumber, setPhoneNumber] = useState('')
    const [validPhone, setValidPhone] = useState(true)
    const [addPhone, setAddPhone] = useState(false)

    const [password, setPassword] = useState('')
    const [accessLevel, setAccessLevel] = useState(0)

    const [emptyFields, setEmptyFields] = useState([])
    const [error, setError] = useState('')

    const { createAccount } = useCreateAccount()

    const { updateAccount } = useUpdateAccount()
    const { updateCustomer } = useUpdateCustomer()

    useEffect(() => {
        if (account) {
            setEmailAddress(account.user.emailAddress)
            setFirstName(account.user.firstName)
            setLastName(account.user.lastName)
            setPhoneNumbers(account.user.phoneNumbers)
            setAccessLevel(account.access)
        }
        // eslint-disable-next-line
    }, [])

    const addNewPhoneNumber = (e) => {
        e.preventDefault()

        if (phoneNumber === '') {
            setValidPhone(true)
            setAddPhone(false)
            return
        }

        if (phoneNumbers.includes(phoneNumber)) {
            setValidPhone(true)
            setPhoneNumber('')
            setAddPhone(false)
            setError("Phone number already stored")
            return
        }

        if (/[0-9]{10}/.test(phoneNumber)) {
            setPhoneNumbers([...phoneNumbers, phoneNumber])
            setValidPhone(true)
            setPhoneNumber('')
            setAddPhone(false)
        } else {
            setValidPhone(false)
            setError("Phone number be 10 numbers")
        }
    }

    const cancelPhone = (e) => {
        e.preventDefault()
        setPhoneNumber('')
        setAddPhone(false)
    }

    const removePhoneNumber = (e, num) => {
        e.preventDefault()
        setPhoneNumbers(phoneNumbers.filter((number) => {
            return num !== number
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (account && addPhone) {
            setError("Please confirm new phone number")
            return
        }

        let missing = []
        if (!emailAddress) missing.push('emailAddress')
        if (!firstName) missing.push('firstName')
        if (!lastName) missing.push('lastName')
        if (!account) {
            if (!password) missing.push('password')
            if (!phoneNumber) missing.push('phoneNumber')
        }
        if (missing.length > 0) {
            setError('Fields Cannot be empty')
            setEmptyFields(missing)
            return
        }

        if (!account) {

            const newUser = {
                firstName: capitalize(firstName),
                lastName: capitalize(lastName),
                emailAddress: emailAddress,
                phoneNumbers: [phoneNumber],
                vehicles: []
            }

            const { response, json } = await createAccount(emailAddress, password, accessLevel, newUser)
            if (!response.ok) {
                setError(json.error)
                return
            }
            closeForm()

        } else {

            let customerUpdates = { ...account.user }

            customerUpdates.firstName = capitalize(firstName)
            customerUpdates.lastName = capitalize(lastName)
            customerUpdates.emailAddress = emailAddress
            customerUpdates.phoneNumbers = phoneNumbers

            let accountUpdates = { ...account }

            accountUpdates.user = customerUpdates
            accountUpdates.access = accessLevel

            if (JSON.stringify(accountUpdates) === JSON.stringify(account)) {
                setError('')
                closeForm()
                return
            }

            const { response: custResp, json: custJSON } = await updateCustomer(customerUpdates, account.user)
            if (!custResp.ok) {
                setError(custJSON.error)
                return
            }
            console.log("Updated user info")

            const updatedInfo = { user: emailAddress, access: accessLevel }

            const { response: acctResponse, json: acctJSON } = await updateAccount(account, updatedInfo)
            if (!acctResponse.ok) {
                setError(acctJSON.error)
                return
            }
            closeForm()
        }

    }

    return (
        <form id="admin-account-update-form" className="admin-acct-update-form" onSubmit={handleSubmit}>
            {account &&
                <h1>Edit Acccount Information:</h1>}
            {!account &&
                <h1>Create New Account:</h1>}
            <EmailAddress
                val={emailAddress}
                error={emptyFields && emptyFields.includes('emailAddress')}
                changeFn={(e) => setEmailAddress(e.target.value)}
            />
            {!account &&
                <Password
                    val={password}
                    error={emptyFields && emptyFields.includes('password')}
                    changeFn={(e) => setPassword(e.target.value)}
                />
            }
            <FirstName
                val={firstName}
                error={emptyFields && emptyFields.includes('firstName')}
                changeFn={(e) => setFirstName(e.target.value)}
            />
            <LastName
                val={lastName}
                error={emptyFields && emptyFields.includes('lastName')}
                changeFn={(e) => setLastName(e.target.value)}
            />
            {!account && <>
                <PhoneNumber
                    val={phoneNumber}
                    error={emptyFields && emptyFields.includes('phoneNumber')}
                    changeFn={(e) => setPhoneNumber(e.target.value)} />
            </>}
            {account && <>
                <label>Phone Numbers:</label>
                {phoneNumbers.map((num, index) => {
                    return (
                        <div key={index}>
                            {formatPhone(num)}
                            {phoneNumbers.length > 1 && <span className="material-symbols-outlined delete" onClick={(e) => removePhoneNumber(e, num)}>delete</span>}
                        </div>
                    )
                })}
                {!addPhone && <button className='edit' onClick={(e) => { e.preventDefault(); setAddPhone(true) }}>Add Phone Number</button>}
                {addPhone &&
                    <div className="new-phone">
                        <input
                            type="text"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            pattern='[0-9]{10}'
                            placeholder='xxxxxxxxxx'
                            title="xxxxxxxxxx"
                            value={phoneNumber}
                            className={validPhone ? '' : 'error'}
                        />
                        <div>
                            <button className="submit" onClick={addNewPhoneNumber}>Confirm</button>
                            <button className="cancel" onClick={cancelPhone}>Cancel</button>
                        </div>
                    </div>
                }
            </>}
            <AccessLevel key={accessLevel} val={accessLevel} changeFn={e => setAccessLevel(e.target.value)} />
            {!addPhone && <div className="controls">
                <button className="submit"
                    form="admin-account-update-form">Submit</button>
                <button className="cancel"
                    onClick={(e) => { e.preventDefault(); closeForm() }}>Cancel</button>
            </div>}
            {error && <div className="error">{error}</div>}
        </form>
    )


}

export default AccountForm