import { useState } from 'react';
import Modal from 'react-modal';
import { standardStyle } from '../../hooks/useUtils';

import './styles/AccountsDetail.css'
import AccountForm from '../forms/AccountForm';
import { useDeleteCustomer } from '../../hooks/api/useCustomersApi';
import { useDeleteAccount } from '../../hooks/api/useAccountsApi';

const AccountsDetails = ({ info }) => {

    const [edit, setEdit] = useState(false)

    const {deleteCustomer} = useDeleteCustomer()
    const {deleteAccount} = useDeleteAccount()

    const handleDelete = async (e) => {
        e.preventDefault()

        if(window.confirm(`Are you sure you want to delete the account for ${info.user.emailAddress}?`)) {
            await deleteCustomer(info.user)
            await deleteAccount(info)
        }
    }

    return (
        <>
            <div className='accounts-detail'>
                <span>{info.user.emailAddress} - {info.user.firstName} {info.user.lastName}</span>
                <div>
                    <button className='edit' onClick={() => setEdit(true)}>Edit</button>
                    <button className='cancel' onClick={(e) => handleDelete(e)}>Delete</button>
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
            </div>
        </>
    )
}

export default AccountsDetails