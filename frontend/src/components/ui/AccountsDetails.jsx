import { useState } from 'react';
import Modal from 'react-modal';
import { standardStyle, formatPhone } from '../../hooks/useUtils';

import './styles/AccountsDetail.css'
import AccountForm from '../forms/AccountForm';
import { useDeleteCustomer } from '../../hooks/api/useCustomersApi';
import { useDeleteAccount } from '../../hooks/api/useAccountsApi';
import ConfirmModal from '../forms/ConfirmModal';

const AccountsDetails = ({ info }) => {

    const [edit, setEdit] = useState(false)
    const [confirmIsOpen, setConfirmIsOpen] = useState(false)

    const { deleteCustomer } = useDeleteCustomer()
    const { deleteAccount } = useDeleteAccount()

    const confirmDelete = (e) => {
        e.preventDefault()
        setConfirmIsOpen(true)
    }

    const handleDelete = async (confirmed) => {
        setConfirmIsOpen(false)
        if (confirmed) {
            await deleteCustomer(info.user)
            await deleteAccount(info)
        }
    }

    return (
        <>
            <div className='accounts-detail'>
                <div className='info-area'>
                    <span>{info.user.emailAddress}</span>
                    <br />
                    <span>{info.user.lastName}, {info.user.firstName} {formatPhone(info.user.phoneNumbers[0])}</span>
                </div>
                <div>
                    <button className='edit' onClick={() => setEdit(true)}>Edit</button>
                    <button className='cancel' onClick={(e) => confirmDelete(e)}>Delete</button>
                </div>
                <Modal
                    isOpen={edit}
                    onRequestClose={() => setEdit(false)}
                    style={standardStyle}
                    contentLabel='Edit Account Details'
                    className="modal"
                    overlayClassName="overlay"
                >
                    <AccountForm
                        account={info}
                        closeForm={() => setEdit(false)} />
                </Modal>
                <ConfirmModal
                    modalIsOpen={confirmIsOpen}
                    onClose={handleDelete}
                    message={"Are you sure you want to delete the account for: " + info.user.emailAddress}
                />
            </div>
        </>
    )
}

export default AccountsDetails