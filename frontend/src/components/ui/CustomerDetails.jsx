import { useState } from 'react'

import CustomerUpdateForm from '../forms/CustomerUpdateForm'

import { formatPhone } from '../../hooks/useUtils'
import { useDeleteCustomer } from '../../hooks/api/useCustomersApi'

import './styles/CustomerDetails.css'
import ConfirmModal from '../forms/ConfirmModal'
import AlertModal from '../forms/AlertModal'

const CustomerDetails = ({ customerInfo }) => {

    const [expanded, setExpanded] = useState(false)
    const [edit, setEdit] = useState(false)
    const [alertIsOpen, setAlertIsOpen] = useState(false)
    const [confirmIsOpen, setConfirmIsOpen] = useState(false)

    const { deleteCustomer } = useDeleteCustomer()

    const toggleExpand = () => {
        if (!expanded) {
            setExpanded(true)
            return
        } else {
            if (edit) {
                if (!window.confirm("Updates will NOT be saved, continue?")) return
                setEdit(false)
            }
            setExpanded(false)
        }
    }

    const closeForm = (requested) => {
        setEdit(false)
        setAlertIsOpen(requested)
    }

    const confirmDelete = (e) => {
        e.preventDefault()
        setConfirmIsOpen(true)
    }

    const handleDelete = async (confirmed) => {
        setConfirmIsOpen(false)
        if (confirmed) await deleteCustomer(customerInfo)
    }

    return (
        <>
            <div className="customer-details" >
                <div className='customer-details-header'>
                    <div className='expandable' onClick={toggleExpand}>
                        {!expanded && <span className='material-symbols-outlined expand-more'>expand_more</span>}
                        {expanded && <span className='material-symbols-outlined expand-less'>expand_less</span>}
                        <h3>
                            {customerInfo.lastName}, {customerInfo.firstName}
                        </h3>
                        {!expanded && <div className='phone'> &emsp; {formatPhone(customerInfo.phoneNumbers[0])}</div>}
                    </div>
                    {customerInfo.emailAddress.includes('(SHOP)') &&
                        <span>(SHOP RECORD) <span className='material-symbols-outlined delete' onClick={(e) => confirmDelete(e)}>delete</span></span>
                    }
                    {!customerInfo.emailAddress.includes('(SHOP)') &&
                        <span>(USER ACCOUNT)</span>
                    }
                </div>
                {expanded &&

                    <>
                        {!edit &&
                            <>
                                <div className='info-columns'>
                                    {/* Listing phone numbers */}
                                    <ul>
                                        <li><u>Phone Numbers</u>:&emsp;</li>
                                        {customerInfo.phoneNumbers.map((number, index) => {
                                            return <li key={index}>{number.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}</li>
                                        })}
                                    </ul>
                                    <ul>
                                        <li><u>Email Address</u>:&emsp;</li>
                                        <li>{customerInfo.emailAddress}</li>
                                    </ul>
                                    <ul>
                                        {/* List vehicles */}
                                        <li><u>Vehicles</u>:&emsp;</li>
                                        {customerInfo.vehicles.map((vehicle, index) => {
                                            return <li key={index}>
                                                {vehicle.vehicleYear}&nbsp;
                                                {vehicle.vehicleMake}&nbsp;
                                                {vehicle.vehicleModel} &nbsp;
                                                VIN: {vehicle.vehicleVIN}</li>
                                        })}
                                    </ul>
                                </div>
                                <button className='edit'
                                    onClick={(e) => { (e).preventDefault(); setEdit(true) }}>Edit</button>
                            </>
                        }
                        {edit &&
                            <CustomerUpdateForm customer={customerInfo}
                                closeForm={closeForm} />
                        }
                    </>
                }
            </div>

            <AlertModal
                modalIsOpen={alertIsOpen}
                onClose={() => setAlertIsOpen(false)}
                message="Updates successful!"
            />

            <ConfirmModal
                modalIsOpen={confirmIsOpen}
                onClose={handleDelete}
                message="Are you sure you want to delete this record?"
            />
        </>
    )
}

export default CustomerDetails